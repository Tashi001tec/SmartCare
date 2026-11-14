import React, { useState } from 'react'
import { Menu, X, Mail, Phone, MapPin, ShieldCheck } from 'lucide-react'
import { Button, Logo, cn } from './ui'

const LINKS = [
  { key: 'landing', label: 'Home' },
  { key: 'about', label: 'About Us' },
  { key: 'p-doctors', label: 'Find Doctors' },
  { key: 'p-hospitals', label: 'Hospitals' },
  { key: 'services', label: 'Services' },
  { key: 'contact', label: 'Contact' },
]

export function PublicHeader({ active, onNavigate }: { active?: string; onNavigate?: (to: string) => void }) {
  const [open, setOpen] = useState(false)
  const go = (k: string) => {
    setOpen(false)
    onNavigate?.(k === 'services' ? 'landing' : k)
  }
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <button onClick={() => go('landing')} aria-label="SmartCare home">
          <Logo />
        </button>
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {LINKS.map((l) => (
            <button
              key={l.key}
              onClick={() => go(l.key)}
              className={cn('rounded-md px-3 py-2 text-sm font-medium transition-colors duration-150', active === l.key ? 'text-primary' : 'text-slate-600 hover:text-ink')}
            >
              {l.label}
            </button>
          ))}
        </nav>
        <div className="ml-auto hidden items-center gap-2 lg:ml-0 lg:flex">
          <Button variant="ghost" onClick={() => go('login')}>
            Login
          </Button>
          <Button onClick={() => go('role-select')}>Get Started</Button>
        </div>
        <button aria-label="Open menu" onClick={() => setOpen(!open)} className="ml-auto rounded-md p-2 text-muted lg:hidden">
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-line bg-white px-4 py-3 lg:hidden">
          {LINKS.map((l) => (
            <button key={l.key} onClick={() => go(l.key)} className="block w-full rounded-md px-3 py-2.5 text-left text-sm font-medium text-ink hover:bg-canvas">
              {l.label}
            </button>
          ))}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button variant="secondary" onClick={() => go('login')}>
              Login
            </Button>
            <Button onClick={() => go('role-select')}>Get Started</Button>
          </div>
        </div>
      )}
    </header>
  )
}

export function PublicFooter({ onNavigate }: { onNavigate?: (to: string) => void }) {
  const go = (k: string) => onNavigate?.(k)
  const cols = [
    { title: 'Patients', links: [['Find a doctor', 'p-doctors'], ['Find a hospital', 'p-hospitals'], ['Create an account', 'reg-patient'], ['Emergency support', 'p-emergency']] },
    { title: 'Providers', links: [['Join as a doctor', 'reg-doctor'], ['Register a pharmacy', 'reg-pharmacy'], ['Verification process', 'about'], ['Provider login', 'login']] },
    { title: 'Company', links: [['About us', 'about'], ['Contact', 'contact'], ['Privacy policy', 'about'], ['Terms of use', 'about']] },
  ]
  return (
    <footer className="bg-primary-dark text-blue-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-2">
          <Logo light />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-blue-200">
            One connected place for patients, doctors, hospitals and pharmacies — built around privacy and verified care.
          </p>
          <ul className="mt-6 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone className="size-4 text-blue-300" /> +1 (555) 010-2200</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-blue-300" /> support@smartcare.health</li>
            <li className="flex items-center gap-2"><MapPin className="size-4 text-blue-300" /> 500 Innovation Way, Riverside, CA</li>
          </ul>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-sm font-semibold text-white">{c.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {c.links.map(([label, key]) => (
                <li key={label}>
                  <button onClick={() => go(key)} className="text-blue-200 transition-colors duration-150 hover:text-white">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-blue-300 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>© 2025 SmartCare. Academic prototype — not a substitute for professional medical advice.</p>
          <p className="flex items-center gap-1.5"><ShieldCheck className="size-3.5" /> In an emergency, call 911 immediately.</p>
        </div>
      </div>
    </footer>
  )
}

/** Split-screen frame for login, registration and verification screens. */
export function AuthLayout({ children, onNavigate, aside, wide = false }: { children: React.ReactNode; onNavigate?: (to: string) => void; aside?: React.ReactNode; wide?: boolean }) {
  return (
    <div className="flex h-screen bg-white">
      <aside className="relative hidden w-[42%] max-w-xl shrink-0 flex-col justify-between bg-primary-dark p-10 text-white lg:flex">
        <button onClick={() => onNavigate?.('landing')} className="self-start">
          <Logo light />
        </button>
        {aside ?? (
          <div>
            <p className="text-3xl font-semibold leading-tight tracking-tight">Your healthcare, connected and simplified.</p>
            <p className="mt-4 max-w-sm text-blue-200">Every doctor and pharmacy on SmartCare is verified by our team before they can see a single record.</p>
          </div>
        )}
        <ul className="space-y-3 text-sm text-blue-100">
          <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Role-based access for patients, doctors and pharmacies</li>
          <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> Encrypted messages and prescriptions</li>
          <li className="flex items-center gap-2"><ShieldCheck className="size-4 text-blue-300" /> You decide which pharmacy sees your prescription</li>
        </ul>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <div className="flex h-16 shrink-0 items-center justify-between px-6 lg:hidden">
          <button onClick={() => onNavigate?.('landing')}>
            <Logo />
          </button>
        </div>
        <div className={cn('mx-auto flex w-full flex-1 flex-col justify-center px-6 py-10', wide ? 'max-w-2xl' : 'max-w-md')}>{children}</div>
      </div>
    </div>
  )
}
