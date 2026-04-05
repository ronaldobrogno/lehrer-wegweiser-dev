import PageHeader from "@/components/PageHeader";
import { CheckSquare, FileText, Heart, CalendarDays, Lightbulb, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const materials = [
  { icon: CheckSquare, title: "Referendariat Checkliste", desc: "Alles was du vor und während des Referendariats beachten musst." },
  { icon: FileText, title: "Verbeamtung Checkliste", desc: "Schritt-für-Schritt Anleitung für die Verbeamtung." },
  { icon: Heart, title: "PKV Vorbereitung", desc: "Gesundheitsfragen vorbereiten und richtig beantworten." },
  { icon: CalendarDays, title: "Lehrer Wochenplan", desc: "Vorlage zur Organisation deiner Unterrichtswoche." },
  { icon: Lightbulb, title: "Unterricht Organisation", desc: "Tipps für einen strukturierten und effektiven Unterricht." },
  { icon: Users, title: "Elternabend Vorbereitung", desc: "Leitfaden für einen souveränen Elternabend." },
];

export default function MaterialienPage() {
  return (
    <div className="animate-fade-in">
      <PageHeader title="Materialien" subtitle="Vorlagen & Ressourcen" />
      <div className="space-y-3 px-5 pb-6">
        {materials.map((m, i) => {
          const Icon = m.icon;
          return (
            <div
              key={i}
              className="flex items-start gap-4 rounded-2xl bg-card p-4 card-shadow animate-slide-up"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground">{m.title}</h3>
                <p className="mt-0.5 text-xs text-muted-foreground">{m.desc}</p>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="shrink-0 text-xs"
                onClick={() => toast.info("Download wird vorbereitet...")}
              >
                PDF
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
