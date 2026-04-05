import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import {
  CalendarDays, ListChecks, ClipboardCheck, BookOpenCheck, Clock,
  Users, StickyNote, GraduationCap, Briefcase, FileText,
  ChevronRight, UserSquare2, LayoutGrid, Presentation,
} from "lucide-react";
import TodoModule from "@/components/organisation/TodoModule";
import NotesModule from "@/components/organisation/NotesModule";
import TimetableModule from "@/components/organisation/TimetableModule";
import CalendarModule from "@/components/organisation/CalendarModule";
import ClassesModule from "@/components/organisation/ClassesModule";
import ElternabendModule from "@/components/organisation/ElternabendModule";

type ModuleId = "todos" | "notes" | "timetable" | "calendar" | "classes" | "elternabend" | null;

const modules: { id: ModuleId; icon: React.ElementType; title: string; description: string }[] = [
  { id: "classes", icon: UserSquare2, title: "Klassen & Schüler", description: "Klassen verwalten, Schüler anlegen, Noten & Sitzplan." },
  { id: "timetable", icon: CalendarDays, title: "Stundenplan", description: "Deinen Wochenstundenplan verwalten." },
  { id: "calendar", icon: Clock, title: "Kalender & Termine", description: "Termine, Fristen und Konferenzen." },
  { id: "todos", icon: ListChecks, title: "To-do Liste", description: "Aufgaben erstellen und abhaken." },
  { id: "notes", icon: StickyNote, title: "Persönliche Notizen", description: "Freie Notizen für den Alltag." },
  { id: "elternabend", icon: Users, title: "Elternabend", description: "Elternabende planen und dokumentieren." },
];

const infoModules = [
  { icon: CalendarDays, title: "Wochenplanung", description: "Plane deine Unterrichtswoche strukturiert." },
  { icon: ClipboardCheck, title: "Referendariat Checkliste", description: "Alle wichtigen Schritte im Überblick." },
  { icon: BookOpenCheck, title: "Unterricht vorbereiten", description: "Vorlagen und Tipps für die Vorbereitung." },
  { icon: Presentation, title: "Konferenzen", description: "Konferenzen und Dienstbesprechungen planen." },
  { icon: FileText, title: "Vorlagen & Checklisten", description: "Nützliche Vorlagen für den Schulalltag." },
];

export default function OrganisationPage() {
  const [activeModule, setActiveModule] = useState<ModuleId>(null);

  const handleBack = () => setActiveModule(null);

  switch (activeModule) {
    case "todos": return <TodoModule onBack={handleBack} />;
    case "notes": return <NotesModule onBack={handleBack} />;
    case "timetable": return <TimetableModule onBack={handleBack} />;
    case "calendar": return <CalendarModule onBack={handleBack} />;
    case "classes": return <ClassesModule onBack={handleBack} />;
    case "elternabend": return <ElternabendModule onBack={handleBack} />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Organisation" subtitle="Dein Werkzeugkasten für den Schulalltag" />
      <div className="px-5 pb-28">
        {/* Main modules */}
        <h2 className="mb-3 text-base font-semibold text-foreground">Deine Werkzeuge</h2>
        <div className="mb-6 space-y-2.5">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <button
                key={mod.id}
                onClick={() => setActiveModule(mod.id)}
                className="flex w-full items-center gap-3.5 rounded-2xl bg-card p-4 card-shadow text-left transition-colors active:bg-accent/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground">{mod.title}</p>
                  <p className="text-xs text-muted-foreground">{mod.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50" />
              </button>
            );
          })}
        </div>

        {/* Info modules */}
        <h2 className="mb-3 text-base font-semibold text-foreground">Weitere Bereiche</h2>
        <div className="space-y-2.5">
          {infoModules.map((mod, i) => {
            const Icon = mod.icon;
            return (
              <div key={i} className="rounded-2xl bg-card p-4 card-shadow">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{mod.title}</h3>
                    <p className="text-xs text-muted-foreground">{mod.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
