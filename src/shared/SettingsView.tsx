import React, { useState } from 'react'
import { Lock, Bell, ShieldCheck, LogOut, Monitor, Smartphone, KeyRound } from 'lucide-react'
import { Alert, Button, Field, Input, Modal, PageHeader, Panel, Toggle, cn } from './ui'

type Pref = { label: string; desc: string; on: boolean }

export function SettingsView({ notifications, privacy, extra, onNavigate }: { notifications: Pref[]; privacy: Pref[]; extra?: { id: string; label: string; node: React.ReactNode }; onNavigate?: (to: string) => void }) {
  const sections = [
    { id: 'security', label: 'Account security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & access', icon: ShieldCheck },
    ...(extra ? [{ id: extra.id, label: extra.label, icon: KeyRound }] : []),
  ]
  const [sec, setSec] = useState('security')
  const [notif, setNotif] = useState(notifications)
  const [priv, setPriv] = useState(privacy)
  const [saved, setSaved] = useState(false)
  const [pw, setPw] = useState({ cur: '', next: '', confirm: '' })
  const [twoFa, setTwoFa] = useState(true)
  const [logoutAll, setLogoutAll] = useState(false)
  const mismatch = pw.confirm.length > 0 && pw.next !== pw.confirm
  const weak = pw.next.length > 0 && pw.next.length < 10

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader title="Settings" subtitle="Manage security, notifications and who can see your information." />
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
          {sections.map((s) => {
            const Icon = s.icon
            return (
              <button key={s.id} onClick={() => setSec(s.id)} className={cn('flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150', sec === s.id ? 'bg-white text-primary shadow-sm ring-1 ring-line' : 'text-muted hover:text-ink')}>
                <Icon className="size-4" /> {s.label}
              </button>
            )
          })}
          <button onClick={() => onNavigate?.('login')} className="flex shrink-0 items-center gap-2.5 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-danger transition-colors duration-150 hover:bg-danger-soft lg:mt-4">
            <LogOut className="size-4" /> Log out
          </button>
        </nav>

        <div className="min-w-0 space-y-6">
          {saved && <Alert tone="success" title="Changes saved" />}
          {sec === 'security' && (
            <>
              <Panel className="p-5 sm:p-6">
                <h2 className="text-base font-semibold text-ink">Change password</h2>
                <p className="mt-1 text-sm text-muted">Use at least 10 characters with a mix of letters, numbers and symbols.</p>
                <div className="mt-5 grid gap-4 sm:max-w-md">
                  <Field label="Current password"><Input type="password" value={pw.cur} onChange={(e) => setPw({ ...pw, cur: e.target.value })} /></Field>
                  <Field label="New password" error={weak ? 'Password must be at least 10 characters' : undefined}><Input type="password" invalid={weak} value={pw.next} onChange={(e) => setPw({ ...pw, next: e.target.value })} /></Field>
                  <Field label="Confirm new password" error={mismatch ? 'Passwords do not match' : undefined}><Input type="password" invalid={mismatch} value={pw.confirm} onChange={(e) => setPw({ ...pw, confirm: e.target.value })} /></Field>
                  <div>
                    <Button disabled={!pw.cur || !pw.next || weak || mismatch} onClick={() => { setSaved(true); setPw({ cur: '', next: '', confirm: '' }) }}>Update password</Button>
                  </div>
                </div>
              </Panel>
              <Panel className="p-5 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-ink">Two-step verification</h2>
                    <p className="mt-1 text-sm text-muted">A 6-digit code is sent to your phone each time you sign in on a new device.</p>
                  </div>
                  <Toggle label="Two-step verification" checked={twoFa} onChange={setTwoFa} />
                </div>
              </Panel>
              <Panel className="p-5 sm:p-6">
                <h2 className="text-base font-semibold text-ink">Active sessions</h2>
                <ul className="mt-4 divide-y divide-line">
                  {[
                    { icon: Monitor, name: 'Chrome on Windows', meta: 'Riverside, CA · This device', current: true },
                    { icon: Smartphone, name: 'SmartCare on iPhone', meta: 'Riverside, CA · 2 hours ago', current: false },
                  ].map((s) => (
                    <li key={s.name} className="flex items-center gap-3 py-3">
                      <s.icon className="size-5 text-muted" />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-ink">{s.name}</p>
                        <p className="text-xs text-muted">{s.meta}</p>
                      </div>
                      {s.current ? <span className="text-xs font-medium text-success">Active now</span> : <Button variant="ghost" size="sm">Sign out</Button>}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" className="mt-3" onClick={() => setLogoutAll(true)}>Sign out of all other sessions</Button>
              </Panel>
            </>
          )}

          {sec === 'notifications' && (
            <PrefList title="Notification preferences" desc="Choose what SmartCare tells you about. Safety-critical alerts are always on." items={notif} onChange={setNotif} onSave={() => setSaved(true)} />
          )}
          {sec === 'privacy' && (
            <PrefList title="Privacy & data access" desc="You control who can view your information. Changes take effect immediately." items={priv} onChange={setPriv} onSave={() => setSaved(true)} />
          )}
          {extra && sec === extra.id && extra.node}
        </div>
      </div>

      <Modal
        open={logoutAll}
        onClose={() => setLogoutAll(false)}
        title="Sign out of other sessions?"
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setLogoutAll(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => { setLogoutAll(false); setSaved(true) }}>Sign out others</Button>
          </>
        }
      >
        <p className="text-sm text-muted">Every device except this one will be signed out and will need your password and verification code to sign back in.</p>
      </Modal>
    </div>
  )
}

function PrefList({ title, desc, items, onChange, onSave }: { title: string; desc: string; items: Pref[]; onChange: (p: Pref[]) => void; onSave: () => void }) {
  return (
    <Panel className="p-5 sm:p-6">
      <h2 className="text-base font-semibold text-ink">{title}</h2>
      <p className="mt-1 text-sm text-muted">{desc}</p>
      <ul className="mt-4 divide-y divide-line">
        {items.map((p, i) => (
          <li key={p.label} className="flex items-start justify-between gap-4 py-4">
            <div>
              <p className="text-sm font-medium text-ink">{p.label}</p>
              <p className="mt-0.5 text-sm text-muted">{p.desc}</p>
            </div>
            <Toggle label={p.label} checked={p.on} onChange={(v) => onChange(items.map((x, j) => (j === i ? { ...x, on: v } : x)))} />
          </li>
        ))}
      </ul>
      <Button className="mt-2" onClick={onSave}>Save preferences</Button>
    </Panel>
  )
}
