export const IMG = {
  hero: 'https://cdn.magicpatterns.com/patterns/generated-images/7a96defe-a73f-47f9-86ed-f804dca4489b.jpg',
  hospital1: 'https://cdn.magicpatterns.com/patterns/generated-images/1ad695ee-3b61-471a-be67-05698285c896.jpg',
  hospital2: 'https://cdn.magicpatterns.com/patterns/generated-images/10c9f5e1-2923-45c1-bce9-c6ca2decaae2.jpg',
  doctorF: 'https://cdn.magicpatterns.com/patterns/generated-images/8ef677d3-ff24-4c70-9c5b-412a05c4980f.jpg',
  doctorM: 'https://cdn.magicpatterns.com/patterns/generated-images/cd3293de-7186-4db6-a78c-4a54a05bf87e.jpg',
}

export const patient = {
  name: 'Michael Thompson',
  first: 'Michael',
  id: 'PT-204871',
  dob: '14 March 1961',
  age: 64,
  gender: 'Male',
  email: 'michael.thompson@mail.com',
  phone: '+1 (555) 214-8890',
  address: '42 Willow Lane, Riverside, CA 92501',
  blood: 'O+',
  height: '178 cm',
  weight: '84 kg',
  allergies: ['Penicillin'],
  conditions: ['Hypertension', 'Type 2 diabetes'],
  emergency: { name: 'Linda Thompson', relation: 'Spouse', phone: '+1 (555) 214-7731' },
}

export type Doctor = {
  id: string
  name: string
  photo?: string
  initials: string
  specialty: string
  qualifications: string
  experience: number
  hospital: string
  rating: number
  reviews: number
  fee: number
  days: string
  hours: string
  slots: string[]
  treats: string[]
  nextAvailable: string
  mode: string
}

