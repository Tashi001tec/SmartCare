import React, { useState } from 'react'
import { Paperclip, Send, Search, CheckCheck, Check, Lock, ArrowLeft, FileText, Activity, Phone } from 'lucide-react'
import { Avatar, Badge, cn } from './ui'
import { IMG } from './data'

type Msg = { id: number; from: 'me' | 'them'; text: string; time: string; read?: boolean; attachment?: string }
type Convo = { id: string; name: string; sub: string; photo?: string; initials: string; last: string; time: string; unread: number; online?: boolean }

const PATIENT_CONVOS: Convo[] = [
  { id: 'kwame', name: 'Dr. Kwame Adebayo', sub: 'Cardiologist', photo: IMG.doctorM, initials: 'KA', last: 'Your readings look better this week.', time: '10:15', unread: 1, online: true },
  { id: 'priya', name: 'Dr. Priya Sharma', sub: 'Endocrinologist', photo: IMG.doctorF, initials: 'PS', last: 'Please book your HbA1c test before…', time: 'Mon', unread: 1 },
  { id: 'elena', name: 'Dr. Elena Rossi', sub: 'General Physician', initials: 'ER', last: 'Glad you are feeling better.', time: '05 Apr', unread: 0 },
]

const DOCTOR_CONVOS: Convo[] = [
  { id: 'michael', name: 'Michael Thompson', sub: 'Hypertension · PT-204871', initials: 'MT', last: 'Morning reading was 138/86…', time: '10:22', unread: 1, online: true },
  { id: 'grace', name: 'Grace Okonkwo', sub: 'Atrial fibrillation', initials: 'GO', last: 'Thank you, doctor. I’ll keep the…', time: '09:40', unread: 2 },
  { id: 'fatima', name: 'Fatima Al-Sayed', sub: 'Heart failure', initials: 'FA', last: 'My ankles are less swollen now.', time: 'Yesterday', unread: 1 },
  { id: 'robert', name: 'Robert Hughes', sub: 'Coronary artery disease', initials: 'RH', last: 'See you on the 26th.', time: 'Mon', unread: 0 },
  { id: 'sofia', name: 'Sofia Martinez', sub: 'Palpitations', initials: 'SM', last: 'Holter results uploaded.', time: '12 Jun', unread: 0 },
]

const THREAD: Msg[] = [
  { id: 1, from: 'them', text: 'Hello Michael, I’ve reviewed the blood pressure log you shared on Friday.', time: '09:58' },
  { id: 2, from: 'me', text: 'Thank you, doctor. Mornings have been between 135 and 142. Evenings are lower.', time: '10:04', read: true },
  { id: 3, from: 'me', text: 'Here is this week’s log.', time: '10:04', read: true, attachment: 'BP-log-9-to-15-June.pdf' },
  { id: 4, from: 'them', text: 'Your readings look better this week. Keep logging them each morning before your Amlodipine, and bring the log on Tuesday.', time: '10:15' },
]

