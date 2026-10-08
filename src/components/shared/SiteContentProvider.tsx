'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type ContentMap = Record<string, string>

const SiteContentContext = createContext<ContentMap>({})

export function SiteContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<ContentMap>({})

  useEffect(() => {
    supabase.from('site_content').select('key,value').then(({ data }) => {
      if (data) setContent(Object.fromEntries(data.map((item) => [item.key, item.value])))
    })
  }, [])

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
}

export function useSiteContent(key: string, fallback: string) {
  const content = useContext(SiteContentContext)
  return content[key] || fallback
}