export const doctors: Doctor[] = [
  {
    id: 'kwame',
    name: 'Dr. Kwame Adebayo',
    photo: IMG.doctorM,
    initials: 'KA',
    specialty: 'Cardiologist',
    qualifications: 'MBBS, MD (Cardiology), FACC',
    experience: 16,
    hospital: "St. Mary's General Hospital",
    rating: 4.9,
    reviews: 312,
    fee: 80,
    days: 'Mon – Fri',
    hours: '09:00 AM – 04:00 PM',
    slots: ['09:00 AM', '09:30 AM', '10:30 AM', '11:00 AM', '02:00 PM', '03:30 PM'],
    treats: ['Hypertension', 'Coronary artery disease', 'Heart failure', 'Arrhythmia', 'High cholesterol'],
    nextAvailable: 'Tomorrow, 09:30 AM',
    mode: 'In-person & video',
  },
  {
    id: 'priya',
    name: 'Dr. Priya Sharma',
    photo: IMG.doctorF,
    initials: 'PS',
    specialty: 'Endocrinologist',
    qualifications: 'MBBS, MD (Internal Medicine), DM (Endocrinology)',
    experience: 12,
    hospital: "St. Mary's General Hospital",
    rating: 4.8,
    reviews: 241,
    fee: 75,
    days: 'Mon, Wed, Thu, Sat',
    hours: '10:00 AM – 05:00 PM',
    slots: ['10:00 AM', '11:30 AM', '01:00 PM', '03:00 PM', '04:30 PM'],
    treats: ['Type 2 diabetes', 'Thyroid disorders', 'PCOS', 'Obesity', 'Osteoporosis'],
    nextAvailable: 'Wed 18 Jun, 10:00 AM',
    mode: 'In-person',
  },
  {
    id: 'elena',
    name: 'Dr. Elena Rossi',
    initials: 'ER',
    specialty: 'General Physician',
    qualifications: 'MBBS, MRCGP',
    experience: 9,
    hospital: 'Riverside Community Hospital',
    rating: 4.7,
    reviews: 188,
    fee: 50,
    days: 'Mon – Sat',
    hours: '08:00 AM – 02:00 PM',
    slots: ['08:00 AM', '08:30 AM', '09:30 AM', '11:00 AM', '12:30 PM'],
    treats: ['Fever & infections', 'Asthma', 'Migraine', 'Seasonal allergies', 'Routine check-ups'],
    nextAvailable: 'Today, 12:30 PM',
    mode: 'In-person & video',
  },
  {
    id: 'james',
    name: 'Dr. James Whitfield',
    initials: 'JW',
    specialty: 'Orthopedic Surgeon',
    qualifications: 'MBBS, MS (Orthopaedics)',
    experience: 20,
    hospital: 'Lakeside Medical Center',
    rating: 4.6,
    reviews: 156,
    fee: 95,
    days: 'Tue, Thu, Fri',
    hours: '11:00 AM – 06:00 PM',
    slots: ['11:00 AM', '02:30 PM', '04:00 PM', '05:30 PM'],
    treats: ['Joint pain', 'Arthritis', 'Sports injuries', 'Back pain', 'Fractures'],
    nextAvailable: 'Thu 19 Jun, 02:30 PM',
    mode: 'In-person',
  },
  {
    id: 'aisha',
    name: 'Dr. Aisha Rahman',
    initials: 'AR',
    specialty: 'Dermatologist',
    qualifications: 'MBBS, MD (Dermatology)',
    experience: 8,
    hospital: 'Lakeside Medical Center',
    rating: 4.8,
    reviews: 203,
    fee: 70,
    days: 'Mon – Thu',
    hours: '09:00 AM – 03:00 PM',
    slots: ['09:00 AM', '10:00 AM', '01:30 PM'],
    treats: ['Eczema', 'Acne', 'Psoriasis', 'Skin allergies', 'Hair loss'],
    nextAvailable: 'Tomorrow, 10:00 AM',
    mode: 'In-person & video',
  },
  {
    id: 'marcus',
    name: 'Dr. Marcus Chen',
    initials: 'MC',
    specialty: 'Neurologist',
    qualifications: 'MBBS, DM (Neurology)',
    experience: 14,
    hospital: 'Riverside Community Hospital',
    rating: 4.9,
    reviews: 274,
    fee: 90,
    days: 'Wed – Sat',
    hours: '10:00 AM – 04:00 PM',
    slots: ['10:00 AM', '12:00 PM', '03:00 PM'],
    treats: ['Migraine', 'Epilepsy', 'Stroke recovery', "Parkinson's disease", 'Neuropathy'],
    nextAvailable: 'Wed 18 Jun, 12:00 PM',
    mode: 'In-person',
  },
]

export type Hospital = {
  id: string
  name: string
  image: string
  address: string
  area: string
  distance: string
  phone: string
  emergency: string
  hours: string
  er24: boolean
  departments: string[]
  services: string[]
  doctors: number
  rating: number
  pos: { x: number; y: number }
}

