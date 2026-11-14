import React from 'react'
import { ArrowRight, Search, CalendarCheck, FileText, Pill, Stethoscope, Building2, MessageSquare, Sparkles, Siren, ShieldCheck, Lock, BadgeCheck, MapPin, Clock, Check } from 'lucide-react'
import { PublicFooter, PublicHeader } from '../shared/PublicLayout'
import { Avatar, Badge, Button, Rating } from '../shared/ui'
import { QRCode } from '../shared/widgets'
import { IMG, doctors, hospitals } from '../shared/data'

export const args = {
  headline: 'Your Healthcare, Connected and Simplified.',
  subtitle: 'Find trusted doctors, manage your prescriptions, track your medications, and access healthcare services from the comfort of your home.',
}

export const argTypes = {
  headline: { control: 'text' },
  subtitle: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function LandingPage(props: Props) {
  const { headline, subtitle, onNavigate } = { ...args, ...props }
  const go = (k: string) => onNavigate?.(k)

  return (
    <div className="min-h-full bg-white text-ink">
      <PublicHeader active="landing" onNavigate={onNavigate} />

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 pb-16 pt-12 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">{headline}</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{subtitle}</p>
          <div className="mt-8 flex max-w-xl flex-col gap-2 rounded-xl border border-line bg-white p-2 shadow-sm sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input placeholder="Search a doctor, specialty or condition" className="h-12 w-full rounded-lg pl-10 pr-3 text-sm focus:outline-none" />
            </div>
            <Button size="lg" onClick={() => go('p-doctors')}>Find a Doctor</Button>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted">
            <button onClick={() => go('role-select')} className="inline-flex items-center gap-1.5 font-semibold text-primary hover:text-primary-dark">
              Get Started — it’s free for patients <ArrowRight className="size-4" />
            </button>
          </div>
          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {[['1,200+', 'verified doctors'], ['46', 'partner hospitals'], ['180', 'registered pharmacies']].map(([n, l]) => (
              <div key={l}>
                <dt className="text-2xl font-semibold text-ink">{n}</dt>
                <dd className="text-sm text-muted">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <img src={IMG.hero} alt="Doctor showing a patient his health records on a tablet" className="aspect-[4/5] w-full rounded-2xl object-cover" />
          <div className="absolute -bottom-6 left-4 right-4 rounded-xl border border-line bg-white p-4 shadow-lg sm:left-auto sm:right-6 sm:w-72">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-success-soft text-success"><CalendarCheck className="size-5" /></span>
              <div>
                <p className="text-sm font-semibold">Appointment confirmed</p>
                <p className="text-xs text-muted">Dr. Kwame Adebayo · Tue 09:30 AM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight">How SmartCare works</h2>
          <p className="mt-3 max-w-xl text-muted">From finding the right doctor to collecting your medicine, in four steps.</p>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ['Find the right doctor', 'Search by name, specialty or the condition you want help with, and compare verified profiles.'],
              ['Book a time that suits you', 'Pick an open slot at a partner hospital and get an instant confirmation.'],
              ['Receive a digital prescription', 'Your doctor issues it securely to your account, with a QR reference only you control.'],
              ['Collect from your pharmacy', 'Share the prescription with a verified pharmacy and get notified when it’s ready.'],
            ].map(([t, d], i) => (
              <li key={t} className="relative">
                <span className="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white">{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.6fr] lg:px-8">
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Our healthcare services</h2>
          <p className="mt-3 text-muted">Everything you need between visits, in one account you can manage from home.</p>
          <Button className="mt-8" onClick={() => go('role-select')}>Create your account</Button>
        </div>
        <ul className="divide-y divide-line border-y border-line">
          {[
            [Stethoscope, 'Find doctors', 'Specialists and GPs with verified credentials, hours and patient reviews.', 'p-doctors'],
            [Building2, 'Hospital discovery', 'Departments, services, emergency hours and directions on a live map.', 'p-hospitals'],
            [CalendarCheck, 'Appointments', 'Book, reschedule or cancel within each hospital’s policy.', 'p-booking'],
            [FileText, 'Digital prescriptions', 'Every prescription in one place, with a secure QR reference.', 'p-prescriptions'],
            [MessageSquare, 'Secure messaging', 'Follow-up questions go straight to the doctors treating you.', 'p-messages'],
          ].map(([Icon, t, d, k]) => {
            const I = Icon as React.ElementType
            return (
              <li key={t as string}>
                <button onClick={() => go(k as string)} className="group flex w-full items-center gap-5 py-5 text-left">
                  <I className="size-6 shrink-0 text-primary" />
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold">{t as string}</span>
                    <span className="mt-0.5 block text-sm text-muted">{d as string}</span>
                  </span>
                  <ArrowRight className="size-5 shrink-0 text-slate-300 transition-[color,transform] duration-150 ease-out group-hover:translate-x-0.5 group-hover:text-primary" />
                </button>
              </li>
            )
          })}
        </ul>
      </section>

      {/* Doctors */}
      <section className="bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">Find trusted doctors</h2>
              <p className="mt-3 max-w-lg text-muted">Every doctor’s medical registration is checked by our team before their profile goes live.</p>
            </div>
            <Button variant="secondary" onClick={() => go('p-doctors')}>Browse all doctors <ArrowRight className="size-4" /></Button>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {doctors.slice(0, 4).map((d) => (
              <article key={d.id} className="flex flex-col rounded-xl border border-line bg-white p-5">
                <div className="flex items-center gap-3">
                  <Avatar src={d.photo} initials={d.initials} size={52} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold">{d.name}</p>
                    <p className="text-sm text-primary">{d.specialty}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted">{d.hospital}</p>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <Rating value={d.rating} count={d.reviews} />
                  <span className="text-muted">{d.experience} yrs</span>
                </div>
                <Button variant="soft" size="sm" className="mt-5 w-full" onClick={() => go('p-doctor-profile')}>View profile</Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">Partner hospitals</h2>
        <p className="mt-3 max-w-lg text-muted">See departments, emergency hours and the doctors who work there before you travel.</p>
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <button onClick={() => go('p-hospital-profile')} className="group overflow-hidden rounded-2xl border border-line text-left">
            <img src={hospitals[0].image} alt={hospitals[0].name} className="aspect-[16/9] w-full object-cover" />
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="text-lg font-semibold">{hospitals[0].name}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><MapPin className="size-4" /> {hospitals[0].address}</p>
              </div>
              <Badge tone="red">24/7 Emergency</Badge>
            </div>
          </button>
          <ul className="divide-y divide-line rounded-2xl border border-line">
            {hospitals.slice(1).map((h) => (
              <li key={h.id}>
                <button onClick={() => go('p-hospital-profile')} className="flex w-full items-center gap-4 p-5 text-left transition-colors duration-150 hover:bg-canvas">
                  <img src={h.image} alt="" className="size-16 shrink-0 rounded-lg object-cover" />
                  <div className="min-w-0">
                    <p className="font-semibold">{h.name}</p>
                    <p className="mt-0.5 text-sm text-muted">{h.departments.slice(0, 3).join(' · ')}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted"><Clock className="size-3.5" /> {h.hours}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Prescriptions + reminders */}
      <section className="bg-primary-dark text-white">
        <div className="mx-auto grid max-w-7xl gap-16 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Digital prescriptions</h2>
            <p className="mt-3 max-w-md text-blue-200">Your doctor issues prescriptions straight to your account. The QR code holds a secure reference — never your medical details — so only a pharmacy you authorise can open it.</p>
            <div className="mt-8 flex items-center gap-5 rounded-xl bg-white p-5 text-ink">
              <QRCode value="RX-2025-08417" size={104} />
              <div className="min-w-0">
                <p className="text-xs text-muted">Prescription reference</p>
                <p className="font-semibold">RX-2025-08417</p>
                <p className="mt-2 text-sm text-muted">Dr. Kwame Adebayo · 3 medicines</p>
                <p className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-success"><Lock className="size-3.5" /> Shared only with CityCare Pharmacy</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Smart medication reminders</h2>
            <p className="mt-3 max-w-md text-blue-200">Reminders follow your doctor’s exact instructions. Mark each dose as taken and see how well you’re keeping up.</p>
            <ol className="mt-8 space-y-3">
              {[['08:00 AM', 'Amlodipine 5 mg', 'Taken'], ['01:00 PM', 'Aspirin 75 mg', 'Due now'], ['09:30 PM', 'Atorvastatin 20 mg', 'Upcoming']].map(([t, m, s]) => (
                <li key={t} className="flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3">
                  <span className="w-20 shrink-0 text-sm text-blue-200">{t}</span>
                  <Pill className="size-4 shrink-0 text-blue-300" />
                  <span className="flex-1 font-medium">{m}</span>
                  <span className={s === 'Taken' ? 'inline-flex items-center gap-1 text-sm text-green-300' : s === 'Due now' ? 'text-sm font-semibold text-amber-300' : 'text-sm text-blue-200'}>
                    {s === 'Taken' && <Check className="size-4" />} {s}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* AI assistant */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="order-2 rounded-2xl border border-line bg-canvas p-5 sm:p-6 lg:order-1">
          <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-white">What does “take after food” on my prescription mean?</div>
          <div className="mt-3 flex gap-2.5">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Sparkles className="size-4" /></span>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md border border-line bg-white px-4 py-2.5 text-sm leading-relaxed">
              It means taking the medicine within about 30 minutes after a meal, which can reduce stomach upset. Follow your doctor’s exact instructions — if you’re unsure, message them or ask your pharmacist.
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted">SmartCare AI gives general information only. It does not diagnose or prescribe.</p>
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-semibold tracking-tight">SmartCare AI, when your doctor isn’t available</h2>
          <p className="mt-3 max-w-md text-muted">Ask about medical terms, your prescription instructions or which specialist to see. It recognises emergency symptoms and points you to urgent help straight away.</p>
          <Button variant="secondary" className="mt-8" onClick={() => go('p-ai')}><Sparkles className="size-4" /> Try SmartCare AI</Button>
        </div>
      </section>

      {/* Why */}
      <section className="border-t border-line bg-canvas">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-semibold tracking-tight">Why choose SmartCare</h2>
          <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {[
              [BadgeCheck, 'Verified providers', 'Doctors and pharmacies are approved by an administrator before they can access any patient feature.'],
              [Lock, 'Your records, your rules', 'You only see your own records. Doctors see patients under their care. Pharmacies see only what you share.'],
              [Siren, 'Help in an emergency', 'A clear emergency button on every screen, with nearby emergency departments one tap away.'],
            ].map(([Icon, t, d]) => {
              const I = Icon as React.ElementType
              return (
                <div key={t as string} className="border-l-2 border-primary pl-5">
                  <I className="size-5 text-primary" />
                  <h3 className="mt-3 font-semibold">{t as string}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{d as string}</p>
                </div>
              )
            })}
          </div>
          <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-2xl bg-primary p-8 text-white sm:flex-row sm:items-center sm:p-10">
            <div>
              <p className="text-2xl font-semibold">Ready to take charge of your health?</p>
              <p className="mt-1 text-blue-100">Free for patients. Doctors and pharmacies join after verification.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => go('role-select')} className="h-12 rounded-lg bg-white px-6 font-semibold text-primary transition-colors duration-150 hover:bg-primary-soft">Get Started</button>
              <button onClick={() => go('p-doctors')} className="h-12 rounded-lg border border-white/40 px-6 font-semibold text-white transition-colors duration-150 hover:bg-white/10">Find a Doctor</button>
            </div>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted"><ShieldCheck className="size-4 text-success" /> Academic prototype: sample data only, no real medical records are stored.</p>
        </div>
      </section>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}
