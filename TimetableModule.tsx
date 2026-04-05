import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { getTimetable, saveTimetable, TimetableEntry, WEEKDAYS, SUBJECT_COLORS, generateId, getClasses } from "@/lib/storage";
import { Plus, Trash2, Clock, Edit2 } from "lucide-react";
import { toast } from "sonner";

const EMPTY_ENTRY: Omit<TimetableEntry, "id"> = {
  day: 0, startTime: "08:00", endTime: "08:45", subject: "", room: "", note: "", className: "",
};

export default function TimetableModule({ onBack }: { onBack: () => void }) {
  const [entries, setEntries] = useState<TimetableEntry[]>(getTimetable());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editEntry, setEditEntry] = useState<Omit<TimetableEntry, "id"> & { id?: string }>(EMPTY_ENTRY);
  const [selectedDay, setSelectedDay] = useState<number>((new Date().getDay() + 6) % 7);
  const classes = getClasses();

  useEffect(() => { saveTimetable(entries); }, [entries]);

  const save = () => {
    if (!editEntry.subject.trim()) { toast.error("Bitte Fach angeben"); return; }
    if (editEntry.id) {
      setEntries(entries.map(e => e.id === editEntry.id ? { ...editEntry, id: editEntry.id } as TimetableEntry : e));
    } else {
      setEntries([...entries, { ...editEntry, id: generateId() } as TimetableEntry]);
    }
    setDialogOpen(false);
    setEditEntry(EMPTY_ENTRY);
    toast.success("Gespeichert");
  };

  const dayEntries = entries.filter(e => e.day === selectedDay).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const colorFor = (subject: string) => SUBJECT_COLORS[subject] || SUBJECT_COLORS.default;

  return (
    <div className="animate-fade-in">
      <PageHeader title="Stundenplan" subtitle="Dein Wochenstundenplan" />
      <div className="px-5 pb-28">
        {/* Day tabs */}
        <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar">
          {WEEKDAYS.map((d, i) => (
            <button key={i} onClick={() => setSelectedDay(i)}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                selectedDay === i ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground card-shadow"
              }`}>{d.slice(0, 2)}</button>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-foreground">{WEEKDAYS[selectedDay]}</h2>
          <Button size="sm" onClick={() => { setEditEntry({ ...EMPTY_ENTRY, day: selectedDay }); setDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-1" /> Stunde
          </Button>
        </div>

        {dayEntries.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">Keine Stunden für diesen Tag.</p>
        ) : (
          <div className="space-y-2.5">
            {dayEntries.map(entry => (
              <div key={entry.id} className="rounded-2xl bg-card p-4 card-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center text-xs text-muted-foreground font-medium min-w-[44px]">
                    <span>{entry.startTime}</span>
                    <div className="w-px h-3 bg-border my-0.5" />
                    <span>{entry.endTime}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className={`rounded-lg px-2 py-0.5 text-xs font-medium ${colorFor(entry.subject)}`}>{entry.subject}</span>
                      {entry.className && <span className="text-xs text-muted-foreground">{entry.className}</span>}
                    </div>
                    {entry.room && <p className="mt-1 text-xs text-muted-foreground">Raum {entry.room}</p>}
                    {entry.note && <p className="mt-1 text-xs text-muted-foreground italic">{entry.note}</p>}
                  </div>
                  <div className="flex gap-1">
                    <button onClick={() => { setEditEntry(entry); setDialogOpen(true); }} className="text-muted-foreground hover:text-primary p-1"><Edit2 className="h-3.5 w-3.5" /></button>
                    <button onClick={() => { setEntries(entries.filter(e => e.id !== entry.id)); toast.success("Gelöscht"); }} className="text-muted-foreground hover:text-destructive p-1"><Trash2 className="h-3.5 w-3.5" /></button>
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
          <DialogHeader><DialogTitle>{editEntry.id ? "Stunde bearbeiten" : "Neue Stunde"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Tag</Label>
              <Select value={String(editEntry.day)} onValueChange={(v) => setEditEntry({ ...editEntry, day: Number(v) })}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>{WEEKDAYS.map((d, i) => <SelectItem key={i} value={String(i)}>{d}</SelectItem>)}</SelectContent>
              </Select></div>
            <div className="grid grid-cols-2 gap-2">
              <div><Label>Von</Label><Input type="time" value={editEntry.startTime} onChange={e => setEditEntry({ ...editEntry, startTime: e.target.value })} className="mt-1" /></div>
              <div><Label>Bis</Label><Input type="time" value={editEntry.endTime} onChange={e => setEditEntry({ ...editEntry, endTime: e.target.value })} className="mt-1" /></div>
            </div>
            <div><Label>Fach</Label><Input value={editEntry.subject} onChange={e => setEditEntry({ ...editEntry, subject: e.target.value })} className="mt-1" placeholder="z.B. Mathematik" /></div>
            {classes.length > 0 && (
              <div><Label>Klasse</Label>
                <Select value={editEntry.className || ""} onValueChange={(v) => setEditEntry({ ...editEntry, className: v })}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Optional" /></SelectTrigger>
                  <SelectContent>{classes.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}</SelectContent>
                </Select></div>
            )}
            <div><Label>Raum</Label><Input value={editEntry.room || ""} onChange={e => setEditEntry({ ...editEntry, room: e.target.value })} className="mt-1" placeholder="Optional" /></div>
            <div><Label>Notiz</Label><Input value={editEntry.note || ""} onChange={e => setEditEntry({ ...editEntry, note: e.target.value })} className="mt-1" placeholder="Optional" /></div>
          </div>
          <DialogFooter className="mt-2">
            <Button onClick={save} className="w-full">Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