export const hospitals: Hospital[] = [
  {
    id: 'stmarys',
    name: "St. Mary's General Hospital",
    image: IMG.hospital1,
    address: '1200 Harbor Avenue, Riverside, CA 92501',
    area: 'Downtown',
    distance: '2.4 km',
    phone: '+1 (555) 300-1200',
    emergency: '+1 (555) 300-1911',
    hours: 'Open 24 hours',
    er24: true,
    departments: ['Cardiology', 'Endocrinology', 'Emergency', 'Radiology', 'Pediatrics', 'Oncology'],
    services: ['24/7 Emergency', 'Cardiac catheterization lab', 'MRI & CT imaging', 'Diabetes clinic', 'Inpatient pharmacy', 'Physiotherapy'],
    doctors: 84,
    rating: 4.8,
    pos: { x: 42, y: 38 },
  },
  {
    id: 'riverside',
    name: 'Riverside Community Hospital',
    image: IMG.hospital2,
    address: '455 Magnolia Street, Riverside, CA 92503',
    area: 'Magnolia',
    distance: '4.1 km',
    phone: '+1 (555) 300-4550',
    emergency: '+1 (555) 300-4911',
    hours: 'Open 24 hours',
    er24: true,
    departments: ['General Medicine', 'Neurology', 'Emergency', 'Maternity', 'Pediatrics'],
    services: ['24/7 Emergency', 'Stroke unit', 'Maternity ward', 'Laboratory', 'Vaccination clinic'],
    doctors: 52,
    rating: 4.6,
    pos: { x: 68, y: 62 },
  },
  {
    id: 'lakeside',
    name: 'Lakeside Medical Center',
    image: IMG.hospital1,
    address: '88 Lakeshore Drive, Riverside, CA 92505',
    area: 'Lakeshore',
    distance: '6.8 km',
    phone: '+1 (555) 300-8800',
    emergency: '—',
    hours: 'Mon – Sat, 07:00 AM – 09:00 PM',
    er24: false,
    departments: ['Orthopedics', 'Dermatology', 'ENT', 'Ophthalmology'],
    services: ['Day surgery', 'Sports medicine', 'Skin clinic', 'Eye care', 'X-ray'],
    doctors: 31,
    rating: 4.5,
    pos: { x: 22, y: 70 },
  },
  {
    id: 'northgate',
    name: 'Northgate Heart & Vascular Institute',
    image: IMG.hospital2,
    address: '17 Northgate Boulevard, Riverside, CA 92507',
    area: 'Northgate',
    distance: '8.2 km',
    phone: '+1 (555) 300-1717',
    emergency: '+1 (555) 300-1719',
    hours: 'Open 24 hours',
    er24: true,
    departments: ['Cardiology', 'Vascular Surgery', 'Emergency', 'Cardiac Rehab'],
    services: ['24/7 Cardiac emergency', 'Angioplasty', 'Echocardiography', 'Cardiac rehab'],
    doctors: 27,
    rating: 4.7,
    pos: { x: 78, y: 20 },
  },
]

export type Med = {
  id: string
  name: string
  dose: string
  frequency: string
  duration: string
  instructions: string
  time: string
  slot: 'Morning' | 'Afternoon' | 'Evening' | 'Night'
  status: 'taken' | 'missed' | 'upcoming' | 'due'
  rx: string
  doctor: string
}

export const todaysMeds: Med[] = [
  { id: 'm1', name: 'Amlodipine', dose: '5 mg · 1 tablet', frequency: 'Once daily', duration: '90 days', instructions: 'Take in the morning, with or without food.', time: '08:00 AM', slot: 'Morning', status: 'taken', rx: 'RX-2025-08417', doctor: 'Dr. Kwame Adebayo' },
  { id: 'm2', name: 'Metformin', dose: '500 mg · 1 tablet', frequency: 'Twice daily', duration: '90 days', instructions: 'Take with breakfast. Do not crush.', time: '08:30 AM', slot: 'Morning', status: 'taken', rx: 'RX-2025-08102', doctor: 'Dr. Priya Sharma' },
  { id: 'm3', name: 'Aspirin (low dose)', dose: '75 mg · 1 tablet', frequency: 'Once daily', duration: '90 days', instructions: 'Take after lunch with a full glass of water.', time: '01:00 PM', slot: 'Afternoon', status: 'due', rx: 'RX-2025-08417', doctor: 'Dr. Kwame Adebayo' },
  { id: 'm4', name: 'Metformin', dose: '500 mg · 1 tablet', frequency: 'Twice daily', duration: '90 days', instructions: 'Take with dinner. Do not crush.', time: '07:30 PM', slot: 'Evening', status: 'upcoming', rx: 'RX-2025-08102', doctor: 'Dr. Priya Sharma' },
  { id: 'm5', name: 'Atorvastatin', dose: '20 mg · 1 tablet', frequency: 'Once daily', duration: '90 days', instructions: 'Take at bedtime. Avoid grapefruit juice.', time: '09:30 PM', slot: 'Night', status: 'upcoming', rx: 'RX-2025-08417', doctor: 'Dr. Kwame Adebayo' },
]

