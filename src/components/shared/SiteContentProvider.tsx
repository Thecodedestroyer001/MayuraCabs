'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { usePathname } from 'next/navigation'

type ContentMap = Record<string, string>

const SiteContentContext = createContext<ContentMap>({})

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentMap>({})
  const [editing, setEditing] = useState(false)
  const selectedElement = useRef<HTMLElement | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    supabase.from('site_content').select('key,value').then(({ data }) => {
      if (data) setContent(Object.fromEntries(data.map((item) => [item.key, item.value])))
    })

    let cancelled = false
    let overrides: { element_key: string; value: string; styles: Record<string, string> }[] = []
    function registerElements() {
      if (pathname.startsWith('/admin')) return
      const elements = Array.from(document.querySelectorAll<HTMLElement>('h1,h2,h3,h4,h5,h6,p,a,button,li,label,span,strong,em'))
        .filter((element) => !element.closest('.mayura-inline-toolbar') && element.innerText.trim())
      elements.forEach((element, index) => {
        if (!element.dataset.contentKey || element.dataset.contentKey.startsWith('visual:')) {
          element.dataset.contentKey = `visual:${pathname}:${index}`
        }
        const override = overrides.find((item) => item.element_key === element.dataset.contentKey)
        if (!override || element === selectedElement.current) return
        if (element.innerText !== override.value) element.innerText = override.value
        if (override.styles) Object.assign(element.style, override.styles)
      })
    }
    const observer = new MutationObserver(() => {
      observer.disconnect()
      registerElements()
      observer.observe(document.body, { childList: true, subtree: true })
    })
    const visualTimer = window.setTimeout(async () => {
      const path = window.location.pathname
      registerElements()
      observer.observe(document.body, { childList: true, subtree: true })
      const { data } = await supabase.from('page_overrides').select('element_key,value,styles').eq('path', path)
      if (cancelled) return
      overrides = data || []
      observer.disconnect()
      registerElements()
      observer.observe(document.body, { childList: true, subtree: true })
    }, 300)

    function receivePreview(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.data?.type !== 'mayura-content-preview') return
      setContent((current) => ({ ...current, ...event.data.content }))
      document.documentElement.dataset.contentSelector = event.data.selectorEnabled ? 'on' : 'off'
    }

    window.addEventListener('message', receivePreview)
    if (window.self !== window.top) window.parent.postMessage({ type: 'mayura-preview-ready' }, window.location.origin)
    function selectContent(event: MouseEvent) {
      if (window.self === window.top) return
      if (document.documentElement.dataset.contentSelector !== 'on') return
      const target = (event.target as HTMLElement).closest<HTMLElement>('[data-content-key]')
      if (!target) return
      event.preventDefault(); event.stopPropagation()
      selectedElement.current?.removeAttribute('data-content-editing')
      selectedElement.current?.removeAttribute('contenteditable')
      selectedElement.current = target
      target.dataset.contentEditing = 'true'
      target.contentEditable = 'true'
      target.focus()
      setEditing(true)
      window.parent.postMessage({ type: 'mayura-content-select', key: target.dataset.contentKey }, window.location.origin)
    }
    async function commitContent(event: FocusEvent) {
      const target = event.target as HTMLElement
      if (!target.matches('[data-content-editing="true"]')) return
      if (target.dataset.contentKey) {
        await supabase.from('page_overrides').upsert({
          path: window.location.pathname,
          element_key: target.dataset.contentKey,
          value: target.innerText,
          styles: { fontSize: target.style.fontSize || null, fontWeight: target.style.fontWeight || null },
          updated_at: new Date().toISOString(),
        }, { onConflict: 'path,element_key' })
      }
      window.parent.postMessage({ type: 'mayura-inline-update', key: target.dataset.contentKey, value: target.innerText }, window.location.origin)
    }
    document.addEventListener('click', selectContent, true)
    document.addEventListener('focusout', commitContent, true)
    return () => {
      window.removeEventListener('message', receivePreview)
      cancelled = true
      observer.disconnect()
      window.clearTimeout(visualTimer)
      document.removeEventListener('click', selectContent, true)
      document.removeEventListener('focusout', commitContent, true)
    }
  }, [pathname])

  return <SiteContentContext.Provider value={content}>
    {children}
    {editing && <div className="mayura-inline-toolbar" onMouseDown={(event) => event.preventDefault()}>
      <button type="button" title="Bold" onClick={() => { if (selectedElement.current) selectedElement.current.style.fontWeight = getComputedStyle(selectedElement.current).fontWeight === '700' ? '400' : '700' }}><b>B</b></button>
      <button type="button" title="Smaller text" onClick={() => { if (selectedElement.current) selectedElement.current.style.fontSize = `${Math.max(10, parseFloat(getComputedStyle(selectedElement.current).fontSize) - 2)}px` }}>A−</button>
      <button type="button" title="Larger text" onClick={() => { if (selectedElement.current) selectedElement.current.style.fontSize = `${parseFloat(getComputedStyle(selectedElement.current).fontSize) + 2}px` }}>A+</button>
      <button type="button" title="Finish editing" onClick={() => { selectedElement.current?.blur(); setEditing(false) }}>Done</button>
    </div>}
    <style>{`@media (hover:hover){[data-content-selector="on"] [data-content-key]{outline:2px dashed #756cff55;outline-offset:5px;cursor:text}[data-content-selector="on"] [data-content-key]:hover,[data-content-editing="true"]{outline:2px solid #5b52ff!important;background-color:rgba(91,82,255,.1)}}.mayura-inline-toolbar{position:fixed;z-index:2147483647;top:16px;left:50%;transform:translateX(-50%);display:flex;gap:4px;padding:6px;border:1px solid #d7d9e5;border-radius:12px;background:#fff;box-shadow:0 12px 35px #10133a30;color:#111827}.mayura-inline-toolbar button{min-width:38px;padding:8px 10px;border:0;border-radius:8px;background:#f2f3f7;font:600 13px system-ui;cursor:pointer}.mayura-inline-toolbar button:hover{background:#e2e0ff;color:#261c9f}`}</style>
  </SiteContentContext.Provider>
}

export function useSiteContent(key: string, fallback: string) {
  const content = useContext(SiteContentContext)
  return content[key] || fallback
}
