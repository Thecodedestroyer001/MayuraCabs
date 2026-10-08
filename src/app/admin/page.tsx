'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { Eye, EyeOff, FileText, Inbox, LoaderCircle, LogOut, RefreshCw, Save, ShieldCheck } from 'lucide-react'
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
  const [tab, setTab] = useState<'enquiries' | 'content'>('enquiries')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [content, setContent] = useState<ContentItem[]>([])
  const [drafts, setDrafts] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const verifyAdmin = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession)
    if (!nextSession) { setAuth('signed-out'); return }
    setAuth('verifying')
    const result = await supabase.rpc('is_admin')
    if (result.error) {
      setError('Admin security is not configured. Run the latest supabase/schema.sql in Supabase.')
      setAuth('denied')
    } else if (!result.data) {
      setError('This account is signed in but is not approved as an administrator.')
      setAuth('denied')
    } else { setError(''); setAuth('authorized') }
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => verifyAdmin(data.session))
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => window.setTimeout(() => verifyAdmin(nextSession), 0))
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
      const items = (fields.data as ContentItem[]) || []
      setContent(items); setDrafts(Object.fromEntries(items.map((item) => [item.key, item.value])))
    }
    setBusy(false)
  }, [])

  useEffect(() => { if (auth === 'authorized') loadData() }, [auth, loadData])

  async function signIn(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError(''); setNotice('')
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password })
    if (signInError) {
      setError(signInError.message.toLowerCase().includes('invalid login') ? 'The email or password is incorrect.' : signInError.message)
    } else await verifyAdmin(data.session)
    setBusy(false)
  }

  async function resetPassword() {
    if (!email.trim()) { setError('Enter your email first.'); return }
    setBusy(true); setError(''); setNotice('')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/admin` })
    if (resetError) setError(resetError.message); else setNotice('Password reset email sent.')
    setBusy(false)
  }

  async function signOut() { await supabase.auth.signOut(); setSession(null); setAuth('signed-out'); setPassword('') }

  async function updateStatus(id: number, status: Status) {
    const { error: updateError } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (updateError) setError(updateError.message)
    else setEnquiries((items) => items.map((item) => item.id === id ? { ...item, status } : item))
  }

  async function saveContent(item: ContentItem) {
    setBusy(true); setError(''); setNotice('')
    const { error: saveError } = await supabase.from('site_content').update({ value: drafts[item.key], updated_at: new Date().toISOString() }).eq('key', item.key)
    if (saveError) setError(saveError.message)
    else { setContent((items) => items.map((entry) => entry.key === item.key ? { ...entry, value: drafts[item.key] } : entry)); setNotice(`${item.label} saved.`) }
    setBusy(false)
  }

  const groups = useMemo(() => Object.entries(content.reduce<Record<string, ContentItem[]>>((all, item) => { (all[item.page] ||= []).push(item); return all }, {})), [content])

  if (auth === 'checking' || auth === 'verifying') return <main className="grid min-h-screen place-items-center bg-[#111] text-white"><div className="text-center"><LoaderCircle className="mx-auto mb-4 animate-spin text-brand-yellow" /><p className="text-sm text-white/60">Checking secure access…</p></div></main>

  if (auth !== 'authorized') return (
    <main className="min-h-screen bg-[#111] px-5 py-16 sm:py-24"><div className="mx-auto grid max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl lg:grid-cols-2">
      <div className="hidden bg-brand-yellow p-12 lg:flex lg:flex-col lg:justify-between"><div className="grid h-12 w-12 place-items-center rounded-2xl bg-black"><ShieldCheck className="text-brand-yellow" /></div><div><p className="mb-4 text-sm font-black uppercase tracking-[.24em]">Mayura workspace</p><h1 className="text-5xl font-black leading-tight">Manage your leads and website in one place.</h1><p className="mt-5 text-black/60">Secure access for approved administrators.</p></div></div>
      <div className="p-7 sm:p-12"><span className="rounded-lg bg-brand-yellow px-3 py-2 text-xs font-black lg:hidden">MAYURA ADMIN</span><h2 className="mt-8 text-3xl font-black lg:mt-0">Welcome back</h2><p className="mt-2 text-sm text-gray-500">Use your approved administrator account.</p>
        <form onSubmit={signIn} className="mt-8 space-y-5"><label className="block text-sm font-bold">Email<input type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3.5 font-normal outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/15" /></label><label className="block text-sm font-bold">Password<div className="relative mt-2"><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border px-4 py-3.5 pr-12 font-normal outline-none focus:border-brand-yellow focus:ring-4 focus:ring-brand-yellow/15" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-gray-400">{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}</button></div></label>
          {error && <p className="rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>}{notice && <p className="rounded-xl bg-green-50 p-3 text-sm font-semibold text-green-700">{notice}</p>}<button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 font-black text-white disabled:opacity-50">{busy && <LoaderCircle className="animate-spin" size={18} />}Sign in securely</button><button type="button" onClick={resetPassword} className="w-full text-sm font-bold text-gray-500">Reset password</button>
        </form>{auth === 'denied' && session && <button onClick={signOut} className="mt-6 w-full rounded-xl border px-4 py-3 text-sm font-bold">Use another account</button>}
      </div></div></main>
  )

  const newCount = enquiries.filter((item) => item.status === 'new').length
  return <main className="min-h-screen bg-[#f4f4f1] text-brand-black">
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4"><div><b>MAYURA</b><span className="ml-2 rounded bg-brand-yellow px-2 py-1 text-[10px] font-black">ADMIN</span></div><div className="flex items-center gap-3"><span className="hidden text-xs text-gray-500 sm:block">{session?.user.email}</span><button onClick={signOut} className="flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-sm font-bold text-white"><LogOut size={15} /> Sign out</button></div></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8"><div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className="text-xs font-black uppercase tracking-[.2em] text-gray-400">Dashboard</p><h1 className="mt-2 text-4xl font-black">Website control centre</h1></div><button onClick={loadData} className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2 text-sm font-bold"><RefreshCw size={15} /> Refresh</button></div>
      <nav className="mb-7 flex w-fit gap-1 rounded-2xl bg-white p-1.5 shadow-sm"><button onClick={() => setTab('enquiries')} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${tab === 'enquiries' ? 'bg-black text-white' : 'text-gray-500'}`}><Inbox size={17} /> Enquiries <span className="rounded-full bg-brand-yellow px-2 text-xs text-black">{newCount}</span></button><button onClick={() => setTab('content')} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold ${tab === 'content' ? 'bg-black text-white' : 'text-gray-500'}`}><FileText size={17} /> Website content</button></nav>
      {error && <p className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</p>}{notice && <p className="mb-5 rounded-xl bg-green-50 p-4 text-sm font-semibold text-green-700">{notice}</p>}{busy && <p className="mb-4 flex items-center gap-2 text-sm text-gray-500"><LoaderCircle className="animate-spin" size={16} /> Working…</p>}
      {tab === 'enquiries' ? <div className="grid gap-4">{!busy && !enquiries.length && <div className="rounded-2xl bg-white p-12 text-center text-gray-500">No enquiries yet.</div>}{enquiries.map((item) => <article key={item.id} className="rounded-2xl border bg-white p-6 shadow-sm"><div className="flex flex-wrap justify-between gap-4"><div><div className="flex items-center gap-3"><h2 className="text-xl font-black">{item.name}</h2><span className="rounded-full bg-brand-yellow/30 px-3 py-1 text-[10px] font-black uppercase">{item.status}</span></div><p className="mt-1 text-sm text-gray-500">{item.designation} · {item.company}</p><p className="mt-1 text-xs text-gray-400">{new Date(item.created_at).toLocaleString('en-IN')}</p></div><select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value as Status)} className="h-fit rounded-xl border px-4 py-2 text-sm font-bold"><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4"><div><b className="block text-xs uppercase text-gray-400">Phone</b><a href={`tel:${item.phone}`} className="font-bold">{item.phone}</a></div><div><b className="block text-xs uppercase text-gray-400">Location</b>{item.location}</div><div><b className="block text-xs uppercase text-gray-400">Employees</b>{item.employees || 'Not specified'}</div><div><b className="block text-xs uppercase text-gray-400">Services</b>{item.services.join(', ') || 'Not specified'}</div></div>{item.details && <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm text-gray-600">{item.details}</p>}</article>)}</div> : <div className="space-y-6"><div className="rounded-2xl bg-brand-yellow/20 p-5 text-sm"><b>Live content editor</b><p className="mt-1 text-black/60">Changes appear on the public website after refresh. No deployment is needed.</p></div>{groups.map(([page, items]) => <section key={page} className="rounded-2xl border bg-white p-6 shadow-sm"><h2 className="mb-5 text-xl font-black">{page}</h2><div className="grid gap-5 lg:grid-cols-2">{items.map((item) => <div key={item.key} className="rounded-xl border bg-gray-50 p-4"><label className="text-sm font-bold">{item.label}{item.input_type === 'textarea' ? <textarea rows={4} value={drafts[item.key] ?? ''} onChange={(e) => setDrafts({ ...drafts, [item.key]: e.target.value })} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none focus:border-brand-yellow" /> : <input type={item.input_type} value={drafts[item.key] ?? ''} onChange={(e) => setDrafts({ ...drafts, [item.key]: e.target.value })} className="mt-2 w-full rounded-xl border bg-white px-4 py-3 font-normal outline-none focus:border-brand-yellow" />}</label><div className="mt-3 flex items-center justify-between"><span className="text-[10px] text-gray-400">{item.key}</span><button disabled={busy || drafts[item.key] === item.value} onClick={() => saveContent(item)} className="flex items-center gap-1 rounded-lg bg-black px-3 py-2 text-xs font-bold text-white disabled:opacity-30"><Save size={13} /> Save</button></div></div>)}</div></section>)}</div>}
    </div>
  </main>
}