export type RxItem = { name: string; dose: string; frequency: string; duration: string; instructions: string; qty: number }
export type Prescription = {
  ref: string
  date: string
  doctor: string
  specialty: string
  hospital: string
  diagnosis: string
  status: 'Active' | 'Completed' | 'Draft' | 'Expired'
  sharedWith?: string
  items: RxItem[]
}

export const prescriptions: Prescription[] = [
  {
    ref: 'RX-2025-08417',
    date: '12 Jun 2025',
    doctor: 'Dr. Kwame Adebayo',
    specialty: 'Cardiologist',
    hospital: "St. Mary's General Hospital",
    diagnosis: 'Essential hypertension (stage 1), elevated LDL cholesterol',
    status: 'Active',
    sharedWith: 'CityCare Pharmacy',
    items: [
      { name: 'Amlodipine', dose: '5 mg', frequency: 'Once daily · morning', duration: '90 days', instructions: 'With or without food', qty: 90 },
      { name: 'Atorvastatin', dose: '20 mg', frequency: 'Once daily · bedtime', duration: '90 days', instructions: 'Avoid grapefruit juice', qty: 90 },
      { name: 'Aspirin (low dose)', dose: '75 mg', frequency: 'Once daily · after lunch', duration: '90 days', instructions: 'Take after food', qty: 90 },
    ],
  },
  {
    ref: 'RX-2025-08102',
    date: '28 May 2025',
    doctor: 'Dr. Priya Sharma',
    specialty: 'Endocrinologist',
    hospital: "St. Mary's General Hospital",
    diagnosis: 'Type 2 diabetes mellitus, controlled',
    status: 'Active',
    items: [{ name: 'Metformin', dose: '500 mg', frequency: 'Twice daily · with meals', duration: '90 days', instructions: 'Do not crush or chew', qty: 180 }],
  },
  {
    ref: 'RX-2025-06231',
    date: '03 Apr 2025',
    doctor: 'Dr. Elena Rossi',
    specialty: 'General Physician',
    hospital: 'Riverside Community Hospital',
    diagnosis: 'Acute upper respiratory tract infection',
    status: 'Completed',
    items: [
      { name: 'Azithromycin', dose: '500 mg', frequency: 'Once daily', duration: '3 days', instructions: 'Take 1 hour before food', qty: 3 },
      { name: 'Paracetamol', dose: '500 mg', frequency: 'Up to 3 times daily as needed', duration: '5 days', instructions: 'Max 4 tablets in 24 hours', qty: 15 },
    ],
  },
]

export type ApptStatus = 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled'
export type Appointment = { id: string; doctor: string; specialty: string; hospital: string; date: string; time: string; status: ApptStatus; type: string; reason: string }

export const appointments: Appointment[] = [
  { id: 'AP-55120', doctor: 'Dr. Kwame Adebayo', specialty: 'Cardiologist', hospital: "St. Mary's General Hospital", date: 'Tue, 17 Jun 2025', time: '09:30 AM', status: 'Confirmed', type: 'Follow-up', reason: 'Blood pressure review' },
  { id: 'AP-55168', doctor: 'Dr. Priya Sharma', specialty: 'Endocrinologist', hospital: "St. Mary's General Hospital", date: 'Wed, 25 Jun 2025', time: '11:30 AM', status: 'Pending', type: 'Consultation', reason: 'HbA1c results' },
  { id: 'AP-54980', doctor: 'Dr. Kwame Adebayo', specialty: 'Cardiologist', hospital: "St. Mary's General Hospital", date: 'Thu, 12 Jun 2025', time: '10:00 AM', status: 'Completed', type: 'Consultation', reason: 'Chest tightness on exertion' },
  { id: 'AP-54611', doctor: 'Dr. Priya Sharma', specialty: 'Endocrinologist', hospital: "St. Mary's General Hospital", date: 'Wed, 28 May 2025', time: '01:00 PM', status: 'Completed', type: 'Follow-up', reason: 'Diabetes review' },
  { id: 'AP-54203', doctor: 'Dr. James Whitfield', specialty: 'Orthopedic Surgeon', hospital: 'Lakeside Medical Center', date: 'Fri, 09 May 2025', time: '02:30 PM', status: 'Cancelled', type: 'Consultation', reason: 'Knee pain' },
  { id: 'AP-53877', doctor: 'Dr. Elena Rossi', specialty: 'General Physician', hospital: 'Riverside Community Hospital', date: 'Thu, 03 Apr 2025', time: '09:30 AM', status: 'Completed', type: 'Consultation', reason: 'Cough and fever' },
]

