import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Send, Trash2, Siren, Stethoscope, Info, Phone, MapPin } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Button, Modal, cn } from '../shared/ui'

export const args = {
  state: 'conversation',
}

export const argTypes = {
  state: { control: 'radio', options: ['welcome', 'conversation', 'emergency'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

type Msg = { id: number; from: 'user' | 'ai'; text: string; kind?: 'emergency' | 'doctor' }

const SUGGESTED = [
  'What does my prescription mean?',
  'How can I manage my daily medicine routine?',
  'Which doctor should I consult?',
  'What should I know about my medication?',
  'How can I find a nearby hospital?',
]

const EMERGENCY = /chest pain|can'?t breathe|cannot breathe|difficulty breathing|unconscious|stroke|face drooping|severe bleeding|suicid|overdose|seizure/i

function reply(q: string): Omit<Msg, 'id'> {
  if (EMERGENCY.test(q)) {
    return { from: 'ai', kind: 'emergency', text: 'These symptoms can be a medical emergency. Please call 911 now or go to the nearest emergency department. Don’t wait to see if they pass, and don’t drive yourself.' }
  }
  const s = q.toLowerCase()
  if (s.includes('prescription mean'))
    return { from: 'ai', text: 'Your active prescription RX-2025-08417 from Dr. Kwame Adebayo lists three medicines:\n\n• Amlodipine 5 mg, once every morning — a calcium-channel blocker that relaxes blood vessels to lower blood pressure.\n• Atorvastatin 20 mg, at bedtime — a statin that lowers LDL (“bad”) cholesterol.\n• Aspirin 75 mg, after lunch — a low dose that makes blood less likely to clot.\n\nThis is general information. For questions about why these were chosen for you, message Dr. Adebayo.' }
  if (s.includes('routine'))
    return { from: 'ai', text: 'A few things that help many people:\n\n• Link each dose to a daily habit — breakfast, lunch, brushing your teeth.\n• Keep reminders switched on in Medicine Reminders.\n• Mark doses as taken right away so your history stays accurate.\n• If you miss a dose, don’t take a double dose. Check the leaflet or ask your pharmacist.\n\nI can’t change the doses or times your doctor prescribed.' }
  if (s.includes('which doctor') || s.includes('consult'))
    return { from: 'ai', kind: 'doctor', text: 'I can point you in the right direction. Tell me a little about what’s bothering you. For example: headaches and migraines are usually seen by a neurologist, skin rashes by a dermatologist, and joint pain by an orthopedic specialist. A general physician is a good first step if you’re unsure.' }
  if (s.includes('medication') || s.includes('know about'))
    return { from: 'ai', text: 'For Atorvastatin, it’s commonly advised to avoid large amounts of grapefruit juice, and to report unexplained muscle pain to your doctor. For Metformin, taking it with meals reduces stomach upset.\n\nAlways follow the instructions on your prescription. Your pharmacist can also review all your medicines together.' }
  if (s.includes('hospital'))
    return { from: 'ai', text: 'The nearest partner hospital to you is St. Mary’s General Hospital, 2.4 km away, with a 24/7 emergency department. Riverside Community Hospital (4.1 km) also has 24/7 emergency care. You can see both on the hospital map.' }
  return { from: 'ai', text: 'I can share general health information, explain medical terms, and help you find the right doctor or hospital. I can’t diagnose conditions or recommend changes to your treatment — for that, please contact a qualified doctor.' }
}

const CONVO: Msg[] = [
  { id: 1, from: 'user', text: 'What does my prescription mean?' },
  { id: 2, ...reply('What does my prescription mean?') },
]

export default function AIAssistant(props: Props) {
  const { state, onNavigate } = { ...args, ...props }
  const [msgs, setMsgs] = useState<Msg[]>(state === 'welcome' ? [] : state === 'emergency' ? [{ id: 1, from: 'user', text: 'I have chest pain spreading to my left arm and I feel sweaty' }, { id: 2, ...reply('chest pain') }] : CONVO)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(false)
  const [clearing, setClearing] = useState(false)
  const end = useRef<HTMLDivElement>(null)

  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' })
  }, [msgs, typing])

  const ask = (q: string) => {
    if (!q.trim() || typing) return
    setMsgs((m) => [...m, { id: Date.now(), from: 'user', text: q.trim() }])
    setText('')
    const urgent = EMERGENCY.test(q)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { id: Date.now() + 1, ...reply(q) }])
    }, urgent ? 250 : 900)
  }

  return (
    <AppShell role="patient" active="p-ai" onNavigate={onNavigate}>
      <div className="mx-auto flex h-[calc(100vh-8rem)] min-h-[520px] max-w-4xl flex-col overflow-hidden rounded-xl border border-line bg-white lg:h-[calc(100vh-7.5rem)]">
        <header className="flex items-center gap-3 border-b border-line px-4 py-3 sm:px-5">
          <span className="grid size-10 place-items-center rounded-full bg-primary text-white"><Sparkles className="size-5" /></span>
          <div className="min-w-0 flex-1">
            <h1 className="font-semibold text-ink">SmartCare AI</h1>
            <p className="text-xs text-muted">General health guidance · not a replacement for a doctor</p>
          </div>
          <Button variant="ghost" size="sm" icon={<Trash2 className="size-4" />} disabled={!msgs.length} onClick={() => setClearing(true)}><span className="hidden sm:inline">Clear</span></Button>
        </header>

        <div className="flex items-start gap-2 border-b border-line bg-primary-soft px-4 py-2.5 text-xs text-primary-dark sm:px-5">
          <Info className="mt-px size-3.5 shrink-0" />
          <p>SmartCare AI does not diagnose, prescribe or change doses. If you think it’s an emergency, call 911 or use <button onClick={() => onNavigate?.('p-emergency')} className="font-semibold underline">Emergency Support</button>.</p>
        </div>

        <div className="flex-1 overflow-y-auto bg-canvas px-4 py-6 sm:px-6">
          {msgs.length === 0 ? (
            <div className="mx-auto max-w-lg pt-6 text-center">
              <span className="mx-auto grid size-14 place-items-center rounded-full bg-primary-soft text-primary"><Sparkles className="size-7" /></span>
              <h2 className="mt-4 text-xl font-semibold text-ink">Hi Michael, how can I help?</h2>
              <p className="mt-1 text-sm text-muted">Ask about your medicines, medical terms, or which doctor to see.</p>
              <div className="mt-6 grid gap-2 text-left sm:grid-cols-2">
                {SUGGESTED.map((q) => (
                  <button key={q} onClick={() => ask(q)} className="rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink transition-colors duration-150 hover:border-primary hover:text-primary">{q}</button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {msgs.map((m) => (
                <motion.div key={m.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: 'easeOut' }} className={cn('flex gap-2.5', m.from === 'user' ? 'justify-end' : 'justify-start')}>
                  {m.from === 'ai' && <span className={cn('grid size-8 shrink-0 place-items-center rounded-full', m.kind === 'emergency' ? 'bg-danger text-white' : 'bg-primary-soft text-primary')}>{m.kind === 'emergency' ? <Siren className="size-4" /> : <Sparkles className="size-4" />}</span>}
                  <div className={cn('max-w-[85%] sm:max-w-[75%]')}>
                    {m.kind === 'emergency' ? (
                      <div role="alert" className="overflow-hidden rounded-2xl rounded-bl-md border border-red-200 bg-white">
                        <p className="bg-danger px-4 py-2 text-sm font-semibold text-white">Possible emergency</p>
                        <p className="px-4 py-3 text-sm leading-relaxed text-ink">{m.text}</p>
                        <div className="grid gap-2 px-4 pb-4 sm:grid-cols-2">
                          <a href="tel:911" className="flex h-11 items-center justify-center gap-2 rounded-lg bg-danger text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-700"><Phone className="size-4" /> Call 911</a>
                          <Button variant="secondary" size="lg" className="h-11" icon={<MapPin className="size-4" />} onClick={() => onNavigate?.('p-emergency')}>Nearest ER</Button>
                        </div>
                      </div>
                    ) : (
                      <div className={cn('whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed', m.from === 'user' ? 'rounded-br-md bg-primary text-white' : 'rounded-bl-md border border-line bg-white text-ink')}>
                        {m.text}
                        {m.kind === 'doctor' && <Button size="sm" variant="soft" className="mt-3" icon={<Stethoscope className="size-4" />} onClick={() => onNavigate?.('p-doctors')}>Browse doctors</Button>}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-2.5" aria-live="polite" aria-label="SmartCare AI is typing">
                  <span className="grid size-8 place-items-center rounded-full bg-primary-soft text-primary"><Sparkles className="size-4" /></span>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3">
                    {[0, 1, 2].map((i) => <span key={i} className="size-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${i * 120}ms` }} />)}
                  </div>
                </div>
              )}
              <div ref={end} />
            </div>
          )}
        </div>

        <div className="border-t border-line p-3 sm:p-4">
          {msgs.length > 0 && (
            <div className="mb-2 flex gap-2 overflow-x-auto">
              {SUGGESTED.slice(1).map((q) => <button key={q} onClick={() => ask(q)} className="shrink-0 rounded-full border border-line px-3 py-1 text-xs font-medium text-muted transition-colors duration-150 hover:border-primary hover:text-primary">{q}</button>)}
            </div>
          )}
          <form onSubmit={(e) => { e.preventDefault(); ask(text) }} className="flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Ask a health question…" className="h-11 min-w-0 flex-1 rounded-lg border border-line px-3 text-sm focus:border-primary focus:outline-none" />
            <button type="submit" disabled={!text.trim() || typing} aria-label="Send" className="grid size-11 place-items-center rounded-lg bg-primary text-white transition-colors duration-150 hover:bg-primary-dark disabled:opacity-40"><Send className="size-4" /></button>
          </form>
        </div>
      </div>

      <Modal open={clearing} onClose={() => setClearing(false)} title="Clear this conversation?" size="sm" footer={<><Button variant="secondary" onClick={() => setClearing(false)}>Cancel</Button><Button variant="danger" onClick={() => { setMsgs([]); setClearing(false) }}>Clear</Button></>}>
        <p className="text-sm text-muted">Your chat history with SmartCare AI will be permanently deleted. This doesn’t affect your medical records.</p>
      </Modal>
    </AppShell>
  )
}
