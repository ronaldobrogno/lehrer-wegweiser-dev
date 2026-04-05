import { useState } from "react";
import { getProfile } from "@/lib/storage";
import { WEG_STEPS } from "@/lib/meinWegData";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  GraduationCap, BookOpen, Briefcase, ShieldCheck, Award,
  Stethoscope, HeartPulse, FileText, Eye, Presentation,
  Baby, Sparkles, ArrowRightLeft, Heart, ShieldAlert,
  ChevronDown, ChevronRight, CheckCircle2, HelpCircle, ArrowLeft, Building,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  GraduationCap, BookOpen, Briefcase, ShieldCheck, Award,
  Stethoscope, HeartPulse, FileText, Eye, Presentation,
  Baby, Sparkles, ArrowRightLeft, Heart, ShieldAlert, Building,
};

export default function MeinWegPage() {
  const profile = getProfile();
  const userStatus = profile?.status || "";
  const [openStep, setOpenStep] = useState<string | null>(null);

  if (openStep) {
    const step = WEG_STEPS.find(s => s.id === openStep);
    if (!step) { setOpenStep(null); return null; }
    const Icon = ICON_MAP[step.icon] || BookOpen;
    const isRelevant = step.relevantFor.includes(userStatus);

    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-12 pb-2">
          <button onClick={() => setOpenStep(null)} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
            <ArrowLeft className="h-4 w-4" /> Zurück
          </button>
          <div className="flex items-center gap-3 mb-1">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${isRelevant ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{step.title}</h1>
              {isRelevant && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                  Relevant für dich
                </span>
              )}
            </div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
        </div>

        <div className="px-5 pb-28 space-y-4 mt-4">
          {/* Meaning */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Was bedeutet das?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.details.meaning}</p>
          </div>

          {/* Importance */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Warum ist das wichtig?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.details.importance}</p>
          </div>

          {/* Considerations */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Was sollte man beachten?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.details.considerations}</p>
          </div>

          {/* FAQ */}
          {step.details.faq.length > 0 && (
            <div className="rounded-2xl bg-card p-4 card-shadow">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary" /> Häufige Fragen
              </h3>
              <div className="space-y-3">
                {step.details.faq.map((f, i) => (
                  <div key={i}>
                    <p className="text-sm font-medium text-foreground">{f.q}</p>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Checklist */}
          {step.details.checklist && (
            <div className="rounded-2xl bg-card p-4 card-shadow">
              <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Checkliste
              </h3>
              <ul className="space-y-2">
                {step.details.checklist.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-4 w-4 rounded border border-border shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Mein Weg" subtitle="Vom Studium bis zur Verbeamtung – klicke auf eine Station für Details" />
      <div className="px-5 pb-28">
        <div className="relative">
          <div className="absolute left-5 top-0 h-full w-0.5 bg-border" />
          <div className="space-y-3">
            {WEG_STEPS.map((step) => {
              const Icon = ICON_MAP[step.icon] || BookOpen;
              const isRelevant = step.relevantFor.includes(userStatus);
              return (
                <button
                  key={step.id}
                  onClick={() => setOpenStep(step.id)}
                  className="relative flex gap-3.5 pl-2 w-full text-left group"
                >
                  <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                    isRelevant ? "bg-primary" : "bg-muted group-active:bg-primary/20"
                  }`}>
                    <Icon className={`h-4 w-4 ${isRelevant ? "text-primary-foreground" : "text-muted-foreground"}`} />
                  </div>
                  <div className={`flex-1 rounded-2xl p-4 card-shadow transition-colors ${
                    isRelevant ? "bg-card border border-primary/20" : "bg-card"
                  } group-active:bg-accent/50`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                        {isRelevant && (
                          <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">
                            Relevant
                          </span>
                        )}
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