/** The doctor's own patients and today's list, as seen by Dr. Kwame Adebayo. */
export type DocPatient = { id: string; name: string; initials: string; age: number; gender: string; condition: string; lastVisit: string; nextVisit: string; status: 'Stable' | 'Monitoring' | 'New' }

export const docPatients: DocPatient[] = [
  { id: 'PT-204871', name: 'Michael Thompson', initials: 'MT', age: 64, gender: 'M', condition: 'Hypertension', lastVisit: '12 Jun 2025', nextVisit: '17 Jun 2025', status: 'Monitoring' },
  { id: 'PT-198342', name: 'Grace Okonkwo', initials: 'GO', age: 58, gender: 'F', condition: 'Atrial fibrillation', lastVisit: '10 Jun 2025', nextVisit: '17 Jun 2025', status: 'Stable' },
  { id: 'PT-211507', name: 'Daniel Novak', initials: 'DN', age: 47, gender: 'M', condition: 'Chest pain evaluation', lastVisit: '—', nextVisit: '17 Jun 2025', status: 'New' },
  { id: 'PT-187220', name: 'Fatima Al-Sayed', initials: 'FA', age: 71, gender: 'F', condition: 'Heart failure (HFrEF)', lastVisit: '05 Jun 2025', nextVisit: '19 Jun 2025', status: 'Monitoring' },
  { id: 'PT-176904', name: 'Robert Hughes', initials: 'RH', age: 66, gender: 'M', condition: 'Coronary artery disease', lastVisit: '29 May 2025', nextVisit: '26 Jun 2025', status: 'Stable' },
  { id: 'PT-209981', name: 'Sofia Martinez', initials: 'SM', age: 39, gender: 'F', condition: 'Palpitations', lastVisit: '02 Jun 2025', nextVisit: '—', status: 'Stable' },
  { id: 'PT-190455', name: 'Henry Walsh', initials: 'HW', age: 73, gender: 'M', condition: 'Hypertension', lastVisit: '21 May 2025', nextVisit: '23 Jun 2025', status: 'Stable' },
]

export type DocAppt = { time: string; patient: string; initials: string; reason: string; type: string; status: ApptStatus }
export const doctorToday: DocAppt[] = [
  { time: '09:00 AM', patient: 'Grace Okonkwo', initials: 'GO', reason: 'AF follow-up, ECG review', type: 'Follow-up', status: 'Completed' },
  { time: '09:30 AM', patient: 'Michael Thompson', initials: 'MT', reason: 'Blood pressure review', type: 'Follow-up', status: 'Confirmed' },
  { time: '10:30 AM', patient: 'Daniel Novak', initials: 'DN', reason: 'Chest pain evaluation', type: 'New patient', status: 'Confirmed' },
  { time: '11:00 AM', patient: 'Sofia Martinez', initials: 'SM', reason: 'Holter monitor results', type: 'Video', status: 'Confirmed' },
  { time: '02:00 PM', patient: 'Henry Walsh', initials: 'HW', reason: 'Medication review', type: 'Follow-up', status: 'Pending' },
  { time: '03:30 PM', patient: 'Robert Hughes', initials: 'RH', reason: 'Post-angioplasty check', type: 'Follow-up', status: 'Confirmed' },
]

