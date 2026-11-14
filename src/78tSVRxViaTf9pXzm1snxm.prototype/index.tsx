import React, { useEffect, useState } from 'react'

import LandingPage from '../r5SFMK3kqWKxHbjXy2yJX8.frame'
import AboutUs from '../sJKeFavzuFiLzYe3Yd6pbH.frame'
import ContactUs from '../f8E16tYVztmaSbXtRszh2b.frame'
import Login from '../hoYGf9G5akJ826cYLmNafE.frame'
import RoleSelection from '../p1oHWgKybUV2yvYxS8Bkdh.frame'
import ForgotPassword from '../qHkBCKmVdi1hWox5xGyLFb.frame'
import PasswordReset from '../sa7aHrAzt8ynS3msuiS3TC.frame'
import PatientRegistration from '../4wEFZdH1yU5uDZHnE6endr.frame'
import DoctorRegistration from '../bjo8UrpnueVnputQXuR1ZV.frame'
import PharmacyRegistration from '../icGj7UrMuGeRbHAfeQ23PW.frame'
import EmailVerification from '../2yoZ2oiEVbFYxcGzAGjPf2.frame'
import PendingVerification from '../5MYMLKWrZCC96ovRwn6MvM.frame'
import PatientDashboard from '../kRZVit7Xo7zmHvg6hGsaRZ.frame'
import PatientProfile from '../hiiMVGAoaDz2vjJVu2bSUq.frame'
import FindDoctors from '../avc2TnVMia6539YDN7KTFT.frame'
import DoctorProfile from '../a9d9NnE67qMhmJ4wwui8tL.frame'
import FindHospitals from '../ue2UL2zp6oadhqxFtkLZGS.frame'
import HospitalProfile from '../vsHe1ogNtWEBLLUK5zKsmu.frame'
import HospitalMap from '../rje83futDmHK8ugMR7YT1M.frame'
import AppointmentBooking from '../hkZXrghY573F3aQZxX3ew5.frame'
import AppointmentCalendar from '../e3Aqjr5gn7UqHd5GPGGCwh.frame'
import AppointmentHistory from '../w4srmUUTMNY2SJkqzvFJTP.frame'
import MyPrescriptions from '../dAyGab837FG4Xh1C7B5fu3.frame'
import PrescriptionDetails from '../bPzQk1D1FMjn1EuZcnddPd.frame'
import PrescriptionQR from '../eEJthxBRzbRqVp4LeRZLQR.frame'
import DailyMedicineSchedule from '../sPNfZ3op2teApCk8k199ce.frame'
import MedicineReminder from '../5vJ2oH1FnPWsddj8EgAK3L.frame'
import MedicationHistory from '../7dxnTL1hf7MXhRhTWMoFSo.frame'
import PatientMessages from '../gxYzQyEqDUQJdtM63iV5MW.frame'
import AIAssistant from '../dhoV6UWvciPXfF6xkwv3uy.frame'
import EmergencySupport from '../w3vNqRJWmEVAZLaYUDXZqG.frame'
import PatientNotifications from '../1ndCSLpMEbohHyZ2rvjitk.frame'
import PatientSettings from '../5FXuCGuRZdEfD2hhqrpntx.frame'
import DoctorDashboard from '../niAsxy2rHdFN5KpWqZaBor.frame'
import DoctorProfileManagement from '../cUjQ1NGVrATriix7LVTrCp.frame'
import DoctorPatientList from '../geEUET4bkmb61AYWoM8gXF.frame'
import PatientDetails from '../8Rp5d5Xfe1ke9EbTuAbx9n.frame'
import DoctorAppointments from '../rxVcxPDBR5fdN4En1JYYDo.frame'
import DoctorCalendar from '../4pFtuFeMq3We97EQg86ZPk.frame'
import AvailabilityManagement from '../619TbUmnN6ovHrUxHBzThp.frame'
import CreatePrescription from '../datpyTsmhKYUxbzTGbFYZB.frame'
import PrescriptionHistory from '../nroYRbUD2su5KuyGWzgH8a.frame'
import DoctorMessages from '../sbsX5bFBsbV1MPeZBCMeCG.frame'
import DoctorNotifications from '../gFMbU2RKf3vwkr5UPqEytJ.frame'
import DoctorSettings from '../9CNxoLWb1VdB9EdDAxJrQ7.frame'

/** The size every frame draws at, unless one exports its own. */
export const viewport = 'web'

