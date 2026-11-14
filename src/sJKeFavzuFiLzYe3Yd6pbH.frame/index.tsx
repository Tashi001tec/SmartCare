import React from 'react'
import { BadgeCheck, Lock, HeartHandshake } from 'lucide-react'
import { PublicFooter, PublicHeader } from '../shared/PublicLayout'
import { Button } from '../shared/ui'
import { IMG } from '../shared/data'

export const args = {
  mission: 'We believe good care shouldn’t depend on how close you live to a hospital or how well you remember your medicine times.',
}

export const argTypes = {
  mission: { control: 'text' },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function AboutUs(props: Props) {
  const { mission, onNavigate } = { ...args, ...props }
  return (
    <div className="min-h-full bg-white text-ink">
      <PublicHeader active="about" onNavigate={onNavigate} />

      <section className="mx-auto max-w-4xl px-4 pb-12 pt-16 sm:px-6 lg:pt-24">
        <p className="text-sm font-semibold text-primary">About SmartCare</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{mission}</h1>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <img src={IMG.hospital2} alt="Hospital reception with patients and staff" className="aspect-[21/9] w-full rounded-2xl object-cover" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight">One platform, four kinds of people</h2>
        <div className="space-y-8 text-[17px] leading-relaxed text-slate-600">
          <p>SmartCare connects <strong className="font-semibold text-ink">patients</strong> with the <strong className="font-semibold text-ink">doctors</strong> and <strong className="font-semibold text-ink">hospitals</strong> that treat them, and with the <strong className="font-semibold text-ink">pharmacies</strong> that fill their prescriptions. Each sees a different app, built around what they need to do — and nothing they shouldn’t see.</p>
          <p>Patients book appointments, follow their medication routine and message their care team. Doctors manage their schedule, issue digital prescriptions and keep an eye on their patients between visits. Pharmacies verify prescriptions by QR reference and keep patients updated on their orders.</p>
        </div>
      </section>

      <section className="border-y border-line bg-canvas">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            [BadgeCheck, 'Verified before access', 'An administrator checks every doctor’s medical registration and every pharmacy’s licence before they can use restricted features.'],
            [Lock, 'Privacy by role', 'Patients see only their own records. Doctors see patients under their care. Pharmacies see only prescriptions a patient chooses to share.'],
            [HeartHandshake, 'Technology that knows its limits', 'SmartCare AI explains and guides — it never diagnoses, prescribes or changes a dose, and it escalates emergencies immediately.'],
          ].map(([Icon, t, d]) => {
            const I = Icon as React.ElementType
            return (
              <div key={t as string}>
                <I className="size-6 text-primary" />
                <h3 className="mt-4 text-lg font-semibold">{t as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d as string}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 border-b border-line pb-16 sm:grid-cols-2 lg:grid-cols-4">
          {[['2023', 'Started as a university research project'], ['46', 'Partner hospitals'], ['1,200+', 'Verified doctors'], ['38,000', 'Patients managing care at home']].map(([n, l]) => (
            <div key={l}>
              <p className="text-4xl font-semibold tracking-tight text-primary">{n}</p>
              <p className="mt-2 text-sm text-muted">{l}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xl font-semibold">Questions about how SmartCare works?</p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => onNavigate?.('contact')}>Contact us</Button>
            <Button onClick={() => onNavigate?.('role-select')}>Get Started</Button>
          </div>
        </div>
      </section>

      <PublicFooter onNavigate={onNavigate} />
    </div>
  )
}