export const doctorRequests = [
  { id: 'RQ-311', patient: 'Olivia Bennett', initials: 'OB', age: 52, requested: 'Thu 19 Jun · 10:30 AM', reason: 'Shortness of breath when climbing stairs', received: '25 min ago' },
  { id: 'RQ-309', patient: 'Henry Walsh', initials: 'HW', age: 73, requested: 'Tue 17 Jun · 02:00 PM', reason: 'Medication review — dizziness in mornings', received: '2 h ago' },
  { id: 'RQ-306', patient: 'Thomas Reid', initials: 'TR', age: 45, requested: 'Fri 20 Jun · 09:00 AM', reason: 'Family history of heart disease, check-up', received: 'Yesterday' },
]

export type OrderStatus = 'Pending' | 'Under Review' | 'Accepted' | 'Rejected' | 'Ready for Collection' | 'Completed'
export type PharmOrder = { id: string; rx: string; patient: string; initials: string; doctor: string; date: string; items: string[]; status: OrderStatus; authorized: boolean; received: string }

export const pharmOrders: PharmOrder[] = [
  { id: 'ORD-7731', rx: 'RX-2025-08417', patient: 'Michael Thompson', initials: 'MT', doctor: 'Dr. Kwame Adebayo', date: '12 Jun 2025', items: ['Amlodipine 5 mg × 90', 'Atorvastatin 20 mg × 90', 'Aspirin 75 mg × 90'], status: 'Under Review', authorized: true, received: '10 min ago' },
  { id: 'ORD-7729', rx: 'RX-2025-08390', patient: 'Grace Okonkwo', initials: 'GO', doctor: 'Dr. Kwame Adebayo', date: '10 Jun 2025', items: ['Apixaban 5 mg × 60', 'Bisoprolol 2.5 mg × 30'], status: 'Pending', authorized: true, received: '34 min ago' },
  { id: 'ORD-7724', rx: 'RX-2025-08355', patient: 'Amelia Clarke', initials: 'AC', doctor: 'Dr. Elena Rossi', date: '14 Jun 2025', items: ['Salbutamol inhaler × 1', 'Montelukast 10 mg × 30'], status: 'Pending', authorized: true, received: '1 h ago' },
  { id: 'ORD-7718', rx: 'RX-2025-08311', patient: 'Noah Patel', initials: 'NP', doctor: 'Dr. Aisha Rahman', date: '13 Jun 2025', items: ['Tacrolimus ointment 0.1% × 1'], status: 'Accepted', authorized: true, received: '3 h ago' },
  { id: 'ORD-7712', rx: 'RX-2025-08270', patient: 'Fatima Al-Sayed', initials: 'FA', doctor: 'Dr. Kwame Adebayo', date: '11 Jun 2025', items: ['Sacubitril/valsartan 49/51 mg × 60', 'Furosemide 40 mg × 30'], status: 'Ready for Collection', authorized: true, received: 'Yesterday' },
  { id: 'ORD-7705', rx: 'RX-2025-08198', patient: 'Liam Foster', initials: 'LF', doctor: 'Dr. Marcus Chen', date: '09 Jun 2025', items: ['Sumatriptan 50 mg × 6'], status: 'Rejected', authorized: true, received: 'Yesterday' },
  { id: 'ORD-7698', rx: 'RX-2025-08102', patient: 'Michael Thompson', initials: 'MT', doctor: 'Dr. Priya Sharma', date: '28 May 2025', items: ['Metformin 500 mg × 180'], status: 'Completed', authorized: true, received: '28 May' },
  { id: 'ORD-7690', rx: 'RX-2025-08044', patient: 'Robert Hughes', initials: 'RH', doctor: 'Dr. Kwame Adebayo', date: '26 May 2025', items: ['Clopidogrel 75 mg × 30', 'Rosuvastatin 10 mg × 30'], status: 'Completed', authorized: true, received: '26 May' },
]

