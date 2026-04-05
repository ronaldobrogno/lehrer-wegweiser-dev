import { getProfile, getTodos, getTodayTimetable, getTodayAppointments, getUpcomingAppointments, getClasses } from "@/lib/storage";
import { useNavigate } from "react-router-dom";
import {
  Route, CalendarCheck, BookOpen, Shield, ArrowRight, Sparkles,
  CheckCircle2, ClipboardList, Heart, MapPin, Clock, Users,
  GraduationCap, LayoutGrid, ListChecks, StickyNote,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const STATUS_HINTS: Record<string, { text: string; bullets: string[] }> = {
  Student: { text: "Informiere dich über Referendariat, Verbeamtung und erste wichtige Vorbereitungen.", bullets: ["Referendariat vorbereiten", "Wichtige Unterlagen sammeln", "Bundesland-Infos prüfen"] },
  Referendar: { text: "Du steckst mitten im Referendariat – bleib organisiert und behalte den Überblick.", bullets: ["Fristen & Prüfungen im Blick behalten", "Unterrichtsvorbereitung strukturieren", "Verbeamtung vorbereiten"] },
  Berufseinstieg: { text: "Dein Start in den Schulalltag – strukturiere deine ersten Wochen.", bullets: ["Schulalltag organisieren", "Versicherungen & Beihilfe klären", "Unterrichtsmaterial aufbauen"] },
  "Beamter auf Probe": { text: "Behalte Verbeamtung, Gesundheit und Organisation im Blick.", bullets: ["Amtsärztliche Untersuchung", "Gesundheitsprüfung vorbereiten", "Dienstliche Pflichten kennen"] },
  "Beamter auf Lebenszeit": { text: "Nutze die App für Organisation, Materialien und langfristige Planung.", bullets: ["Materialien & Vorlagen nutzen", "Wochenplanung optimieren", "Weiterbildung planen"] },
};

const WEEKDAY_NAMES = ["Sonntag","Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag"];

export default function StartPage() {
  const profile = getProfile();
  const navigate = useNavigate();
  const status = profile?.status || "Student";
  const hint = STATUS_HINTS[status] || STATUS_HINTS.Student;

  const now = new Date();
  const todayStr = now.toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const todayTimetable = getTodayTimetable();
  const todayAppointments = getTodayAppointments();
  const upcomingAppointments = getUpcomingAppointments(3);
  const todos = getTodos();
  const openTodos = todos.filter(t => !t.done);
  const classes = getClasses();

  return (
    <div className="px-5 pb-28 pt-10 animate-fade-in space-y-5">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Hallo {profile?.vorname} 👋</h1>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">Schön, dass du da bist. Hier findest du alles Wichtige für deinen Weg durchs Lehramt.</p>
        <div className="mt-2.5 flex items-center gap-2 flex-wrap">
          <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">{profile?.status}</span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{profile?.bundesland}</span>
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{todayStr}</p>
      </div>

      {/* Today's Timetable */}
      {todayTimetable.length > 0 && (
        <div className="rounded-2xl bg-card p-4 card-shadow">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> Heute</h2>
            <button onClick={() => navigate("/organisation")} className="text-xs text-primary font-medium">Stundenplan →</button>
          </div>
          <div className="space-y-2">
            {todayTimetable.slice(0, 4).map(e => (
              <div key={e.id} className="flex items-center gap-3 text-sm">
                <span className="text-xs text-muted-foreground font-mono w-12">{e.startTime}</span>
                <span className="rounded-lg bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{e.subject}</span>
                {e.className && <span className="text-xs text-muted-foreground">{e.className}</span>}
                {e.room && <span className="text-xs text-muted-foreground">R. {e.room}</span>}
              </div>
            ))}
            {todayTimetable.length > 4 && <p className="text-xs text-muted-foreground">+{todayTimetable.length - 4} weitere</p>}
          </div>
        </div>
      )}

      {/* Today's appointments */}
      {todayAppointments.length > 0 && (
        <div className="rounded-2xl bg-card p-4 card-shadow">
          <h2 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2"><CalendarCheck className="h-4 w-4 text-primary" /> Termine heute</h2>
          <div className="space-y-2">
            {todayAppointments.map(a => (
              <div key={a.id} className="flex items-center gap-2 text-sm">
                {a.time && <span className="text-xs text-muted-foreground font-mono w-12">{a.time}</span>}
                <span className="text-foreground">{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Open Todos */}
      {openTodos.length > 0 && (
        <div className="rounded-2xl bg-card p-4 card-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><ListChecks className="h-4 w-4 text-primary" /> Offene Aufgaben</h2>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{openTodos.length}</span>
          </div>
          <div className="space-y-1.5">
            {openTodos.slice(0, 3).map(t => (
              <p key={t.id} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />{t.text}
              </p>
            ))}
            {openTodos.length > 3 && <button onClick={() => navigate("/organisation")} className="text-xs text-primary font-medium">Alle anzeigen →</button>}
          </div>
        </div>
      )}

      {/* Upcoming */}
      {upcomingAppointments.length > 0 && (
        <div className="rounded-2xl bg-card p-4 card-shadow">
          <h2 className="text-sm font-semibold text-foreground mb-2">Nächste Termine</h2>
          <div className="space-y-2">
            {upcomingAppointments.map(a => (
              <div key={a.id} className="flex items-center gap-2 text-sm">
                <span className="text-xs text-muted-foreground w-16">{new Date(a.date+"T00:00:00").toLocaleDateString("de-DE",{day:"numeric",month:"short"})}</span>
                <span className="text-foreground flex-1">{a.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next step */}
      <div className="rounded-2xl bg-card p-5 card-shadow">
        <div className="mb-2 flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /><h2 className="text-base font-semibold text-foreground">Dein nächster Schritt</h2></div>
        <p className="mb-3 text-sm leading-relaxed text-muted-foreground">{hint.text}</p>
        <ul className="mb-4 space-y-1.5">
          {hint.bullets.map(b => (<li key={b} className="flex items-start gap-2 text-sm text-foreground/80"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" /><span>{b}</span></li>))}
        </ul>
        <Button variant="outline" className="w-full font-medium" onClick={() => navigate("/mein-weg")}>Mehr erfahren <ArrowRight className="ml-1 h-4 w-4" /></Button>
      </div>

      {/* Quick access */}
      <div>
        <h2 className="mb-3 text-base font-semibold text-foreground">Schnellzugriff</h2>
        <div className="grid grid-cols-4 gap-2">
          {[
            { title: "Klassen", icon: Users, route: "/organisation" },
            { title: "Stundenplan", icon: CalendarCheck, route: "/organisation" },
            { title: "Checklisten", icon: ClipboardList, route: "/wissen" },
            { title: "Mein Weg", icon: MapPin, route: "/mein-weg" },
          ].map(q => (
            <button key={q.title} onClick={() => navigate(q.route)}
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-card p-3 card-shadow transition-colors active:bg-accent/50">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10"><q.icon className="h-4 w-4 text-primary" /></div>
              <span className="text-[11px] font-medium text-foreground/80 leading-tight text-center">{q.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Classes */}
      {classes.length > 0 && (
        <div className="rounded-2xl bg-card p-4 card-shadow">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> Deine Klassen</h2>
            <button onClick={() => navigate("/organisation")} className="text-xs text-primary font-medium">Alle →</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {classes.slice(0, 4).map(c => (
              <button key={c.id} onClick={() => navigate("/organisation")} className="shrink-0 rounded-xl bg-primary/5 px-4 py-2.5 text-center active:bg-primary/10">
                <p className="text-sm font-semibold text-foreground">{c.name}</p>
                {c.subject && <p className="text-xs text-muted-foreground">{c.subject}</p>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Karriere */}
      <div className="rounded-2xl bg-card p-5 card-shadow">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><Route className="h-5 w-5 text-primary" /></div>
          <h2 className="text-base font-semibold text-foreground">Verbeamtung & Karriere</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Verstehe den Weg vom Studium bis zur Verbeamtung – Schritt für Schritt.</p>
        <Button variant="outline" className="w-full font-medium" onClick={() => navigate("/mein-weg")}>Leitfaden ansehen</Button>
      </div>

      {/* Organisation */}
      <div className="rounded-2xl bg-card p-5 card-shadow">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><CalendarCheck className="h-5 w-5 text-primary" /></div>
          <h2 className="text-base font-semibold text-foreground">Organisation & Alltag</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Klassen, Stundenplan, To-dos, Kalender – organisiere deinen Lehreralltag.</p>
        <Button variant="outline" className="w-full font-medium" onClick={() => navigate("/organisation")}>Organisation öffnen</Button>
      </div>

      {/* Wissen */}
      <div className="rounded-2xl bg-card p-5 card-shadow">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10"><BookOpen className="h-5 w-5 text-primary" /></div>
          <h2 className="text-base font-semibold text-foreground">Wissen & Materialien</h2>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">Checklisten, Vorlagen und hilfreiche Inhalte für jede Phase deiner Lehrerkarriere.</p>
        <Button variant="outline" className="w-full font-medium" onClick={() => navigate("/wissen")}>Materialien ansehen</Button>
      </div>

      {/* Absicherung - subtle */}
      <div className="rounded-2xl bg-muted/50 p-4 border border-border/40">
        <div className="mb-2 flex items-center gap-2.5">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold text-foreground/80">Absicherung & Vorsorge</h2>
        </div>
        <p className="mb-3 text-xs leading-relaxed text-muted-foreground">PKV, Dienstunfähigkeit und Diensthaftpflicht – wichtige Themen für deine Karriere.</p>
        <Button variant="ghost" className="w-full text-xs font-medium h-9 text-muted-foreground hover:text-foreground" onClick={() => navigate("/wissen")}>Mehr erfahren</Button>
      </div>

      <div className="h-2" />
    </div>
  );
}
