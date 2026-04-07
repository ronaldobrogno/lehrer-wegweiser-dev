import { useEffect, useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Users,
  LayoutGrid,
  Grip,
  School,
  UserCheck,
  Armchair,
} from "lucide-react";
import {
  getSeatingPlan,
  saveSeatingPlan,
  SeatingPlan,
  SeatPosition,
  Student,
  generateId,
} from "@/lib/storage";
import { toast } from "sonner";

const LAYOUT_PRESETS: Record<
  SeatingPlan["layout"],
  { label: string; seats: Array<{ x: number; y: number }> }
> = {
  rows: {
    label: "Reihen",
    seats: [
      { x: 14, y: 18 }, { x: 42, y: 18 }, { x: 70, y: 18 },
      { x: 14, y: 40 }, { x: 42, y: 40 }, { x: 70, y: 40 },
      { x: 14, y: 62 }, { x: 42, y: 62 }, { x: 70, y: 62 },
    ],
  },
  groups: {
    label: "Gruppen",
    seats: [
      { x: 20, y: 22 }, { x: 36, y: 22 }, { x: 20, y: 36 }, { x: 36, y: 36 },
      { x: 64, y: 22 }, { x: 80, y: 22 }, { x: 64, y: 36 }, { x: 80, y: 36 },
      { x: 20, y: 60 }, { x: 36, y: 60 }, { x: 20, y: 74 }, { x: 36, y: 74 },
      { x: 64, y: 60 }, { x: 80, y: 60 }, { x: 64, y: 74 }, { x: 80, y: 74 },
    ],
  },
  "u-shape": {
    label: "U-Form",
    seats: [
      { x: 16, y: 20 }, { x: 16, y: 36 }, { x: 16, y: 52 }, { x: 16, y: 68 },
      { x: 34, y: 78 }, { x: 50, y: 78 }, { x: 66, y: 78 },
      { x: 84, y: 20 }, { x: 84, y: 36 }, { x: 84, y: 52 }, { x: 84, y: 68 },
    ],
  },
  horseshoe: {
    label: "Halbkreis",
    seats: [
      { x: 18, y: 68 },
      { x: 28, y: 52 },
      { x: 40, y: 38 },
      { x: 52, y: 32 },
      { x: 64, y: 38 },
      { x: 76, y: 52 },
      { x: 86, y: 68 },
    ],
  },
  custom: {
    label: "Eigenes Layout",
    seats: [
      { x: 18, y: 22 },
      { x: 42, y: 22 },
      { x: 66, y: 22 },
      { x: 18, y: 50 },
      { x: 42, y: 50 },
      { x: 66, y: 50 },
    ],
  },
};

type DragMode = { seatId: string } | null;
type PlanMode = "build" | "assign";

