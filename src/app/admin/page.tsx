'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { ArrowUpRight, Check, Cloud, Download, Eye, EyeOff, Inbox, LoaderCircle, LogOut, MousePointer2, Monitor, RefreshCw, Save, ShieldCheck, Upload } from 'lucide-react'
import { supabase } from '@/lib/supabase'

type Status = 'new' | 'contacted' | 'closed'
type AuthState = 'checking' | 'signed-out' | 'verifying' | 'authorized' | 'denied'
type Enquiry = { id: number; created_at: string; name: string; company: string; designation: string; phone: string; location: string; services: string[]; employees: string | null; details: string | null; status: Status }
type ContentItem = { key: string; page: string; label: string; value: string; input_type: 'text' | 'textarea' | 'url' | 'email' | 'tel'; updated_at: string }

export default function AdminPage() {
  const [auth, setAuth] = useState<AuthState>('checking')
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [tab, setTab] = useState<'content' | 'enquiries'>('content')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [selectedPage, setSelectedPage] = useState('Home page')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [selectorEnabled, setSelectorEnabled] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [previewKey, setPreviewKey] = useState(0)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const importRef = useRef<HTMLInputElement>(null)
  const verifiedUserRef = useRef<string | null>(null)

  const verifyAdmin = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession)
    if (!nextSession) { verifiedUserRef.current = null; setAuth('signed-out'); return }
    if (verifiedUserRef.current === nextSession.user.id) return
    setAuth('verifying')
    const result = await supabase.rpc('is_admin')
    if (result.error) { setError('Admin security is not configured. Run the latest supabase/schema.sql in Supabase.'); setAuth('denied') }
    else if (!result.data) { setError('This account is not approved as an administrator.'); setAuth('denied') }
    else { verifiedUserRef.current = nextSession.user.id; setError(''); setAuth('authorized') }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => verifyAdmin(data.session))
    const { data } = supabase.auth.onAuthStateChange((event, next) => {
      if (event === 'TOKEN_REFRESHED' && next) { setSession(next); return }
      if (next?.user.id === verifiedUserRef.current) { setSession(next); return }
      window.setTimeout(() => verifyAdmin(next), 0)
    })
    return () => data.subscription.unsubscribe()
  }, [verifyAdmin])

  const loadData = useCallback(async () => {
    setBusy(true); setError('')
    const [leads, fields] = await Promise.all([
      supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
      supabase.from('site_content').select('*').order('page').order('label'),
    ])
    if (leads.error || fields.error) setError(leads.error?.message || fields.error?.message || 'Unable to load dashboard.')
    else {
      setEnquiries((leads.data as Enquiry[]) || [])
      const items = (fields.data as ContentItem[]) || []; setContent(items)
      const published = Object.fromEntries(items.map((item) => [item.key, item.value]))
      const saved = localStorage.getItem('mayura-admin-draft')
      setDrafts(saved ? { ...published, ...JSON.parse(saved) } : published)
    }
    setBusy(false)
  }, [])

  useEffect(() => { if (auth === 'authorized') loadData() }, [auth, loadData])
  const postPreview = useCallback(() => iframeRef.current?.contentWindow?.postMessage({ type: 'mayura-content-preview', content: drafts, selectorEnabled }, window.location.origin), [drafts, selectorEnabled])
  useEffect(() => { postPreview() }, [postPreview])
  useEffect(() => {
    function previewReady(event: MessageEvent) {
      if (event.origin === window.location.origin && event.source === iframeRef.current?.contentWindow && event.data?.type === 'mayura-preview-ready') postPreview()
    }
    window.addEventListener('message', previewReady)
    return () => window.removeEventListener('message', previewReady)
  }, [postPreview])
  useEffect(() => {
    function receiveSelection(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.data?.type !== 'mayura-content-select') return
      const key = String(event.data.key || '')
      const item = content.find((entry) => entry.key === key)
      if (!item) return
      setSelectedPage(item.page); setSelectedKey(key)
      window.setTimeout(() => {
        const field = document.getElementById(`content-field-${key}`)
        field?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        field?.querySelector<HTMLElement>('input, textarea')?.focus()
      }, 50)
    }
    function receiveInlineUpdate(event: MessageEvent) {
      if (event.origin !== window.location.origin || event.data?.type !== 'mayura-inline-update') return
      const key = String(event.data.key || '')
      if (!content.some((entry) => entry.key === key)) return
      setDrafts((current) => ({ ...current, [key]: String(event.data.value ?? '') }))
    }
    window.addEventListener('message', receiveSelection)
    window.addEventListener('message', receiveInlineUpdate)
    return () => {
      window.removeEventListener('message', receiveSelection)
      window.removeEventListener('message', receiveInlineUpdate)
    }
  }, [content])

  async function signIn(event: React.FormEvent) {
    event.preventDefault(); setBusy(true); setError('')
    const { data, error: failure } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (failure) setError('The email or password is incorrect.'); else await verifyAdmin(data.session)
    setBusy(false)
  }
  async function signOut() { await supabase.auth.signOut(); setAuth('signed-out'); setPassword('') }
  async function updateStatus(id: number, status: Status) {
    const { error: failure } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (failure) setError(failure.message); else setEnquiries((all) => all.map((item) => item.id === id ? { ...item, status } : item))
  }
  function saveDraft() { localStorage.setItem('mayura-admin-draft', JSON.stringify(drafts)); setNotice('Draft saved in this browser.') }
  async function publish() {
    const changed = content.filter((item) => drafts[item.key] !== item.value)
    if (!changed.length) return
    setBusy(true); setError(''); setNotice('')
    const results = await Promise.all(changed.map((item) => supabase.from('site_content').update({ value: drafts[item.key], updated_at: new Date().toISOString() }).eq('key', item.key)))
    const failure = results.find((result) => result.error)?.error
    if (failure) setError(failure.message)
    else { setContent((all) => all.map((item) => ({ ...item, value: drafts[item.key] ?? item.value }))); localStorage.removeItem('mayura-admin-draft'); setNotice(`${changed.length} changes published.`); setPreviewKey((key) => key + 1) }
    setBusy(false)
  }
  function exportDraft() {
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([JSON.stringify(drafts, null, 2)], { type: 'application/json' })); link.download = 'mayura-content.json'; link.click(); URL.revokeObjectURL(link.href)
  }
  function importDraft(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return
    const reader = new FileReader(); reader.onload = () => { try { setDrafts((old) => ({ ...old, ...JSON.parse(String(reader.result)) })); setNotice('Draft imported.') } catch { setError('Invalid JSON file.') } }; reader.readAsText(file)
  }

  const pages = useMemo(() => Array.from(new Set(content.map((item) => item.page))), [content])
  const fields = content.filter((item) => item.page === selectedPage)
  const dirtyCount = content.filter((item) => drafts[item.key] !== item.value).length
  const previewPath = selectedPage === 'Contact page' ? '/contact' : '/'

  if (auth === 'checking' || auth === 'verifying') return <main className="grid min-h-screen place-items-center bg-[#111] text-white"><LoaderCircle className="animate-spin text-brand-yellow" /></main>
  if (auth !== 'authorized') return <main className="grid min-h-screen place-items-center bg-[#111] p-5"><div className="grid w-full max-w-4xl overflow-hidden rounded-[30px] bg-white shadow-2xl lg:grid-cols-2"><div className="hidden bg-brand-yellow p-10 lg:flex lg:flex-col lg:justify-between"><ShieldCheck size={40} /><h1 className="text-5xl font-black">Your website. One secure workspace.</h1></div><form onSubmit={signIn} className="p-8 lg:p-12"><h2 className="text-3xl font-black">Mayura Admin</h2><p className="mt-2 text-sm text-slate-500">Sign in with your approved account.</p><label className="mt-8 block text-sm font-bold">Email<input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3" /></label><label className="mt-5 block text-sm font-bold">Password<div className="relative mt-2"><input required type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3 pr-12" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3 text-slate-400">{showPassword ? <EyeOff /> : <Eye />}</button></div></label>{error && <p className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}<button disabled={busy} className="mt-6 w-full rounded-xl bg-black py-3.5 font-black text-white">Sign in</button>{session && <button type="button" onClick={signOut} className="mt-3 w-full text-sm font-bold">Use another account</button>}</form></div></main>

  return <main className="min-h-screen bg-[#edf1f5] text-slate-900"><header className="flex min-h-[72px] items-center justify-between gap-3 bg-[#17116f] px-5 text-white lg:px-8"><div className="flex items-center gap-4"><b className="text-xl">MAYURA</b><span className="h-7 w-px bg-white/20" /><span className="text-[11px] font-bold uppercase tracking-[.2em] text-white/60">Content admin</span></div><div className="flex items-center gap-2"><nav className="hidden rounded-xl bg-white/10 p-1 sm:flex"><button onClick={() => setTab('content')} className={`rounded-lg px-4 py-2 text-sm font-bold ${tab === 'content' ? 'bg-white text-[#17116f]' : ''}`}>Website content</button><button onClick={() => setTab('enquiries')} className={`rounded-lg px-4 py-2 text-sm font-bold ${tab === 'enquiries' ? 'bg-white text-[#17116f]' : ''}`}>Enquiries</button></nav><span className="hidden items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold lg:flex"><Cloud size={14} /> Supabase connected</span>{tab === 'content' && <><button onClick={() => setSelectorEnabled((enabled) => !enabled)} aria-pressed={selectorEnabled} className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-bold transition ${selectorEnabled ? 'border-brand-yellow bg-brand-yellow text-black' : 'border-white/30 bg-transparent text-white'}`}><MousePointer2 size={15} /> Selector {selectorEnabled ? 'ON' : 'OFF'}</button><button onClick={saveDraft} className="hidden rounded-xl border border-white/30 px-4 py-2 text-sm font-bold md:block">Save draft</button><button onClick={publish} disabled={busy || !dirtyCount} className="rounded-xl bg-brand-yellow px-5 py-2 text-sm font-black text-black disabled:opacity-50">Publish{dirtyCount ? ` (${dirtyCount})` : ''}</button></>}<button onClick={signOut} className="rounded-xl border border-white/30 p-2.5"><LogOut size={17} /></button></div></header>
    {tab === 'content' ? <div className="flex min-h-[calc(100vh-72px)] flex-col lg:flex-row"><aside className="w-full shrink-0 border-r bg-white lg:w-[370px]"><div className="max-h-[calc(100vh-72px)] overflow-y-auto p-5"><label className="text-xs font-black uppercase tracking-[.14em] text-slate-500">Page</label><select value={selectedPage} onChange={(e) => { setSelectedPage(e.target.value); setSelectedKey(null) }} className="mt-2 w-full rounded-xl border px-4 py-3.5 font-bold">{pages.map((page) => <option key={page}>{page}</option>)}</select><div className="my-6 h-px bg-slate-200" /><h2 className="font-black">Selected component</h2><p className="mb-5 mt-1 text-xs text-slate-500">{selectorEnabled ? 'Selector is on. Click highlighted content in the preview to edit it.' : 'Selector is off. You can now use links and navigate inside the preview.'}</p><div className="space-y-3">{fields.map((item) => <label id={`content-field-${item.key}`} key={item.key} className={`block rounded-xl border p-3 text-sm font-bold transition ${selectedKey === item.key ? 'border-indigo-600 bg-indigo-50 ring-2 ring-indigo-100' : 'border-transparent'}`}>{item.label}{item.input_type === 'textarea' ? <textarea rows={4} value={drafts[item.key] ?? ''} onChange={(e) => setDrafts((old) => ({ ...old, [item.key]: e.target.value }))} className="mt-2 w-full rounded-xl border bg-white px-3.5 py-3 font-normal" /> : <input type={item.input_type} value={drafts[item.key] ?? ''} onChange={(e) => setDrafts((old) => ({ ...old, [item.key]: e.target.value }))} className="mt-2 w-full rounded-xl border bg-white px-3.5 py-3 font-normal" />}</label>)}</div><div className="my-6 h-px bg-slate-200" /><h2 className="mb-3 font-black">Backup</h2><div className="grid grid-cols-2 gap-2"><button onClick={exportDraft} className="flex items-center justify-center gap-2 rounded-xl border py-2 text-xs font-bold"><Download size={14} /> Export JSON</button><button onClick={() => importRef.current?.click()} className="flex items-center justify-center gap-2 rounded-xl border py-2 text-xs font-bold"><Upload size={14} /> Import JSON</button><input ref={importRef} onChange={importDraft} type="file" accept="application/json" className="hidden" /></div><button onClick={saveDraft} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#17116f] py-3.5 text-sm font-black text-white"><Save size={16} /> Save draft</button></div></aside><section className="min-w-0 flex-1 p-4 lg:p-5"><div className="mb-3 flex justify-between"><span className="flex items-center gap-2 text-sm font-bold"><Monitor size={17} /> Live page preview · {selectorEnabled ? 'Select mode' : 'Browse mode'}</span><a href={previewPath} target="_blank" className="flex items-center gap-1 text-sm font-bold text-[#17116f]">Open page <ArrowUpRight size={15} /></a></div>{error && <p className="mb-3 rounded-xl bg-red-50 p-3 text-sm font-bold text-red-700">{error}</p>}{notice && <p className="mb-3 flex items-center gap-2 rounded-xl bg-emerald-50 p-3 text-sm font-bold text-emerald-700"><Check size={16} />{notice}</p>}<div className="overflow-hidden rounded-2xl border bg-white shadow-sm"><iframe key={`${previewPath}-${previewKey}`} ref={iframeRef} src={previewPath} onLoad={postPreview} title="Live website preview" className="h-[calc(100vh-145px)] min-h-[620px] w-full" /></div></section></div> : <div className="mx-auto max-w-7xl p-6"><div className="mb-6 flex justify-between"><h1 className="text-4xl font-black">Enquiries</h1><button onClick={loadData} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2"><RefreshCw size={15} /> Refresh</button></div>{error && <p className="mb-4 rounded-xl bg-red-50 p-4 text-red-700">{error}</p>}<div className="grid gap-4">{!enquiries.length && <div className="rounded-2xl bg-white p-12 text-center text-slate-500"><Inbox className="mx-auto mb-2" />No enquiries yet.</div>}{enquiries.map((item) => <article key={item.id} className="rounded-2xl border bg-white p-6"><div className="flex justify-between"><div><h2 className="text-xl font-black">{item.name}</h2><p className="text-sm text-slate-500">{item.designation} · {item.company}</p></div><select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value as Status)} className="h-fit rounded-xl border px-3 py-2"><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><div className="mt-5 grid gap-3 text-sm sm:grid-cols-4"><p><b>Phone</b><br />{item.phone}</p><p><b>Location</b><br />{item.location}</p><p><b>Employees</b><br />{item.employees || '—'}</p><p><b>Services</b><br />{item.services.join(', ') || '—'}</p></div></article>)}</div></div>}
  </main>
}