export type StockItem = { name: string; category: string; qty: number; unit: string; reorder: number; expiry: string; batch: string }
export const inventory: StockItem[] = [
  { name: 'Amlodipine 5 mg', category: 'Cardiovascular', qty: 1240, unit: 'tablets', reorder: 300, expiry: 'Mar 2027', batch: 'AML-2406' },
  { name: 'Atorvastatin 20 mg', category: 'Cardiovascular', qty: 860, unit: 'tablets', reorder: 300, expiry: 'Nov 2026', batch: 'ATV-2411' },
  { name: 'Aspirin 75 mg', category: 'Cardiovascular', qty: 64, unit: 'tablets', reorder: 200, expiry: 'Aug 2026', batch: 'ASP-2402' },
  { name: 'Metformin 500 mg', category: 'Diabetes', qty: 2100, unit: 'tablets', reorder: 500, expiry: 'Jan 2027', batch: 'MET-2409' },
  { name: 'Apixaban 5 mg', category: 'Anticoagulant', qty: 0, unit: 'tablets', reorder: 120, expiry: '—', batch: '—' },
  { name: 'Bisoprolol 2.5 mg', category: 'Cardiovascular', qty: 420, unit: 'tablets', reorder: 150, expiry: 'Jun 2026', batch: 'BIS-2403' },
  { name: 'Salbutamol inhaler 100 mcg', category: 'Respiratory', qty: 38, unit: 'inhalers', reorder: 20, expiry: 'Sep 2026', batch: 'SAL-2412' },
  { name: 'Montelukast 10 mg', category: 'Respiratory', qty: 95, unit: 'tablets', reorder: 120, expiry: 'Jul 2025', batch: 'MON-2311' },
  { name: 'Azithromycin 500 mg', category: 'Antibiotic', qty: 310, unit: 'tablets', reorder: 100, expiry: 'Feb 2027', batch: 'AZI-2410' },
  { name: 'Paracetamol 500 mg', category: 'Analgesic', qty: 5400, unit: 'tablets', reorder: 1000, expiry: 'Dec 2027', batch: 'PAR-2501' },
]

export type Notice = { id: string; title: string; body: string; time: string; unread: boolean; kind: 'appointment' | 'message' | 'prescription' | 'medication' | 'order' | 'alert' | 'system'; group: 'Today' | 'Yesterday' | 'Earlier' }

export const patientNotices: Notice[] = [
  { id: 'n1', kind: 'medication', title: 'Time for Aspirin 75 mg', body: 'Your 01:00 PM dose is due. Mark it as taken once you have had it.', time: '1:00 PM', unread: true, group: 'Today' },
  { id: 'n2', kind: 'order', title: 'Order ready for collection', body: 'CityCare Pharmacy has prepared order ORD-7698. Collect before 8:00 PM.', time: '11:42 AM', unread: true, group: 'Today' },
  { id: 'n3', kind: 'message', title: 'New message from Dr. Kwame Adebayo', body: '“Your readings look better this week. Keep logging them each morning.”', time: '10:15 AM', unread: true, group: 'Today' },
  { id: 'n4', kind: 'appointment', title: 'Appointment reminder', body: 'Follow-up with Dr. Kwame Adebayo tomorrow at 09:30 AM, St. Mary’s General Hospital.', time: '08:00 AM', unread: false, group: 'Today' },
  { id: 'n5', kind: 'prescription', title: 'New prescription issued', body: 'Dr. Kwame Adebayo issued RX-2025-08417 with 3 medicines.', time: '4:20 PM', unread: false, group: 'Yesterday' },
  { id: 'n6', kind: 'order', title: 'Pharmacy order accepted', body: 'CityCare Pharmacy accepted your order for RX-2025-08417.', time: '5:05 PM', unread: false, group: 'Yesterday' },
  { id: 'n7', kind: 'appointment', title: 'Appointment confirmed', body: 'Dr. Kwame Adebayo confirmed your visit on Tue 17 Jun at 09:30 AM.', time: '12 Jun', unread: false, group: 'Earlier' },
  { id: 'n8', kind: 'order', title: 'Pharmacy order rejected', body: 'MedPlus Pharmacy could not fill RX-2025-06231: medicine out of stock. Share with another pharmacy.', time: '04 Apr', unread: false, group: 'Earlier' },
]