export function ChatView({ role }: { role: 'patient' | 'doctor' }) {
  const convos = role === 'patient' ? PATIENT_CONVOS : DOCTOR_CONVOS
  const [active, setActive] = useState(convos[0].id)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [text, setText] = useState('')
  const base = role === 'patient' ? THREAD : THREAD.map((m) => ({ ...m, from: m.from === 'me' ? ('them' as const) : ('me' as const), read: m.from === 'them' ? true : undefined }))
  const [msgs, setMsgs] = useState<Msg[]>(role === 'doctor' ? [...base, { id: 5, from: 'them', text: 'Morning reading was 138/86. Should I still take my evening dose as usual?', time: '10:22' }] : base)
  const c = convos.find((x) => x.id === active)!

  const send = () => {
    if (!text.trim()) return
    setMsgs((m) => [...m, { id: Date.now(), from: 'me', text: text.trim(), time: 'Now', read: false }])
    setText('')
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] min-h-[520px] overflow-hidden rounded-xl border border-line bg-white lg:h-[calc(100vh-7.5rem)]">
      <aside className={cn('w-full shrink-0 flex-col border-r border-line md:flex md:w-80', mobileOpen ? 'hidden' : 'flex')}>
        <div className="border-b border-line p-4">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input placeholder={role === 'patient' ? 'Search your doctors' : 'Search patients'} className="h-10 w-full rounded-lg border border-line bg-canvas pl-9 pr-3 text-sm focus:border-primary focus:bg-white focus:outline-none" />
          </div>
        </div>
        <ul className="flex-1 overflow-y-auto">
          {convos.map((cv) => (
            <li key={cv.id}>
              <button
                onClick={() => {
                  setActive(cv.id)
                  setMobileOpen(true)
                }}
                className={cn('flex w-full items-center gap-3 border-l-2 px-4 py-3 text-left transition-colors duration-150', cv.id === active ? 'border-primary bg-primary-soft/60' : 'border-transparent hover:bg-canvas')}
              >
                <div className="relative">
                  <Avatar src={cv.photo} initials={cv.initials} size={42} />
                  {cv.online && <span className="absolute bottom-0 right-0 size-3 rounded-full border-2 border-white bg-success" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-semibold text-ink">{cv.name}</p>
                    <span className="shrink-0 text-xs text-muted">{cv.time}</span>
                  </div>
                  <div className="mt-0.5 flex items-center justify-between gap-2">
                    <p className={cn('truncate text-sm', cv.unread ? 'font-medium text-ink' : 'text-muted')}>{cv.last}</p>
                    {cv.unread > 0 && <span className="grid size-5 shrink-0 place-items-center rounded-full bg-primary text-[11px] font-semibold text-white">{cv.unread}</span>}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <p className="flex items-center gap-1.5 border-t border-line px-4 py-3 text-xs text-muted">
          <Lock className="size-3.5 text-success" /> {role === 'patient' ? 'Only doctors you have seen appear here.' : 'Only patients under your care appear here.'}
        </p>
      </aside>

      <section className={cn('min-w-0 flex-1 flex-col md:flex', mobileOpen ? 'flex' : 'hidden')}>
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <button onClick={() => setMobileOpen(false)} className="rounded-md p-1 text-muted md:hidden" aria-label="Back to conversations">
            <ArrowLeft className="size-5" />
          </button>
          <Avatar src={c.photo} initials={c.initials} size={40} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-ink">{c.name}</p>
            <p className="truncate text-xs text-muted">{c.online ? 'Online · ' : ''}{c.sub}</p>
          </div>
          <Badge tone="green" className="hidden sm:inline-flex"><Lock className="size-3" /> End-to-end encrypted</Badge>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-canvas px-4 py-5 sm:px-6">
          <p className="text-center text-xs font-medium text-muted">Today</p>
          {msgs.map((m) => (
            <div key={m.id} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
              <div className={cn('max-w-[85%] sm:max-w-[70%]')}>
                <div className={cn('rounded-2xl px-4 py-2.5 text-sm leading-relaxed', m.from === 'me' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md border border-line bg-white text-ink')}>
                  {m.attachment ? (
                    <span className="flex items-center gap-2"><FileText className="size-4 shrink-0" /> <span className="underline underline-offset-2">{m.attachment}</span></span>
                  ) : (
                    m.text
                  )}
                </div>
                <p className={cn('mt-1 flex items-center gap-1 text-[11px] text-muted', m.from === 'me' && 'justify-end')}>
                  {m.time}
                  {m.from === 'me' && (m.read ? <CheckCheck className="size-3.5 text-primary" /> : <Check className="size-3.5" />)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-line p-3 sm:p-4">
          {role === 'patient' && (
            <div className="mb-2 flex gap-2 overflow-x-auto">
              {['Share BP log', 'Share current medicines', 'Share recent prescription'].map((s) => (
                <button key={s} className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors duration-150 hover:border-primary hover:text-primary">
                  <Activity className="size-3" /> {s}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <button aria-label="Attach file" className="rounded-lg p-2.5 text-muted transition-colors duration-150 hover:bg-canvas hover:text-ink">
              <Paperclip className="size-5" />
            </button>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
              rows={1}
              placeholder={`Message ${c.name}`}
              className="max-h-32 min-h-11 flex-1 resize-none rounded-lg border border-line px-3 py-2.5 text-sm focus:border-primary focus:outline-none"
            />
            <button onClick={send} disabled={!text.trim()} aria-label="Send" className="grid size-11 place-items-center rounded-lg bg-primary text-white transition-colors duration-150 hover:bg-primary-dark disabled:opacity-40">
              <Send className="size-4" />
            </button>
          </div>
          {role === 'patient' && (
            <p className="mt-2 flex items-center gap-1.5 text-xs text-muted"><Phone className="size-3.5" /> Messages are not monitored around the clock. For urgent symptoms use Emergency Support.</p>
          )}
        </div>
      </section>

      {role === 'doctor' && (
        <aside className="hidden w-72 shrink-0 flex-col gap-5 overflow-y-auto border-l border-line p-5 xl:flex">
          <div className="flex flex-col items-center text-center">
            <Avatar initials="MT" size={64} />
            <p className="mt-3 font-semibold text-ink">Michael Thompson</p>
            <p className="text-xs text-muted">64 · Male · PT-204871</p>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold text-muted">Conditions</h3>
            <div className="flex flex-wrap gap-1.5"><Badge tone="orange">Hypertension</Badge><Badge tone="gray">Type 2 diabetes</Badge></div>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold text-muted">Allergies</h3>
            <Badge tone="red">Penicillin</Badge>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold text-muted">Current medicines</h3>
            <ul className="space-y-1.5 text-sm text-ink">
              <li>Amlodipine 5 mg · morning</li>
              <li>Atorvastatin 20 mg · bedtime</li>
              <li>Aspirin 75 mg · after lunch</li>
              <li>Metformin 500 mg · twice daily</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-xs font-semibold text-muted">Next appointment</h3>
            <p className="text-sm text-ink">Tue 17 Jun · 09:30 AM</p>
          </div>
        </aside>
      )}
    </div>
  )
}
