import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Shield, AlertTriangle, Scale } from "lucide-react";
import { toast } from "sonner";

const items = [
  {
    icon: Shield,
    title: "PKV für Lehrer",
    desc: "Als Beamter erhältst du Beihilfe vom Staat. Die private Krankenversicherung (PKV) sichert den Restanteil günstig ab – oft deutlich günstiger als die GKV.",
  },
  {
    icon: AlertTriangle,
    title: "Dienstunfähigkeit",
    desc: "Wenn du aus gesundheitlichen Gründen nicht mehr unterrichten kannst, greift die Dienstunfähigkeitsversicherung – unverzichtbar für jeden Beamten.",
  },
  {
    icon: Scale,
    title: "Diensthaftpflicht",
    desc: "Schützt dich bei beruflichen Haftungsansprüchen, z.B. bei Aufsichtspflichtverletzungen im Schulalltag.",
  },
];

export default function AbsicherungPage() {
  const handleRequest = (type: string) => {
    toast.success(`Anfrage für ${type} wurde gespeichert!`, {
      description: "Wir melden uns in Kürze bei dir.",
    });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Absicherung" subtitle="Versicherungen für Beamte" />
      <div className="space-y-4 px-5 pb-6">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div
              key={i}
              className="rounded-2xl bg-card p-5 card-shadow animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-base font-semibold text-foreground">{item.title}</h2>
              </div>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              <div className="flex gap-2">
                <Button
                  className="flex-1 text-sm font-medium"
                  onClick={() => handleRequest(item.title)}
                >
                  Angebot anfordern
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 text-sm font-medium"
                  onClick={() => handleRequest(item.title)}
                >
                  Vergleichen
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
