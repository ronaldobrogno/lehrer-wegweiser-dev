import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getElternabende, saveElternabende, getClasses, Elternabend, generateId } from "@/lib/storage";
import { Plus, Trash2, ArrowLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

export default function ElternabendModule({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<Elternabend[]>(getElternabende());
  const [selected, setSelected] = useState<Elternabend | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({ className: "", date: new Date().toISOString().split("T")[0] });
  const classes = getClasses();

  const [newAgenda, setNewAgenda] = useState("");
  const [newFollowUp, setNewFollowUp] = useState("");

  useEffect(() => { saveElternabende(items); }, [items]);

  if (selected) {
    const update = (patch: Partial<Elternabend>) => {
      const updated = items.map(i => i.id === selected.id ? { ...i, ...patch } : i);
      setItems(updated);
      setSelected({ ...selected, ...patch });
    };

    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-12 pb-2">
          <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
            <ArrowLeft className="h-4 w-4" /> Elternabende
          </button>
          <h1 className="text-xl font-bold text-foreground">Elternabend {selected.className}</h1>
          <p className="text-sm text-muted-foreground">{new Date(selected.date + "T00:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>

        <div className="px-5 pb-28 space-y-4 mt-4">
          {/* Checklist */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-3">Checkliste</h3>
            {(["einladung", "raumReserviert", "themenGesammelt", "unterlagenVorbereitet", "nachbereitung"] as const).map(key => (
              <label key={key} className="flex items-center gap-3 py-2 cursor-pointer">
                <Checkbox checked={selected.checklist[key]} onCheckedChange={() => update({ checklist: { ...selected.checklist, [key]: !selected.checklist[key] } })} />
                <span className="text-sm text-foreground">{{ einladung: "Einladung verschickt", raumReserviert: "Raum reserviert", themenGesammelt: "Themen gesammelt", unterlagenVorbereitet: "Unterlagen vorbereitet", nachbereitung: "Nachbereitung erledigt" }[key]}</span>
              </label>
            ))}
          </div>

          {/* Agenda */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Agenda</h3>
            {selected.agenda.map((a, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5">
                <span className="text-xs text-muted-foreground w-5">{i + 1}.</span>
                <span className="text-sm text-foreground flex-1">{a}</span>
                <button onClick={() => update({ agenda: selected.agenda.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </div>
            ))}
            <div className="flex gap-2 mt-2">
              <Input value={newAgenda} onChange={e => setNewAgenda(e.target.value)} placeholder="Punkt hinzufügen..." className="text-sm" onKeyDown={e => { if (e.key === "Enter" && newAgenda.trim()) { update({ agenda: [...selected.agenda, newAgenda.trim()] }); setNewAgenda(""); } }} />
              <Button size="sm" variant="outline" onClick={() => { if (newAgenda.trim()) { update({ agenda: [...selected.agenda, newAgenda.trim()] }); setNewAgenda(""); } }}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          {/* Notes */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Notizen</h3>
            <Textarea value={selected.notes} onChange={e => update({ notes: e.target.value })} placeholder="Notizen zum Elternabend..." className="text-sm" />
          </div>

          {/* Follow-ups */}
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <h3 className="text-sm font-semibold text-foreground mb-2">Follow-up Aufgaben</h3>
            {selected.followUps.map((f, i) => (
              <label key={i} className="flex items-center gap-3 py-1.5 cursor-pointer">
                <Checkbox checked={f.done} onCheckedChange={() => {
                  const followUps = [...selected.followUps];
                  followUps[i] = { ...f, done: !f.done };
                  update({ followUps });
                }} />
                <span className={`text-sm flex-1 ${f.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{f.text}</span>
                <button onClick={() => update({ followUps: selected.followUps.filter((_, j) => j !== i) })} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
              </label>
            ))}
            <div className="flex gap-2 mt-2">
              <Input value={newFollowUp} onChange={e => setNewFollowUp(e.target.value)} placeholder="Aufgabe hinzufügen..." className="text-sm" onKeyDown={e => { if (e.key === "Enter" && newFollowUp.trim()) { update({ followUps: [...selected.followUps, { text: newFollowUp.trim(), done: false }] }); setNewFollowUp(""); } }} />
              <Button size="sm" variant="outline" onClick={() => { if (newFollowUp.trim()) { update({ followUps: [...selected.followUps, { text: newFollowUp.trim(), done: false }] }); setNewFollowUp(""); } }}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <Button variant="outline" className="w-full text-destructive" onClick={() => {
            setItems(items.filter(i => i.id !== selected.id));
            setSelected(null);
            toast.success("Gelöscht");
          }}>Elternabend löschen</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <PageHeader title="Elternabend" subtitle="Elternabende planen und dokumentieren" />
      <div className="px-5 pb-28">
        <Button className="w-full mb-4" onClick={() => setDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Elternabend anlegen
        </Button>

        {items.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Noch keine Elternabende angelegt.</p>
        ) : (
          <div className="space-y-2.5">
            {items.sort((a, b) => b.date.localeCompare(a.date)).map(ea => {
              const checkCount = Object.values(ea.checklist).filter(Boolean).length;
              return (
                <button key={ea.id} onClick={() => setSelected(ea)}
                  className="w-full flex items-center gap-3.5 rounded-2xl bg-card p-4 card-shadow text-left active:bg-accent/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{ea.className}</p>
                    <p className="text-xs text-muted-foreground">{new Date(ea.date + "T00:00:00").toLocaleDateString("de-DE")} · {checkCount}/5 erledigt</p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                </button>
              );
            })}
          </div>
        )}

        <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Zurück</Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader><DialogTitle>Elternabend anlegen</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Klasse</Label>
              {classes.length > 0 ? (
                <Select value={form.className} onValueChange={v => setForm({ ...form, className: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Klasse wählen" /></SelectTrigger>
                  <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              ) : (
                <Input value={form.className} onChange={e => setForm({ ...form, className: e.target.value })} className="mt-1" placeholder="z.B. 7a" />
              )}
            </div>
            <div><Label>Datum</Label><Input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="mt-1" /></div>
          </div>
          <DialogFooter className="mt-2">
            <Button className="w-full" onClick={() => {
              if (!form.className.trim()) { toast.error("Bitte Klasse angeben"); return; }
              setItems([...items, {
                id: generateId(), classId: "", className: form.className, date: form.date,
                agenda: [], openTopics: [], notes: "", followUps: [],
                checklist: { einladung: false, raumReserviert: false, themenGesammelt: false, unterlagenVorbereitet: false, nachbereitung: false },
              }]);
              setDialogOpen(false);
              setForm({ className: "", date: new Date().toISOString().split("T")[0] });
              toast.success("Elternabend angelegt");
            }}>Anlegen</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
