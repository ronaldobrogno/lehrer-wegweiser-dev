export interface UserProfile {
  vorname: string;
  nachname: string;
  geburtsdatum: string;
  bundesland: string;
  status: string;
}

const STORAGE_KEY = "lehrer_begleiter_profile";

export function getProfile(): UserProfile | null {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return null;
  try { return JSON.parse(data) as UserProfile; } catch { return null; }
}

export function saveProfile(profile: UserProfile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  localStorage.clear();
}

export const BUNDESLAENDER = [
  "Baden-Württemberg","Bayern","Berlin","Brandenburg","Bremen",
  "Hamburg","Hessen","Mecklenburg-Vorpommern","Niedersachsen",
  "Nordrhein-Westfalen","Rheinland-Pfalz","Saarland","Sachsen",
  "Sachsen-Anhalt","Schleswig-Holstein","Thüringen",
];

export const STATUS_OPTIONS = [
  "Student","Referendar","Berufseinstieg","Beamter auf Probe","Beamter auf Lebenszeit",
];

// ── To-dos ──
const TODOS_KEY = "lb_todos";

export interface TodoItem {
  id: string;
  text: string;
  done: boolean;
  category: string;
  dueDate?: string;
}

export function getTodos(): TodoItem[] {
  try { return JSON.parse(localStorage.getItem(TODOS_KEY) || "[]"); } catch { return []; }
}
export function saveTodos(todos: TodoItem[]): void {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

// ── Notes ──
const NOTES_KEY = "lb_notes";
export function getNotes(): string { return localStorage.getItem(NOTES_KEY) || ""; }
export function saveNotes(notes: string): void { localStorage.setItem(NOTES_KEY, notes); }

// ── Classes ──
const CLASSES_KEY = "lb_classes";

export interface SchoolClass {
  id: string;
  name: string;
  subject?: string;
  schoolYear?: string;
  notes?: string;
  createdAt: string;
}

export function getClasses(): SchoolClass[] {
  try { return JSON.parse(localStorage.getItem(CLASSES_KEY) || "[]"); } catch { return []; }
}
export function saveClasses(classes: SchoolClass[]): void {
  localStorage.setItem(CLASSES_KEY, JSON.stringify(classes));
}

// ── Students ──
const STUDENTS_KEY = "lb_students";

export interface Student {
  id: string;
  classId: string;
  firstName: string;
  lastName: string;
  seatPosition?: { row: number; col: number };
  notes?: string;
  observations?: string;
  parentNotes?: string;
}

export function getStudents(): Student[] {
  try { return JSON.parse(localStorage.getItem(STUDENTS_KEY) || "[]"); } catch { return []; }
}
export function saveStudents(students: Student[]): void {
  localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
}
export function getStudentsByClass(classId: string): Student[] {
  return getStudents().filter(s => s.classId === classId);
}

// ── Grades ──
const GRADES_KEY = "lb_grades";

export type GradeCategory =
  | "muendlich" | "klassenarbeit_1" | "klassenarbeit_2" | "klassenarbeit_3"
  | "test" | "hausaufgabe" | "praesentation" | "projekt"
  | "sozialverhalten" | "arbeitsverhalten" | "sonstiges";

export const GRADE_CATEGORY_LABELS: Record<GradeCategory, string> = {
  muendlich: "Mündlich",
  klassenarbeit_1: "Klassenarbeit 1",
  klassenarbeit_2: "Klassenarbeit 2",
  klassenarbeit_3: "Weitere Klassenarbeit",
  test: "Test",
  hausaufgabe: "Hausaufgabe",
  praesentation: "Präsentation",
  projekt: "Projekt",
  sozialverhalten: "Sozialverhalten",
  arbeitsverhalten: "Arbeitsverhalten",
  sonstiges: "Sonstiges",
};

export interface GradeEntry {
  id: string;
  studentId: string;
  classId: string;
  value: number; // 1-6
  category: GradeCategory;
  title: string;
  date: string;
  semester: "1" | "2";
  note?: string;
}

export function getGrades(): GradeEntry[] {
  try { return JSON.parse(localStorage.getItem(GRADES_KEY) || "[]"); } catch { return []; }
}
export function saveGrades(grades: GradeEntry[]): void {
  localStorage.setItem(GRADES_KEY, JSON.stringify(grades));
}
export function getGradesByClass(classId: string): GradeEntry[] {
  return getGrades().filter(g => g.classId === classId);
}
export function getGradesByStudent(studentId: string): GradeEntry[] {
  return getGrades().filter(g => g.studentId === studentId);
}

// ── Timetable ──
const TIMETABLE_KEY = "lb_timetable";

export interface TimetableEntry {
  id: string;
  day: number; // 0=Mo, 1=Di, 2=Mi, 3=Do, 4=Fr
  startTime: string;
  endTime: string;
  classId?: string;
  className?: string;
  subject: string;
  room?: string;
  note?: string;
  color?: string;
}

export const WEEKDAYS = ["Montag","Dienstag","Mittwoch","Donnerstag","Freitag"];
export const SUBJECT_COLORS: Record<string, string> = {
  Deutsch: "bg-red-100 text-red-700",
  Mathematik: "bg-blue-100 text-blue-700",
  Englisch: "bg-yellow-100 text-yellow-700",
  Sport: "bg-green-100 text-green-700",
  Kunst: "bg-purple-100 text-purple-700",
  Musik: "bg-pink-100 text-pink-700",
  Biologie: "bg-emerald-100 text-emerald-700",
  Physik: "bg-cyan-100 text-cyan-700",
  Chemie: "bg-orange-100 text-orange-700",
  Geschichte: "bg-amber-100 text-amber-700",
  default: "bg-primary/10 text-primary",
};

export function getTimetable(): TimetableEntry[] {
  try { return JSON.parse(localStorage.getItem(TIMETABLE_KEY) || "[]"); } catch { return []; }
}
export function saveTimetable(entries: TimetableEntry[]): void {
  localStorage.setItem(TIMETABLE_KEY, JSON.stringify(entries));
}
export function getTodayTimetable(): TimetableEntry[] {
  const today = (new Date().getDay() + 6) % 7; // 0=Mon
  return getTimetable().filter(e => e.day === today).sort((a, b) => a.startTime.localeCompare(b.startTime));
}

// ── Appointments / Calendar ──
const APPOINTMENTS_KEY = "lb_appointments";

export type AppointmentCategory =
  | "unterricht" | "klassenarbeit" | "elternabend" | "konferenz"
  | "frist" | "persoenlich" | "sonstiges";

export const APPOINTMENT_CATEGORY_LABELS: Record<AppointmentCategory, string> = {
  unterricht: "Unterricht",
  klassenarbeit: "Klassenarbeit",
  elternabend: "Elternabend",
  konferenz: "Konferenz",
  frist: "Frist",
  persoenlich: "Persönlich",
  sonstiges: "Sonstiges",
};

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time?: string;
  category: AppointmentCategory;
  classId?: string;
  className?: string;
  location?: string;
  note?: string;
  done?: boolean;
}