export const folders = [
  {
    id: 'public',
    name: 'Public & Authentication',
    frames: [
      'r5SFMK3kqWKxHbjXy2yJX8', 'sJKeFavzuFiLzYe3Yd6pbH', 'f8E16tYVztmaSbXtRszh2b', 'hoYGf9G5akJ826cYLmNafE', 'p1oHWgKybUV2yvYxS8Bkdh', 'qHkBCKmVdi1hWox5xGyLFb',
      'sa7aHrAzt8ynS3msuiS3TC', '4wEFZdH1yU5uDZHnE6endr', 'bjo8UrpnueVnputQXuR1ZV', 'icGj7UrMuGeRbHAfeQ23PW', '2yoZ2oiEVbFYxcGzAGjPf2', '5MYMLKWrZCC96ovRwn6MvM',
    ],
  },
  {
    id: 'patient',
    name: 'Patient',
    frames: [
      'kRZVit7Xo7zmHvg6hGsaRZ',
      'hiiMVGAoaDz2vjJVu2bSUq',
      'avc2TnVMia6539YDN7KTFT',
      'a9d9NnE67qMhmJ4wwui8tL',
      'ue2UL2zp6oadhqxFtkLZGS',
      'vsHe1ogNtWEBLLUK5zKsmu',
      'rje83futDmHK8ugMR7YT1M',
      'hkZXrghY573F3aQZxX3ew5',
      'e3Aqjr5gn7UqHd5GPGGCwh',
      'w4srmUUTMNY2SJkqzvFJTP',
      'dAyGab837FG4Xh1C7B5fu3',
      'bPzQk1D1FMjn1EuZcnddPd',
      'eEJthxBRzbRqVp4LeRZLQR',
      'sPNfZ3op2teApCk8k199ce',
      '5vJ2oH1FnPWsddj8EgAK3L',
      '7dxnTL1hf7MXhRhTWMoFSo',
      'gxYzQyEqDUQJdtM63iV5MW',
      'dhoV6UWvciPXfF6xkwv3uy',
      'w3vNqRJWmEVAZLaYUDXZqG',
      '1ndCSLpMEbohHyZ2rvjitk',
      '5FXuCGuRZdEfD2hhqrpntx',
    ],
  },
  {
    id: 'doctor',
    name: 'Doctor',
    frames: [
      'niAsxy2rHdFN5KpWqZaBor',
      'cUjQ1NGVrATriix7LVTrCp',
      'geEUET4bkmb61AYWoM8gXF',
      '8Rp5d5Xfe1ke9EbTuAbx9n',
      'rxVcxPDBR5fdN4En1JYYDo',
      '4pFtuFeMq3We97EQg86ZPk',
      '619TbUmnN6ovHrUxHBzThp',
      'datpyTsmhKYUxbzTGbFYZB',
      'nroYRbUD2su5KuyGWzgH8a',
      'sbsX5bFBsbV1MPeZBCMeCG',
      'gFMbU2RKf3vwkr5UPqEytJ',
      '9CNxoLWb1VdB9EdDAxJrQ7',
    ],
  },
]

type Nav = { onNavigate?: (to: string) => void }
type Route = [frameId: string, Frame: React.ComponentType<any>, props?: Record<string, unknown>]

