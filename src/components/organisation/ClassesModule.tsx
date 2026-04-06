import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import {
  getClasses, saveClasses, getStudentsByClass, getStudents, saveStudents,
  getGradesByClass, getGradesByStudent, getGrades, saveGrades,
  SchoolClass, Student, GradeEntry, GradeCategory, GRADE_CATEGORY_LABELS,
  generateId,
} from "@/lib/storage";
import {
  Plus, Trash2, Edit2, ArrowLeft, ChevronRight, Users, BookOpen,
  BarChart3, StickyNote, GraduationCap,
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import SeatingPlanModule from "@/components/organisation/SeatingPlanModule";

type View = "list" | "classDetail" | "studentDetail" | "grades" | "seating";

export default function ClassesModule({ onBack }: { onBack: () => void }) {
  const [classes, setClasses] = useState<SchoolClass[]>(getClasses());
  const [students, setStudents] = useState<Student[]>(getStudents());
  const [grades, setGrades] = useState<GradeEntry[]>(getGrades());
  const [view, setView] = useState<View>("list");
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  // Dialogs
  const [classDialogOpen, setClassDialogOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  const [gradeDialogOpen, setGradeDialogOpen] = useState(false);

  const [editClass, setEditClass] = useState({ name: "", subject: "", schoolYear: "", notes: "" });
  const [editStudent, setEditStudent] = useState({ firstName: "", lastName: "", notes: "" });
  const [editGrade, setEditGrade] = useState({
    studentId: "", value: "2", category: "muendlich" as GradeCategory,
    title: "", date: new Date().toISOString().split("T")[0], semester: "1" as "1" | "2", note: "",
  });
  const [gradeFilter, setGradeFilter] = useState<string>("all");

  useEffect(() => { saveClasses(classes); }, [classes]);
  useEffect(() => { saveStudents(students); }, [students]);
  useEffect(() => { saveGrades(grades); }, [grades]);

  const classStudents = selectedClass ? students.filter(s => s.classId === selectedClass.id) : [];
  const classGrades = selectedClass ? grades.filter(g => g.classId === selectedClass.id) : [];
  const studentGrades = selectedStudent ? grades.filter(g => g.studentId === selectedStudent.id) : [];

  const avg = (gs: GradeEntry[]) => gs.length ? (gs.reduce((s, g) => s + g.value, 0) / gs.length).toFixed(1) : "–";

  // ── Class List ──
  if (view === "list") {
    return (
      <div className="animate-fade-in">
        <PageHeader title="Klassen & Schüler" subtitle="Deine Klassen verwalten" />
        <div className="px-5 pb-28">
          <Button className="w-full mb-4" onClick={() => { setEditClass({ name: "", subject: "", schoolYear: "", notes: "" }); setClassDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" /> Klasse anlegen
          </Button>

          {classes.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">Noch keine Klassen angelegt.</p>
          ) : (
            <div className="space-y-2.5">
              {classes.map(c => {
                const count = students.filter(s => s.classId === c.id).length;
                return (
                  <button key={c.id} onClick={() => { setSelectedClass(c); setView("classDetail"); }}
                    className="w-full flex items-center gap-3.5 rounded-2xl bg-card p-4 card-shadow text-left active:bg-accent/50">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{c.name}</p>
                      <p className="text-xs text-muted-foreground">{count} Schüler{c.subject ? ` · ${c.subject}` : ""}{c.schoolYear ? ` · ${c.schoolYear}` : ""}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}

          <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Zurück</Button>
        </div>

        <Dialog open={classDialogOpen} onOpenChange={setClassDialogOpen}>
          <DialogContent className="max-w-sm mx-4">
            <DialogHeader><DialogTitle>Klasse anlegen</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Bezeichnung *</Label><Input value={editClass.name} onChange={e => setEditClass({ ...editClass, name: e.target.value })} className="mt-1" placeholder="z.B. 7a" /></div>
              <div><Label>Fach</Label><Input value={editClass.subject} onChange={e => setEditClass({ ...editClass, subject: e.target.value })} className="mt-1" placeholder="Optional" /></div>
              <div><Label>Schuljahr</Label><Input value={editClass.schoolYear} onChange={e => setEditClass({ ...editClass, schoolYear: e.target.value })} className="mt-1" placeholder="z.B. 2024/25" /></div>
              <div><Label>Notizen</Label><Textarea value={editClass.notes} onChange={e => setEditClass({ ...editClass, notes: e.target.value })} className="mt-1" placeholder="Optional" /></div>
            </div>
            <DialogFooter className="mt-2">
              <Button className="w-full" onClick={() => {
                if (!editClass.name.trim()) { toast.error("Bitte Bezeichnung angeben"); return; }
                setClasses([...classes, { id: generateId(), ...editClass, createdAt: new Date().toISOString() }]);
                setClassDialogOpen(false);
                toast.success("Klasse angelegt");
              }}>Anlegen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ── Class Detail ──
  if (view === "classDetail" && selectedClass) {
    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-12 pb-2">
          <button onClick={() => { setView("list"); setSelectedClass(null); }} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
            <ArrowLeft className="h-4 w-4" /> Klassen
          </button>
          <h1 className="text-xl font-bold text-foreground">{selectedClass.name}</h1>
          <p className="text-sm text-muted-foreground">
            {classStudents.length} Schüler{selectedClass.subject ? ` · ${selectedClass.subject}` : ""}
            {selectedClass.schoolYear ? ` · ${selectedClass.schoolYear}` : ""}
          </p>
        </div>

        <div className="px-5 pb-28 space-y-4 mt-4">
          {/* Overview cards */}
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-card p-3 card-shadow text-center">
              <p className="text-lg font-bold text-primary">{classStudents.length}</p>
              <p className="text-[10px] text-muted-foreground">Schüler</p>
            </div>
            <div className="rounded-xl bg-card p-3 card-shadow text-center">
              <p className="text-lg font-bold text-primary">{avg(classGrades)}</p>
              <p className="text-[10px] text-muted-foreground">Ø Note</p>
            </div>
            <div className="rounded-xl bg-card p-3 card-shadow text-center">
              <p className="text-lg font-bold text-primary">{classGrades.length}</p>
              <p className="text-[10px] text-muted-foreground">Noten</p>
            </div>
          </div>

          {/* Quick actions */}
          <div className="grid grid-cols-3 gap-2">
  <Button variant="outline" onClick={() => { setEditStudent({ firstName: "", lastName: "", notes: "" }); setStudentDialogOpen(true); }}>
    <Plus className="h-4 w-4 mr-1" /> Schüler
  </Button>
  <Button variant="outline" onClick={() => setView("grades")}>
    <BarChart3 className="h-4 w-4 mr-1" /> Noten
  </Button>
  <Button variant="outline" onClick={() => setView("seating")}>
    Sitzplan
  </Button>
</div>

          {/* Student list */}
          <div>
            <h2 className="text-sm font-semibold text-foreground mb-2">Schüler</h2>
            {classStudents.length === 0 ? (
              <p className="py-4 text-center text-sm text-muted-foreground">Noch keine Schüler. Füge welche hinzu!</p>
            ) : (
              <div className="space-y-2">
                {classStudents.sort((a, b) => a.lastName.localeCompare(b.lastName)).map(s => {
                  const sGrades = grades.filter(g => g.studentId === s.id);
                  return (
                    <button key={s.id} onClick={() => { setSelectedStudent(s); setView("studentDetail"); }}
                      className="w-full flex items-center gap-3 rounded-xl bg-card p-3.5 card-shadow text-left active:bg-accent/50">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                        {s.firstName[0]}{s.lastName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{s.lastName}, {s.firstName}</p>
                        <p className="text-xs text-muted-foreground">{sGrades.length} Noten · Ø {avg(sGrades)}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {selectedClass.notes && (
            <div className="rounded-2xl bg-card p-4 card-shadow">
              <h3 className="text-sm font-semibold text-foreground mb-1">Notizen</h3>
              <p className="text-sm text-muted-foreground">{selectedClass.notes}</p>
            </div>
          )}

          {/* Delete class */}
          <Button variant="outline" className="w-full text-destructive" onClick={() => {
            setClasses(classes.filter(c => c.id !== selectedClass.id));
            setStudents(students.filter(s => s.classId !== selectedClass.id));
            setGrades(grades.filter(g => g.classId !== selectedClass.id));
            setView("list"); setSelectedClass(null);
            toast.success("Klasse gelöscht");
          }}>Klasse löschen</Button>
        </div>

        <Dialog open={studentDialogOpen} onOpenChange={setStudentDialogOpen}>
          <DialogContent className="max-w-sm mx-4">
            <DialogHeader><DialogTitle>Schüler hinzufügen</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Vorname *</Label><Input value={editStudent.firstName} onChange={e => setEditStudent({ ...editStudent, firstName: e.target.value })} className="mt-1" /></div>
              <div><Label>Nachname *</Label><Input value={editStudent.lastName} onChange={e => setEditStudent({ ...editStudent, lastName: e.target.value })} className="mt-1" /></div>
              <div><Label>Notizen</Label><Textarea value={editStudent.notes} onChange={e => setEditStudent({ ...editStudent, notes: e.target.value })} className="mt-1" placeholder="Optional" /></div>
            </div>
            <DialogFooter className="mt-2">
              <Button className="w-full" onClick={() => {
                if (!editStudent.firstName.trim() || !editStudent.lastName.trim()) { toast.error("Name erforderlich"); return; }
                setStudents([...students, { id: generateId(), classId: selectedClass.id, ...editStudent }]);
                setStudentDialogOpen(false);
                setEditStudent({ firstName: "", lastName: "", notes: "" });
                toast.success("Schüler hinzugefügt");
              }}>Hinzufügen</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ── Student Detail ──
  if (view === "studentDetail" && selectedStudent) {
    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-12 pb-2">
          <button onClick={() => { setView("classDetail"); setSelectedStudent(null); }} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
            <ArrowLeft className="h-4 w-4" /> {selectedClass?.name}
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{selectedStudent.firstName} {selectedStudent.lastName}</h1>
              <p className="text-sm text-muted-foreground">{selectedClass?.name}</p>
            </div>
          </div>
        </div>

        <div className="px-5 pb-28 space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-card p-3 card-shadow text-center">
              <p className="text-lg font-bold text-primary">{avg(studentGrades)}</p>
              <p className="text-[10px] text-muted-foreground">Ø Gesamt</p>
            </div>
            <div className="rounded-xl bg-card p-3 card-shadow text-center">
              <p className="text-lg font-bold text-primary">{studentGrades.length}</p>
              <p className="text-[10px] text-muted-foreground">Noten</p>
            </div>
          </div>

          <Button className="w-full" onClick={() => { setEditGrade({ ...editGrade, studentId: selectedStudent.id }); setGradeDialogOpen(true); }}>
            <Plus className="h-4 w-4 mr-2" /> Note eintragen
          </Button>

          {/* Grades list */}
          {studentGrades.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">Noch keine Noten.</p>
          ) : (
            <div className="space-y-2">
              {studentGrades.sort((a, b) => b.date.localeCompare(a.date)).map(g => (
                <div key={g.id} className="flex items-center gap-3 rounded-xl bg-card p-3.5 card-shadow">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-full font-bold text-sm ${
                    g.value <= 2 ? "bg-green-100 text-green-700" : g.value <= 4 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                  }`}>{g.value}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{g.title || GRADE_CATEGORY_LABELS[g.category]}</p>
                    <p className="text-xs text-muted-foreground">{GRADE_CATEGORY_LABELS[g.category]} · {new Date(g.date + "T00:00:00").toLocaleDateString("de-DE")} · {g.semester}. HJ</p>
                  </div>
                  <button onClick={() => { setGrades(grades.filter(x => x.id !== g.id)); toast.success("Gelöscht"); }} className="text-muted-foreground hover:text-destructive p-1">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Notes */}
          {selectedStudent.notes && (
            <div className="rounded-2xl bg-card p-4 card-shadow">
              <h3 className="text-sm font-semibold text-foreground mb-1">Notizen</h3>
              <p className="text-sm text-muted-foreground">{selectedStudent.notes}</p>
            </div>
          )}

          <Button variant="outline" className="w-full text-destructive" onClick={() => {
            setStudents(students.filter(s => s.id !== selectedStudent.id));
            setGrades(grades.filter(g => g.studentId !== selectedStudent.id));
            setView("classDetail"); setSelectedStudent(null);
            toast.success("Schüler gelöscht");
          }}>Schüler entfernen</Button>
        </div>

        <Dialog open={gradeDialogOpen} onOpenChange={setGradeDialogOpen}>
          <DialogContent className="max-w-sm mx-4 max-h-[85vh] overflow-y-auto">
            <DialogHeader><DialogTitle>Note eintragen</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <div><Label>Note (1-6) *</Label>
                <Select value={editGrade.value} onValueChange={v => setEditGrade({ ...editGrade, value: v })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{[1,2,3,4,5,6].map(n => <SelectItem key={n} value={String(n)}>{n}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Kategorie</Label>
                <Select value={editGrade.category} onValueChange={v => setEditGrade({ ...editGrade, category: v as GradeCategory })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>{Object.entries(GRADE_CATEGORY_LABELS).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
                </Select></div>
              <div><Label>Titel</Label><Input value={editGrade.title} onChange={e => setEditGrade({ ...editGrade, title: e.target.value })} className="mt-1" placeholder="z.B. Referat Klimawandel" /></div>
              <div><Label>Datum</Label><Input type="date" value={editGrade.date} onChange={e => setEditGrade({ ...editGrade, date: e.target.value })} className="mt-1" /></div>
              <div><Label>Halbjahr</Label>
                <Select value={editGrade.semester} onValueChange={v => setEditGrade({ ...editGrade, semester: v as "1" | "2" })}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1. Halbjahr</SelectItem>
                    <SelectItem value="2">2. Halbjahr</SelectItem>
                  </SelectContent>
                </Select></div>
              <div><Label>Kommentar</Label><Input value={editGrade.note || ""} onChange={e => setEditGrade({ ...editGrade, note: e.target.value })} className="mt-1" placeholder="Optional" /></div>
            </div>
            <DialogFooter className="mt-2">
              <Button className="w-full" onClick={() => {
                setGrades([...grades, {
                  id: generateId(),
                  studentId: editGrade.studentId || selectedStudent!.id,
                  classId: selectedClass!.id,
                  value: Number(editGrade.value),
                  category: editGrade.category,
                  title: editGrade.title,
                  date: editGrade.date,
                  semester: editGrade.semester,
                  note: editGrade.note,
                }]);
                setGradeDialogOpen(false);
                setEditGrade({ studentId: "", value: "2", category: "muendlich", title: "", date: new Date().toISOString().split("T")[0], semester: "1", note: "" });
                toast.success("Note eingetragen");
              }}>Speichern</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  // ── Grades Overview ──
  if (view === "grades" && selectedClass) {
    const filterOptions = [
      { value: "all", label: "Gesamt" },
      { value: "muendlich", label: "Mündlich" },
      { value: "klassenarbeit_1", label: "KA 1" },
      { value: "klassenarbeit_2", label: "KA 2" },
      { value: "schriftlich", label: "Schriftlich" },
      { value: "sozialverhalten", label: "Sozial" },
      { value: "arbeitsverhalten", label: "Arbeit" },
      { value: "sem1", label: "1. HJ" },
      { value: "sem2", label: "2. HJ" },
    ];

    const filteredGrades = (studentId: string) => {
      let gs = classGrades.filter(g => g.studentId === studentId);
      if (gradeFilter === "muendlich") gs = gs.filter(g => g.category === "muendlich");
      else if (gradeFilter === "klassenarbeit_1") gs = gs.filter(g => g.category === "klassenarbeit_1");
      else if (gradeFilter === "klassenarbeit_2") gs = gs.filter(g => g.category === "klassenarbeit_2");
      else if (gradeFilter === "schriftlich") gs = gs.filter(g => g.category.startsWith("klassenarbeit") || g.category === "test");
      else if (gradeFilter === "sozialverhalten") gs = gs.filter(g => g.category === "sozialverhalten");
      else if (gradeFilter === "arbeitsverhalten") gs = gs.filter(g => g.category === "arbeitsverhalten");
      else if (gradeFilter === "sem1") gs = gs.filter(g => g.semester === "1");
      else if (gradeFilter === "sem2") gs = gs.filter(g => g.semester === "2");
      return gs;
    };

    const totalFiltered = classStudents.flatMap(s => filteredGrades(s.id));

    return (
      <div className="animate-fade-in">
        <div className="px-5 pt-12 pb-2">
          <button onClick={() => setView("classDetail")} className="flex items-center gap-1.5 text-sm text-primary font-medium mb-3">
            <ArrowLeft className="h-4 w-4" /> {selectedClass.name}
          </button>
          <h1 className="text-xl font-bold text-foreground">Notenübersicht</h1>
          <p className="text-sm text-muted-foreground">Ø {avg(totalFiltered)}</p>
        </div>

        <div className="px-5 pb-28 mt-3">
          <div className="flex gap-1 mb-4 overflow-x-auto no-scrollbar">
            {filterOptions.map(f => (
              <button key={f.value} onClick={() => setGradeFilter(f.value)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-medium whitespace-nowrap transition-colors ${
                  gradeFilter === f.value ? "bg-primary text-primary-foreground" : "bg-card text-muted-foreground card-shadow"
                }`}>{f.label}</button>
            ))}
          </div>

          <div className="space-y-2">
            {classStudents.sort((a, b) => a.lastName.localeCompare(b.lastName)).map(s => {
              const gs = filteredGrades(s.id);
              return (
                <button key={s.id} onClick={() => { setSelectedStudent(s); setView("studentDetail"); }}
                  className="w-full flex items-center gap-3 rounded-xl bg-card p-3.5 card-shadow text-left active:bg-accent/50">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {s.firstName[0]}{s.lastName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{s.lastName}, {s.firstName}</p>
                    <p className="text-xs text-muted-foreground">{gs.length} Noten · Ø {avg(gs)}</p>
                  </div>
                  <div className={`flex h-8 w-8 items-center justify-center rounded-full font-bold text-xs ${
                    gs.length === 0 ? "bg-muted text-muted-foreground" :
                    Number(avg(gs)) <= 2 ? "bg-green-100 text-green-700" :
                    Number(avg(gs)) <= 4 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
                  }`}>{avg(gs)}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
if (view === "seating" && selectedClass) {
  return (
    <SeatingPlanModule
      onBack={() => setView("classDetail")}
      classId={selectedClass.id}
      className={selectedClass.name}
      students={students.filter((s) => s.classId === selectedClass.id)}
    />
  );
}
  return null;
}