export const doctorNotices: Notice[] = [
  { id: 'd1', kind: 'appointment', title: 'New appointment request', body: 'Olivia Bennett requested Thu 19 Jun at 10:30 AM — shortness of breath.', time: '25 min ago', unread: true, group: 'Today' },
  { id: 'd2', kind: 'message', title: 'New message from Michael Thompson', body: '“Morning reading was 138/86. Should I still take my evening dose?”', time: '48 min ago', unread: true, group: 'Today' },
  { id: 'd3', kind: 'prescription', title: 'Pharmacy requests an alternative', body: 'CityCare Pharmacy: Apixaban 5 mg out of stock for Grace Okonkwo (RX-2025-08390). Your approval is needed for any substitute.', time: '1 h ago', unread: true, group: 'Today' },
  { id: 'd4', kind: 'appointment', title: 'Appointment rescheduled', body: 'Robert Hughes moved his visit from 16 Jun to 17 Jun, 03:30 PM.', time: '9:10 AM', unread: false, group: 'Today' },
  { id: 'd5', kind: 'prescription', title: 'Prescription dispensed', body: 'RX-2025-08270 for Fatima Al-Sayed is ready for collection at CityCare Pharmacy.', time: '6:30 PM', unread: false, group: 'Yesterday' },
  { id: 'd6', kind: 'appointment', title: 'Appointment cancelled', body: 'Sofia Martinez cancelled her in-person visit on 18 Jun.', time: '2:15 PM', unread: false, group: 'Yesterday' },
]

export const pharmacyNotices: Notice[] = [
  { id: 'p1', kind: 'prescription', title: 'New authorized prescription', body: 'Michael Thompson shared RX-2025-08417 with CityCare Pharmacy.', time: '10 min ago', unread: true, group: 'Today' },
  { id: 'p2', kind: 'order', title: 'New order received', body: 'Grace Okonkwo — 2 items from Dr. Kwame Adebayo.', time: '34 min ago', unread: true, group: 'Today' },
  { id: 'p3', kind: 'alert', title: 'Low stock: Aspirin 75 mg', body: 'Only 64 tablets left — below the reorder level of 200.', time: '9:00 AM', unread: true, group: 'Today' },
  { id: 'p4', kind: 'order', title: 'Doctor approved an alternative', body: 'Dr. Marcus Chen approved Rizatriptan 10 mg for order ORD-7705.', time: '8:12 AM', unread: false, group: 'Today' },
  { id: 'p5', kind: 'order', title: 'Order collected', body: 'ORD-7698 was collected by Michael Thompson.', time: '5:40 PM', unread: false, group: 'Yesterday' },
]

export const pharmacy = {
  name: 'CityCare Pharmacy',
  owner: 'Rachel Kim',
  license: 'PH-CA-2019-04482',
  address: '310 Main Street, Riverside, CA 92501',
  phone: '+1 (555) 410-3100',
  email: 'orders@citycarepharmacy.com',
  hours: 'Mon – Sat 08:00 AM – 09:00 PM · Sun 10:00 AM – 04:00 PM',
}

export const pharmacies = [
  { id: 'citycare', name: 'CityCare Pharmacy', address: '310 Main Street · 1.2 km', hours: 'Open until 9:00 PM', verified: true },
  { id: 'medplus', name: 'MedPlus Pharmacy', address: '88 Orange Grove Ave · 2.9 km', hours: 'Open until 10:00 PM', verified: true },
  { id: 'harbor', name: 'Harbor Health Chemists', address: '1180 Harbor Avenue · 3.4 km', hours: 'Open 24 hours', verified: true },
]