/** Route key → frame. Every frame navigates by calling onNavigate(routeKey). */
const ROUTES: Record<string, Route> = {
  landing: ['r5SFMK3kqWKxHbjXy2yJX8', LandingPage],
  about: ['sJKeFavzuFiLzYe3Yd6pbH', AboutUs],
  contact: ['f8E16tYVztmaSbXtRszh2b', ContactUs],
  login: ['hoYGf9G5akJ826cYLmNafE', Login, { state: 'default' }],
  'role-select': ['p1oHWgKybUV2yvYxS8Bkdh', RoleSelection],
  forgot: ['qHkBCKmVdi1hWox5xGyLFb', ForgotPassword, { state: 'request' }],
  reset: ['sa7aHrAzt8ynS3msuiS3TC', PasswordReset, { state: 'form' }],
  'reg-patient': ['4wEFZdH1yU5uDZHnE6endr', PatientRegistration, { state: 'empty' }],
  'reg-doctor': ['bjo8UrpnueVnputQXuR1ZV', DoctorRegistration, { step: 1 }],
  'reg-pharmacy': ['icGj7UrMuGeRbHAfeQ23PW', PharmacyRegistration, { state: 'default' }],
  'verify-email': ['2yoZ2oiEVbFYxcGzAGjPf2', EmailVerification, { state: 'code', next: 'patient' }],
  'verify-email-doctor': ['2yoZ2oiEVbFYxcGzAGjPf2', EmailVerification, { state: 'code', next: 'doctor', email: 'k.adebayo@stmarys.org' }],
  'verify-email-pharmacy': ['2yoZ2oiEVbFYxcGzAGjPf2', EmailVerification, { state: 'code', next: 'pharmacy', email: 'orders@citycarepharmacy.com' }],
  pending: ['5MYMLKWrZCC96ovRwn6MvM', PendingVerification, { role: 'doctor', status: 'pending' }],
  'p-dashboard': ['kRZVit7Xo7zmHvg6hGsaRZ', PatientDashboard],
  'p-profile': ['hiiMVGAoaDz2vjJVu2bSUq', PatientProfile, { editing: false }],
  'p-doctors': ['avc2TnVMia6539YDN7KTFT', FindDoctors, { state: 'default' }],
  'p-doctor-profile': ['a9d9NnE67qMhmJ4wwui8tL', DoctorProfile, { doctor: 'kwame', noSlots: false }],
  'p-hospitals': ['ue2UL2zp6oadhqxFtkLZGS', FindHospitals],
  'p-hospital-profile': ['vsHe1ogNtWEBLLUK5zKsmu', HospitalProfile],
  'p-hospital-map': ['rje83futDmHK8ugMR7YT1M', HospitalMap],
  'p-booking': ['hkZXrghY573F3aQZxX3ew5', AppointmentBooking, { state: 'booking' }],
  'p-calendar': ['e3Aqjr5gn7UqHd5GPGGCwh', AppointmentCalendar],
  'p-appointments': ['w4srmUUTMNY2SJkqzvFJTP', AppointmentHistory, { tab: 'upcoming', empty: false }],
  'p-prescriptions': ['dAyGab837FG4Xh1C7B5fu3', MyPrescriptions, { empty: false }],
  'p-rx-detail': ['bPzQk1D1FMjn1EuZcnddPd', PrescriptionDetails, { shared: false }],
  'p-rx-qr': ['eEJthxBRzbRqVp4LeRZLQR', PrescriptionQR],
  'p-meds': ['sPNfZ3op2teApCk8k199ce', DailyMedicineSchedule, { state: 'in-progress' }],
  'p-reminder': ['5vJ2oH1FnPWsddj8EgAK3L', MedicineReminder, { alert: true }],
  'p-med-history': ['7dxnTL1hf7MXhRhTWMoFSo', MedicationHistory],
  'p-messages': ['gxYzQyEqDUQJdtM63iV5MW', PatientMessages],
  'p-ai': ['dhoV6UWvciPXfF6xkwv3uy', AIAssistant, { state: 'welcome' }],
  'p-emergency': ['w3vNqRJWmEVAZLaYUDXZqG', EmergencySupport, { calling: false }],
  'p-notifications': ['1ndCSLpMEbohHyZ2rvjitk', PatientNotifications, { empty: false }],
  'p-settings': ['5FXuCGuRZdEfD2hhqrpntx', PatientSettings],
  'd-dashboard': ['niAsxy2rHdFN5KpWqZaBor', DoctorDashboard, { state: 'default' }],
  'd-profile': ['cUjQ1NGVrATriix7LVTrCp', DoctorProfileManagement],
  'd-patients': ['geEUET4bkmb61AYWoM8gXF', DoctorPatientList],
  'd-patient': ['8Rp5d5Xfe1ke9EbTuAbx9n', PatientDetails],
  'd-appointments': ['rxVcxPDBR5fdN4En1JYYDo', DoctorAppointments],
  'd-calendar': ['4pFtuFeMq3We97EQg86ZPk', DoctorCalendar],
  'd-availability': ['619TbUmnN6ovHrUxHBzThp', AvailabilityManagement],
  'd-rx-create': ['datpyTsmhKYUxbzTGbFYZB', CreatePrescription, { state: 'draft' }],
  'd-rx-history': ['nroYRbUD2su5KuyGWzgH8a', PrescriptionHistory],
  'd-messages': ['sbsX5bFBsbV1MPeZBCMeCG', DoctorMessages],
  'd-notifications': ['gFMbU2RKf3vwkr5UPqEytJ', DoctorNotifications, { empty: false }],
  'd-settings': ['9CNxoLWb1VdB9EdDAxJrQ7', DoctorSettings],
  'pending-pharmacy': ['5MYMLKWrZCC96ovRwn6MvM', PendingVerification, { role: 'pharmacy', status: 'pending' }],
}

type Props = { start?: string }

export default function SmartCare({ start }: Props) {
  const [screen, setScreen] = useState(() => Object.keys(ROUTES).find((k) => ROUTES[k][0] === start) ?? 'landing')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [screen])
  const [, Frame, props] = ROUTES[screen] ?? ROUTES.landing
  const nav: Nav = { onNavigate: (to) => setScreen(ROUTES[to] ? to : 'landing') }
  return <Frame key={screen} {...props} {...nav} />
}
