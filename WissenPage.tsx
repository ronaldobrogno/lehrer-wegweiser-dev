import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { WISSEN_ARTICLES, WISSEN_RESOURCES, WissenArticle } from "@/lib/wissenData";
import { toast } from "sonner";
import {
  ShieldCheck, Heart, GraduationCap, Briefcase, Stethoscope,
  ShieldAlert, CalendarCheck, Users, BookOpen, Brain,
  ClipboardList, FileText, FileDown, ArrowLeft, CheckCircle2,
  ChevronRight,
} from "lucide-react";

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldCheck, Heart, GraduationCap, Briefcase, Stethoscope,
  ShieldAlert, CalendarCheck, Users, BookOpen, Brain,
  ClipboardList, FileText,
};

function ArticleDetail({ article, onBack }: { article: WissenArticle; onBack: () => void }) {
  const Icon = ICON_MAP[article.icon] || BookOpen;

  return (
    <div className="animate-fade-in">
      <div className="px-5 pt-12 pb-2">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
          <ArrowLeft className="h-4 w-4" /> Zurück
        </button>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">{article.title}</h1>
        </div>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{article.intro}</p>
      </div>

      <div className="px-5 pb-28 space-y-4 mt-4">
        {article.sections.map((s, i) => (
          <div key={i} className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">{s.heading}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
          </div>
        ))}

        {article.tips.length > 0 && (
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-3">💡 Praktische Tipps</h3>
            <ul className="space-y-2">
              {article.tips.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {article.checklist && (
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-3">✅ Checkliste</h3>
            <ul className="space-y-2">
              {article.checklist.map((c, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="h-4 w-4 rounded border border-border shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default function WissenPage() {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  if (selectedArticle) {
    const article = WISSEN_ARTICLES.find(a => a.id === selectedArticle);
    if (!article) { setSelectedArticle(null); return null; }
    return <ArticleDetail article={article} onBack={() => setSelectedArticle(null)} />;
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Wissen" subtitle="Inhalte, Materialien & Ressourcen" />
      <div className="px-5 pb-28">
        <h2 className="mb-3 text-base font-semibold text-foreground">Themen & Wissen</h2>
        <div className="mb-6 space-y-2.5">
          {WISSEN_ARTICLES.map((item) => {
            const Icon = ICON_MAP[item.icon] || BookOpen;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedArticle(item.id)}
                className="w-full rounded-2xl bg-card p-4 card-shadow text-left transition-colors active:bg-accent/50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground truncate">{item.description}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                </div>
              </button>
            );
          })}
        </div>

        <h2 className="mb-3 text-base font-semibold text-foreground">Materialien & Vorlagen</h2>
        <div className="space-y-2.5">
          {WISSEN_RESOURCES.map((item) => {
            const Icon = ICON_MAP[item.icon] || FileText;
            return (
              <div key={item.id} className="rounded-2xl bg-card p-4 card-shadow">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-foreground">{item.title}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => toast.success(`${item.title} wird vorbereitet…`)}>
                    <FileDown className="h-5 w-5 text-primary" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
