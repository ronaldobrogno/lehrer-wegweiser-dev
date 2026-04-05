import PageHeader from "@/components/PageHeader";
import { GraduationCap, BookOpen, UserCheck, Award, Stethoscope, HeartPulse } from "lucide-react";

const steps = [
  {
    icon: GraduationCap,
    title: "Lehramt Studium",
    desc: "Bachelor und Master of Education an einer Universität absolvieren. Fächerkombination und Schulform wählen.",
  },
  {
    icon: BookOpen,
    title: "Referendariat",
    desc: "18–24 Monate Vorbereitungsdienst mit Unterrichtspraxis und Zweitem Staatsexamen.",
  },
  {
    icon: UserCheck,
    title: "Verbeamtung auf Probe",
    desc: "Nach bestandenem Examen folgt die Ernennung zum Beamten auf Probe (i.d.R. 3 Jahre).",
  },
  {
    icon: Award,
    title: "Verbeamtung auf Lebenszeit",
    desc: "Nach erfolgreicher Probezeit wirst du zum Beamten auf Lebenszeit ernannt.",
  },
  {
    icon: Stethoscope,
    title: "Amtsärztliche Untersuchung",
    desc: "Gesundheitscheck beim Amtsarzt – Voraussetzung für die Verbeamtung.",
  },
  {
    icon: HeartPulse,
    title: "Gesundheitsprüfung PKV",
    desc: "Bei Abschluss einer PKV werden Gesundheitsfragen gestellt. Vorbereitung ist wichtig.",
  },
];

export default function VerbeamtungPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Verbeamtung"
        subtitle="Dein Weg Schritt für Schritt"
      />
      <div className="relative px-5 pb-6">
        {/* Timeline line */}
        <div className="absolute left-[39px] top-0 h-full w-0.5 bg-border" />

        <div className="space-y-0">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex gap-4 pb-6 animate-slide-up" style={{ animationDelay: `${i * 80}ms` }}>
                <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="rounded-2xl bg-card p-4 card-shadow flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
