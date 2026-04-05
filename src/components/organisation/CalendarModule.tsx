import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  getAppointments, saveAppointments, Appointment, AppointmentCategory,
  APPOINTMENT_CATEGORY_LABELS, generateId, getClasses,
} from "@/lib/storage";
import { Plus, Trash2, Edit2, Calendar, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const CATEGORY_COLORS: Record<AppointmentCategory, string> = {
  unterricht: "bg-blue-100 text-blue-700",
  klassenarbeit: "bg-red-100 text-red-700",
  elternabend: "bg-purple-100 text-purple-700",
  konferenz: "bg-amber-100 text-amber-700",
  frist: "bg-orange-100 text-orange-700",
  persoenlich: "bg-green-100 text-green-700",
  sonstiges: "bg-muted text-muted-foreground",
};

type ViewMode = "upcoming" | "today" | "week" | "all";

const EMPTY: Omit<Appointment, "id"> = {
  title: "", date: new Date().toISOString().split("T")[0], time: "",
  category: "sonstiges", location: "", note: "",
};

export default function CalendarModule({ onBack }: { onBack: () => void }) {
  const [appointments, setAppointments] = useState<Appointment[]>(getAppointments());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState<Omit<Appointment, "id"> & { id?: string }>(EMPTY);
  const [viewMode, setViewMode] = useState<ViewMode>("upcoming");
  const classes = getClasses();

  useEffect(() => { saveAppointments(appointments); }, [appointments]);

  const save = () => {
    if (!editItem.title.trim()) { toast.error("Bitte Titel angeben"); return; }
    if (editItem.id) {
      setAppointments(appointments.map(a => a.id === editItem.id ? { ...editItem, id: editItem.id } as Appointment : a));
    } else {
      setAppointments([...appointments, { ...editItem, id: generateId() } as Appointment]);
    }
    setDialogOpen(false);
    setEditItem(EMPTY);
    toast.success("Gespeichert");
  };

  const today = new Date().toISOString().split("T")[0];
  const weekEnd = new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0];

  const filtered = appointments
    .filter(a => {
      if (viewMode === "today") return a.date === today;
      if (viewMode === "week") return a.date >= today && a.date <= weekEnd;
      if (viewMode === "upcoming") return a.date >= today && !a.done;
      return true;
    })
    .sort((a, b) => a.date.localeCompare(b.date) || (a.time || "").localeCompare(b.time || ""));

  const formatDate = (d: string) => {
    const date = new Date(d + "T00:00:00");
    return date.toLocaleDateString("de-DE", { weekday: "short", day: "numeric", month: "short" });
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Kalender & Termine" subtitle="Termine, Fristen und Konferenzen" />
      <div className="px-5 pb-28">
        <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar">
          {(["upcoming", "today", "week", "all"] as ViewMode[]).map(m => (
            <button key={m} onClick={() => setViewMode(m)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                viewMode === m ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground card-shadow"
              }`}>
              {{ upcoming: "Kommende", today: "Heute", week: "Diese Woche", all: "Alle" }[m]}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">{filtered.length} Termine</h2>
          <Button size="sm" onClick={() => { setEditItem(EMPTY); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Termin
          </Button>
        </div>

        {filtered.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Keine Termine.</p>
        ) : (
          <div className="space-y-2.5">
            {filtered.map(a => (
              <div key={a.id} className={`rounded-2xl bg-card p-4 card-shadow ${a.done ? "opacity-60" : ""}`}>
                <div className="flex items-start gap-3">
                  <button onClick={() => setAppointments(appointments.map(x => x.id === a.id ? { ...x, done: !x.done } : x))}
                    className={`mt-0.5 shrink-0 ${a.done ? "text-primary" : "text-muted-foreground"}`}>
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`rounded-lg px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[a.category]}`}>
                        {APPOINTMENT_CATEGORY_LABELS[a.category]}
                      </span>
                      <span className="text-xs text-muted-foreground">{formatDate(a.date)}</span>
                      {a.time && <span className="text-xs text-muted-foreground">{a.time}</span>}
                    </div>
                    <p className={`mt-1 text-sm font-semibold ${a.done ? "line-through text-muted-foreground" : "text-foreground"}`}>{a.title}</p>
                    {a.className && <p className="text-xs text-muted-foreground">{a.className}</p>}
                    {a.location && <p className="text-xs text-muted-foreground">📍 {a.location}</p>}
                    {a.note && <p className="mt-1 text-xs text-muted-foreground italic">{a.note}</p>}
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => { setEditItem(a); setDialogOpen(true); }} className="text-muted-foreground hover:text-primary p-1"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => { setAppointments(appointments.filter(x => x.id !== a.id)); toast.success("Gelöscht"); }} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="h-3.5 w-3.5" /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Zurück</Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader><DialogTitle>{editItem.id ? "Termin bearbeiten" : "Neuer Termin"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Titel</Label><Input value={editItem.title} onChange={e => setEditItem({ ...editItem, title: e.target.value })} className="mt-1" /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Datum</Label><Input type="date" value={editItem.date} onChange={e => setEditItem({ ...editItem, date: e.target.value })} className="mt-1" /></div>
              <div><Label>Uhrzeit</Label><Input type="time" value={editItem.time || ""} onChange={e => setEditItem({ ...editItem, time: e.target.value })} className="mt-1" /></div>
            </div>
            <div><Label>Kategorie</Label>
              <Select value={editItem.category} onValueChange={(v) => setEditItem({ ...editItem, category: v as AppointmentCategory })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(APPOINTMENT_CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
              </Select></div>
            {classes.length > 0 && (
              <div><Label>Klasse</Label>
                <Select value={editItem.className || ""} onValueChange={(v) => setEditItem({ ...editItem, className: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                </Select></div>
            )}
            <div><Label>Ort / Raum</Label><Input value={editItem.location || ""} onChange={e => setEditItem({ ...editItem, location: e.target.value })} className="mt-1" placeholder="Optional" /></div>
            <div><Label>Notiz</Label><Input value={editItem.note || ""} onChange={e => setEditItem({ ...editItem, note: e.target.value })} className="mt-1" placeholder="Optional" /></div>
          </div>
          <DialogFooter className="mt-2"><Button onClick={save} className="w-full">Speichern</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