export function getAppointments(): Appointment[] {
  try { return JSON.parse(localStorage.getItem(APPOINTMENTS_KEY) || "[]"); } catch { return []; }
}
export function saveAppointments(appointments: Appointment[]): void {
  localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
}
export function getTodayAppointments(): Appointment[] {
  const today = new Date().toISOString().split("T")[0];
  return getAppointments().filter(a => a.date === today).sort((a, b) => (a.time || "").localeCompare(b.time || ""));
}
export function getUpcomingAppointments(limit = 5): Appointment[] {
  const today = new Date().toISOString().split("T")[0];
  return getAppointments()
    .filter(a => a.date >= today && !a.done)
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || ""))
    .slice(0, limit);
}

// ── Seating Plan ──
const SEATING_KEY = "lb_seating";

export interface SeatPosition {
  id: string;
  x: number;
  y: number;
  studentId?: string;
  label?: string;
}

export interface SeatingPlan {
  classId: string;
  layout: "rows" | "groups" | "u-shape" | "horseshoe" | "custom";
  seats: SeatPosition[];
}

export function getSeatingPlan(classId: string): SeatingPlan | null {
  try {
    const all = JSON.parse(localStorage.getItem(SEATING_KEY) || "{}");
    return all[classId] || null;
  } catch { return null; }
}
export function saveSeatingPlan(plan: SeatingPlan): void {
  try {
    const all = JSON.parse(localStorage.getItem(SEATING_KEY) || "{}");
    all[plan.classId] = plan;
    localStorage.setItem(SEATING_KEY, JSON.stringify(all));
  } catch {}
}

// ── Elternabend ──
const ELTERNABEND_KEY = "lb_elternabend";

export interface Elternabend {
  id: string;
  classId: string;
  className?: string;
  date: string;
  agenda: string[];
  openTopics: string[];
  notes: string;
  followUps: { text: string; done: boolean }[];
  checklist: {
    einladung: boolean;
    raumReserviert: boolean;
    themenGesammelt: boolean;
    unterlagenVorbereitet: boolean;
    nachbereitung: boolean;
  };
}

export function getElternabende(): Elternabend[] {
  try { return JSON.parse(localStorage.getItem(ELTERNABEND_KEY) || "[]"); } catch { return []; }
}
export function saveElternabende(items: Elternabend[]): void {
  localStorage.setItem(ELTERNABEND_KEY, JSON.stringify(items));
}

// ── Helper ──
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
