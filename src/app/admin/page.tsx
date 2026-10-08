'use client'

import { useCallback, useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type EnquiryStatus = 'new' | 'contacted' | 'closed'

type Enquiry = {
  id: number
  created_at: string
  name: string
  company: string
  designation: string
  phone: string
  location: string
  services: string[]
  employees: string | null
  details: string | null
  status: EnquiryStatus
}

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  const loadEnquiries = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false })

    setEnquiries((data as Enquiry[] | null) ?? [])
    setMessage(error ? error.message : '')
    setLoading(false)
  }, [])

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      if (!data.session) setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) loadEnquiries()
  }, [session, loadEnquiries])

  async function signIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage(error.message)
      setLoading(false)
    }
  }

  async function updateStatus(id: number, status: EnquiryStatus) {
    const { error } = await supabase.from('enquiries').update({ status }).eq('id', id)
    if (error) setMessage(error.message)
    else setEnquiries((current) => current.map((item) => item.id === id ? { ...item, status } : item))
  }

  if (!session) {
    return (
      <section className="min-h-screen bg-brand-black px-5 pb-24 pt-36">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-brand-gray-500">Mayura Cabs</div>
          <h1 className="mb-2 text-3xl font-black text-brand-black">Admin login</h1>
          <p className="mb-8 text-sm text-brand-gray-500">Sign in with your Supabase admin account.</p>
          <form onSubmit={signIn} className="space-y-5">
            <div>
              <label htmlFor="admin-email" className="mb-2 block text-sm font-bold">Email</label>
              <input id="admin-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-yellow" />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-2 block text-sm font-bold">Password</label>
              <input id="admin-password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-brand-yellow" />
            </div>
            {message && <p className="text-sm font-semibold text-red-600" role="alert">{message}</p>}
            <button disabled={loading} className="w-full rounded-xl bg-brand-yellow px-5 py-3 font-black text-brand-black disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </section>
    )
  }

  const newCount = enquiries.filter((item) => item.status === 'new').length

  return (
    <section className="min-h-screen bg-brand-gray-100 px-5 pb-24 pt-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-brand-gray-500">Admin panel</div>
            <h1 className="text-4xl font-black text-brand-black">Enquiries</h1>
            <p className="mt-2 text-sm text-brand-gray-500">{newCount} new · {enquiries.length} total</p>
          </div>
          <div className="flex gap-3">
            <button onClick={loadEnquiries} className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-bold">Refresh</button>
            <button onClick={() => supabase.auth.signOut()} className="rounded-xl bg-brand-black px-4 py-2 text-sm font-bold text-white">Sign out</button>
          </div>
        </div>

        {message && <p className="mb-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700">{message}</p>}
        {loading ? (
          <div className="rounded-2xl bg-white p-8 text-center text-brand-gray-500">Loading enquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center text-brand-gray-500">No enquiries yet.</div>
        ) : (
          <div className="grid gap-5">
            {enquiries.map((item) => (
              <article key={item.id} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <div className="flex flex-wrap justify-between gap-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black text-brand-black">{item.name}</h2>
                      <span className="rounded-full bg-brand-yellow/25 px-3 py-1 text-xs font-black uppercase">{item.status}</span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-brand-gray-500">{item.designation} · {item.company}</p>
                    <p className="mt-1 text-xs text-brand-gray-500">{new Date(item.created_at).toLocaleString('en-IN')}</p>
                  </div>
                  <select value={item.status} onChange={(e) => updateStatus(item.id, e.target.value as EnquiryStatus)} className="h-fit rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold">
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div><span className="block text-xs font-bold uppercase text-brand-gray-500">Phone</span><a className="font-bold hover:underline" href={`tel:${item.phone}`}>{item.phone}</a></div>
                  <div><span className="block text-xs font-bold uppercase text-brand-gray-500">Location</span>{item.location}</div>
                  <div><span className="block text-xs font-bold uppercase text-brand-gray-500">Employees</span>{item.employees || 'Not specified'}</div>
                  <div><span className="block text-xs font-bold uppercase text-brand-gray-500">Services</span>{item.services.join(', ') || 'Not specified'}</div>
                </div>
                {item.details && <p className="mt-5 rounded-xl bg-brand-gray-100 p-4 text-sm text-brand-gray-500">{item.details}</p>}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
