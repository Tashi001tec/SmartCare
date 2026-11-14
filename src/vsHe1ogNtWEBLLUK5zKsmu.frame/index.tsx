import React, { useState } from 'react'
import { MapPin, Phone, Clock, Navigation, Siren, Mail, ChevronRight } from 'lucide-react'
import { AppShell } from '../shared/AppShell'
import { Avatar, BackLink, Badge, Button, Panel, PanelHeader, Rating, cn } from '../shared/ui'
import { MapView } from '../shared/widgets'
import { IMG, doctors, hospitals } from '../shared/data'

export const args = {
  hospital: 'stmarys',
}

export const argTypes = {
  hospital: { control: 'select', options: ['stmarys', 'riverside', 'lakeside', 'northgate'] },
}

type Props = Partial<typeof args> & { onNavigate?: (to: string) => void }

export default function HospitalProfile(props: Props) {
  const { hospital, onNavigate } = { ...args, ...props }
  const h = hospitals.find((x) => x.id === hospital) ?? hospitals[0]
  const docs = doctors.filter((d) => d.hospital === h.name)
  const [dept, setDept] = useState(h.departments[0])
  const [img, setImg] = useState(0)
  const gallery = [h.image, IMG.hospital2, IMG.hospital1]

  return (
    <AppShell role="patient" active="p-hospitals" onNavigate={onNavigate}>
      <div className="mx-auto max-w-7xl">
        <BackLink label="Back to hospitals" onClick={() => onNavigate?.('p-hospitals')} />
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
          <img src={gallery[img]} alt={h.name} className="aspect-[16/8] w-full rounded-xl object-cover" />
          <div className="hidden grid-rows-2 gap-3 lg:grid">
            {[1, 2].map((i) => (
              <button key={i} onClick={() => setImg(img === i ? 0 : i)} className="overflow-hidden rounded-xl">
                <img src={gallery[i]} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{h.name}</h1>
              {h.er24 && <Badge tone="red">24/7 Emergency</Badge>}
            </div>
            <p className="mt-2 flex items-center gap-1.5 text-sm text-muted"><MapPin className="size-4" /> {h.address} · {h.distance} away</p>
            <div className="mt-2"><Rating value={h.rating} count={1240} /></div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" icon={<Phone className="size-4" />}>Call</Button>
            <Button icon={<Navigation className="size-4" />} onClick={() => onNavigate?.('p-hospital-map')}>Get directions</Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="min-w-0 space-y-6">
            <Panel>
              <PanelHeader title="Departments" sub="Select a department to see its doctors" />
              <div className="flex flex-wrap gap-2 px-5">
                {h.departments.map((d) => (
                  <button key={d} onClick={() => setDept(d)} className={cn('rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors duration-150', dept === d ? 'border-primary bg-primary-soft text-primary' : 'border-line text-muted hover:text-ink')}>{d}</button>
                ))}
              </div>
              <ul className="mt-4 divide-y divide-line border-t border-line">
                {(docs.length ? docs : doctors.slice(2, 4)).map((d) => (
                  <li key={d.id} className="flex items-center gap-4 px-5 py-4">
                    <Avatar src={d.photo} initials={d.initials} size={48} />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-ink">{d.name}</p>
                      <p className="text-sm text-muted">{d.specialty} · {d.days} · {d.hours}</p>
                    </div>
                    <Button size="sm" variant="secondary" className="hidden sm:inline-flex" onClick={() => onNavigate?.('p-doctor-profile')}>Profile</Button>
                    <Button size="sm" onClick={() => onNavigate?.('p-booking')}>Book</Button>
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel>
              <PanelHeader title="Medical services" />
              <ul className="grid gap-x-6 px-5 pb-4 sm:grid-cols-2">
                {h.services.map((s) => (
                  <li key={s} className="flex items-center justify-between border-b border-line py-3 text-sm text-ink last:border-0 sm:[&:nth-last-child(2)]:border-0">
                    {s} <ChevronRight className="size-4 text-slate-300" />
                  </li>
                ))}
              </ul>
            </Panel>
          </div>

          <aside className="space-y-6">
            {h.er24 && (
              <section className="rounded-xl border border-red-200 bg-danger-soft p-5">
                <p className="flex items-center gap-2 text-sm font-semibold text-red-800"><Siren className="size-4" /> Emergency department</p>
                <p className="mt-1 text-sm text-red-800">Open 24 hours · Entrance on Harbor Ave</p>
                <a href="tel:911" className="mt-4 flex h-10 items-center justify-center rounded-lg bg-danger text-sm font-semibold text-white transition-colors duration-150 hover:bg-red-700">Call 911</a>
              </section>
            )}
            <Panel className="p-5">
              <h2 className="text-[15px] font-semibold text-ink">Contact & hours</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div className="flex gap-3"><Phone className="size-4 text-muted" /><div><dt className="text-muted">Reception</dt><dd className="font-medium text-ink">{h.phone}</dd></div></div>
                {h.er24 && <div className="flex gap-3"><Siren className="size-4 text-muted" /><div><dt className="text-muted">Emergency line</dt><dd className="font-medium text-ink">{h.emergency}</dd></div></div>}
                <div className="flex gap-3"><Mail className="size-4 text-muted" /><div><dt className="text-muted">Email</dt><dd className="font-medium text-ink">info@{h.id}.org</dd></div></div>
                <div className="flex gap-3"><Clock className="size-4 text-muted" /><div><dt className="text-muted">Outpatient clinics</dt><dd className="font-medium text-ink">Mon – Sat, 08:00 AM – 06:00 PM</dd></div></div>
              </dl>
            </Panel>
            <div>
              <MapView items={[h]} selected={h.id} className="h-48" showControls={false} />
              <button onClick={() => onNavigate?.('p-hospital-map')} className="mt-2 text-sm font-medium text-primary">Open in map</button>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  )
}