export default function SeatingPlanModule({
  onBack,
  classId,
  className,
  students,
}: {
  onBack: () => void;
  classId: string;
  className: string;
  students: Student[];
}) {
  const [plan, setPlan] = useState<SeatingPlan>(() => {
    const existingPlan = getSeatingPlan(classId);

    if (existingPlan) {
      return {
        ...existingPlan,
        seats: existingPlan.seats.map((seat) => ({
          ...seat,
          studentIds: seat.studentIds || [],
        })),
      };
    }

    return {
      classId,
      layout: "rows",
      seats: LAYOUT_PRESETS.rows.seats.map((s, index) => ({
        id: generateId(),
        x: s.x,
        y: s.y,
        label: `Tisch ${index + 1}`,
        studentIds: [],
      })),
    };
  });

  const [selectedSeatId, setSelectedSeatId] = useState<string | null>(null);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [dragMode, setDragMode] = useState<DragMode>(null);
  const [newSeatLabel, setNewSeatLabel] = useState("");
  const [planMode, setPlanMode] = useState<PlanMode>("build");
  const [seatCapacityMap, setSeatCapacityMap] = useState<Record<string, number>>({});

  useEffect(() => {
    const nextCapacityMap: Record<string, number> = {};
    plan.seats.forEach((seat) => {
      if (!nextCapacityMap[seat.id]) {
        nextCapacityMap[seat.id] = seatCapacityMap[seat.id] || 2;
      }
    });
    setSeatCapacityMap((prev) => ({ ...nextCapacityMap, ...prev }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveSeatingPlan(plan);
  }, [plan]);

  const assignedStudentIds = useMemo(
    () => plan.seats.flatMap((s: any) => s.studentIds || []).filter(Boolean) as string[],
    [plan]
  );

  const freeStudents = students.filter((s) => !assignedStudentIds.includes(s.id));
  const selectedSeat = plan.seats.find((s) => s.id === selectedSeatId) || null;

  const totalTables = plan.seats.length;
  const totalCapacity = plan.seats.reduce((sum, seat) => sum + (seatCapacityMap[seat.id] || 2), 0);
  const totalAssigned = assignedStudentIds.length;
  const totalFreeSeats = Math.max(totalCapacity - totalAssigned, 0);

  const applyPreset = (layout: SeatingPlan["layout"]) => {
    const preset = LAYOUT_PRESETS[layout];
    const newSeats = preset.seats.map((s, index) => ({
      id: generateId(),
      x: s.x,
      y: s.y,
      label: `${newSeatLabel || "Tisch"} ${index + 1}`,
      studentIds: [],
    }));

    setPlan({
      classId,
      layout,
      seats: newSeats,
    });

    const nextCapacityMap: Record<string, number> = {};
    newSeats.forEach((seat) => {
      nextCapacityMap[seat.id] = 2;
    });
    setSeatCapacityMap(nextCapacityMap);

    toast.success(`Layout „${preset.label}“ geladen`);
  };

  const addSeat = () => {
    const id = generateId();

    setPlan((prev) => ({
      ...prev,
      seats: [
        ...prev.seats,
        {
          id,
          x: 42,
          y: 42,
          label: newSeatLabel.trim() || `Tisch ${prev.seats.length + 1}`,
          studentIds: [],
        },
      ],
    }));

    setSeatCapacityMap((prev) => ({
      ...prev,
      [id]: 2,
    }));

    toast.success("Tisch hinzugefügt");
  };

  const updateSeat = (seatId: string, patch: Partial<SeatPosition>) => {
    setPlan((prev) => ({
      ...prev,
      seats: prev.seats.map((seat) => (seat.id === seatId ? { ...seat, ...patch } : seat)),
    }));
  };

  const updateSeatCapacity = (seatId: string, capacity: number) => {
    setSeatCapacityMap((prev) => ({
      ...prev,
      [seatId]: capacity,
    }));

    setPlan((prev) => ({
      ...prev,
      seats: prev.seats.map((seat: any) => {
        if (seat.id !== seatId) return seat;
        return {
          ...seat,
          studentIds: (seat.studentIds || []).slice(0, capacity),
        };
      }),
    }));
  };

  const removeSeat = (seatId: string) => {
    setPlan((prev) => ({
      ...prev,
      seats: prev.seats.filter((seat) => seat.id !== seatId),
    }));

    setSeatCapacityMap((prev) => {
      const next = { ...prev };
      delete next[seatId];
      return next;
    });

    if (selectedSeatId === seatId) setSelectedSeatId(null);
    toast.success("Tisch entfernt");
  };

  const getStudentNames = (studentIds?: string[]) => {
    if (!studentIds || studentIds.length === 0) return "Frei";

    const names = studentIds
      .map((studentId) => {
        const student = students.find((s) => s.id === studentId);
        return student ? `${student.firstName} ${student.lastName}` : null;
      })
      .filter(Boolean);

    return names.length > 0 ? names.join(", ") : "Frei";
  };

  const getSeatWidth = (capacity: number) => {
    if (capacity <= 1) return "w-[74px]";
    if (capacity === 2) return "w-[88px]";
    if (capacity === 3) return "w-[102px]";
    return "w-[116px]";
  };

  const getSeatNameBoxHeight = (capacity: number) => {
    if (capacity <= 1) return "min-h-[34px]";
    if (capacity === 2) return "min-h-[42px]";
    if (capacity === 3) return "min-h-[50px]";
    return "min-h-[58px]";
  };

  return (
    <div className="animate-fade-in">
      <PageHeader title="Sitzplan" subtitle={`${className} · Tische aufbauen und Schüler zuweisen`} />

      <div className="px-5 pb-28">
        <Button variant="outline" className="mb-4 w-full" onClick={onBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zur Klasse
        </Button>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-card p-4 card-shadow">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <School className="h-4 w-4 text-primary" />
              Tische
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">{totalTables}</p>
          </div>

          <div className="rounded-2xl bg-card p-4 card-shadow">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Armchair className="h-4 w-4 text-primary" />
              Plätze gesamt
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">{totalCapacity}</p>
          </div>

          <div className="rounded-2xl bg-card p-4 card-shadow">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <UserCheck className="h-4 w-4 text-primary" />
              Belegt
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">{totalAssigned}</p>
          </div>

          <div className="rounded-2xl bg-card p-4 card-shadow">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users className="h-4 w-4 text-primary" />
              Frei
            </div>
            <p className="mt-1 text-xl font-bold text-foreground">{totalFreeSeats}</p>
          </div>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2">
          <Button variant={planMode === "build" ? "default" : "outline"} onClick={() => setPlanMode("build")}>
            Aufbau
          </Button>

          <Button variant={planMode === "assign" ? "default" : "outline"} onClick={() => setPlanMode("assign")}>
            Zuweisen
          </Button>
        </div>

        <div className="mb-4 rounded-2xl bg-card p-4 card-shadow space-y-3">
          <div>
            <Label>Layout wählen</Label>
            <Select value={plan.layout} onValueChange={(value) => applyPreset(value as SeatingPlan["layout"])}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(LAYOUT_PRESETS).map(([key, value]) => (
                  <SelectItem key={key} value={key}>
                    {value.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tisch-Bezeichnung</Label>
            <Input
              value={newSeatLabel}
              onChange={(e) => setNewSeatLabel(e.target.value)}
              className="mt-1"
              placeholder="z. B. Tisch"
            />
          </div>

          <Button className="w-full" onClick={addSeat}>
            <Plus className="mr-2 h-4 w-4" />
            Tisch hinzufügen
          </Button>
        </div>

        <div className="mb-4 rounded-[28px] bg-card p-4 card-shadow">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <LayoutGrid className="h-4 w-4 text-primary" />
              Raumansicht
            </h2>

            <span className="text-right text-xs text-muted-foreground">
              {planMode === "build"
                ? "Aufbau-Modus: Tische halten und verschieben"
                : "Zuweisungs-Modus: Tisch antippen und Schüler zuweisen"}
            </span>
          </div>

          <div className="relative h-[560px] w-full overflow-hidden rounded-2xl border border-border bg-[linear-gradient(to_right,rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:24px_24px] bg-background">
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-xl bg-primary/10 px-4 py-2 text-xs font-medium text-primary">
              Tafel / Front
            </div>

            {plan.seats.map((seat: any) => {
              const capacity = seatCapacityMap[seat.id] || 2;

              return (
                <button
                  key={seat.id}
                  type="button"
                  onClick={() => {
                    if (planMode !== "assign") return;
                    setSelectedSeatId(seat.id);
                    setAssignDialogOpen(true);
                  }}
                  onPointerDown={(e) => {
                    if (planMode !== "build") return;
                    e.currentTarget.setPointerCapture(e.pointerId);
                    setDragMode({ seatId: seat.id });
                  }}
                  onPointerMove={(e) => {
                    if (!dragMode || dragMode.seatId !== seat.id) return;
                    const wrapper = (e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();
                    const newX = Math.max(6, Math.min(90, ((e.clientX - wrapper.left) / wrapper.width) * 100 - 6));
                    const newY = Math.max(12, Math.min(88, ((e.clientY - wrapper.top) / wrapper.height) * 100 - 5));
                    updateSeat(seat.id, { x: Number(newX.toFixed(1)), y: Number(newY.toFixed(1)) });
                  }}
                  onPointerUp={() => setDragMode(null)}
                  className={`absolute ${getSeatWidth(
                    capacity
                  )} -translate-x-1/2 -translate-y-1/2 rounded-2xl border p-1.5 text-center shadow-sm transition-transform active:scale-95 ${
                    selectedSeatId === seat.id ? "border-primary bg-primary/10" : "border-border bg-card"
                  }`}
                  style={{ left: `${seat.x}%`, top: `${seat.y}%` }}
                >
                  <div className="mb-0.5 flex items-center justify-center gap-1 text-[9px] text-muted-foreground">
                    <Grip className="h-3 w-3" />
                    <span>{seat.label || "Tisch"}</span>
                  </div>

                  <div className="mb-0.5 text-[9px] font-medium text-primary">
                    {capacity} Plätze
                  </div>

                  <div
                    className={`rounded-xl bg-background px-2 py-1.5 text-[10px] font-medium text-foreground ${getSeatNameBoxHeight(
                      capacity
                    )} flex items-center justify-center leading-tight`}
                  >
                    {getStudentNames(seat.studentIds)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl bg-card p-4 card-shadow">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Users className="h-4 w-4 text-primary" />
            Nicht zugewiesene Schüler
          </h2>

          {freeStudents.length === 0 ? (
            <p className="text-sm text-muted-foreground">Alle Schüler sind bereits einem Tisch zugewiesen.</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {freeStudents.map((student) => (
                <span key={student.id} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {student.firstName} {student.lastName}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>{selectedSeat?.label || "Tisch bearbeiten"}</DialogTitle>
          </DialogHeader>

          {selectedSeat && (
            <div className="space-y-3">
              <div>
                <Label>Bezeichnung</Label>
                <Input
                  className="mt-1"
                  value={selectedSeat.label || ""}
                  onChange={(e) => updateSeat(selectedSeat.id, { label: e.target.value })}
                  placeholder="z. B. Tisch 1"
                />
              </div>

              <div>
                <Label>Sitzplätze am Tisch</Label>
                <Select
                  value={String(seatCapacityMap[selectedSeat.id] || 2)}
                  onValueChange={(value) => updateSeatCapacity(selectedSeat.id, Number(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Sitzplatz</SelectItem>
                    <SelectItem value="2">2 Sitzplätze</SelectItem>
                    <SelectItem value="3">3 Sitzplätze</SelectItem>
                    <SelectItem value="4">4 Sitzplätze</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Schüler zuweisen</Label>
                <Select
                  value="placeholder"
                  onValueChange={(value) => {
                    if (value === "free") {
                      updateSeat(selectedSeat.id, { studentIds: [] });
                      return;
                    }

                    const currentIds = selectedSeat.studentIds || [];
                    const maxSeats = seatCapacityMap[selectedSeat.id] || 2;

                    if (currentIds.includes(value)) return;

                    if (currentIds.length >= maxSeats) {
                      toast.error("Dieser Tisch hat bereits alle Sitzplätze belegt.");
                      return;
                    }

                    updateSeat(selectedSeat.id, {
                      studentIds: [...currentIds, value],
                    });
                  }}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Schüler auswählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="free">Alle entfernen</SelectItem>
                    {students
                      .filter(
                        (student) =>
                          !assignedStudentIds.includes(student.id) ||
                          (selectedSeat.studentIds || []).includes(student.id)
                      )
                      .map((student) => (
                        <SelectItem key={student.id} value={student.id}>
                          {student.firstName} {student.lastName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-xl bg-muted/40 p-3">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Aktuell zugewiesen ({(selectedSeat.studentIds || []).length} /{" "}
                  {seatCapacityMap[selectedSeat.id] || 2})
                </p>

                {selectedSeat.studentIds && selectedSeat.studentIds.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedSeat.studentIds.map((studentId) => {
                      const student = students.find((s) => s.id === studentId);
                      if (!student) return null;

                      return (
                        <button
                          key={studentId}
                          type="button"
                          onClick={() =>
                            updateSeat(selectedSeat.id, {
                              studentIds: (selectedSeat.studentIds || []).filter((id) => id !== studentId),
                            })
                          }
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {student.firstName} {student.lastName} ×
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">Noch keine Schüler zugewiesen.</p>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="mt-2 flex-col gap-2 sm:flex-col">
            {selectedSeat && (
              <Button
                variant="outline"
                className="w-full text-destructive"
                onClick={() => removeSeat(selectedSeat.id)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Tisch löschen
              </Button>
            )}

            <Button className="w-full" onClick={() => setAssignDialogOpen(false)}>
              Fertig
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
