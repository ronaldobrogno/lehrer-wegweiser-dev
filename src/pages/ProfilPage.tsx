import { useState } from "react";
import { getProfile, saveProfile, clearProfile, BUNDESLAENDER, STATUS_OPTIONS, UserProfile } from "@/lib/storage";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, MapPin, CalendarDays, BadgeCheck, Sparkles } from "lucide-react";

interface ProfilPageProps {
  onReset: () => void;
}

const STATUS_RELEVANCE: Record<string, string[]> = {
  Student: ["Referendariat vorbereiten", "Verbeamtung verstehen", "PKV frühzeitig klären"],
  Referendar: ["Fristen im Blick behalten", "Verbeamtung auf Probe vorbereiten", "Versicherungsschutz prüfen"],
  Berufseinstieg: ["Schulalltag strukturieren", "Verbeamtung beantragen", "Absicherung optimieren"],
  "Beamter auf Probe": ["Probezeit erfolgreich abschließen", "Gesundheit im Blick behalten", "Lebenszeit-Verbeamtung planen"],
  "Beamter auf Lebenszeit": ["Materialien nutzen", "Organisation optimieren", "Absicherung prüfen"],
};

export default function ProfilPage({ onReset }: ProfilPageProps) {
  const profile = getProfile()!;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<UserProfile>(profile);
  const relevantTopics = STATUS_RELEVANCE[profile.status] || [];

  const handleSave = () => {
    saveProfile(form);
    setEditing(false);
    toast.success("Profil aktualisiert!");
  };

  const handleReset = () => {
    clearProfile();
    onReset();
  };

  const infoItems = [
    { icon: User, label: "Name", value: `${profile.vorname} ${profile.nachname}` },
    { icon: CalendarDays, label: "Geburtsdatum", value: profile.geburtsdatum },
    { icon: BadgeCheck, label: "Status", value: profile.status },
    { icon: MapPin, label: "Bundesland", value: profile.bundesland },
  ];

  return (
    <div className="animate-fade-in">
      <PageHeader title="Profil" subtitle="Deine persönlichen Daten" />
      <div className="px-5 pb-6">
        {!editing ? (
          <>
            <div className="mb-6 space-y-3">
              {infoItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4 rounded-2xl bg-card p-4 card-shadow">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="text-sm font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Relevant topics */}
            {relevantTopics.length > 0 && (
              <div className="mb-6 rounded-2xl bg-card p-4 card-shadow">
                <div className="mb-2 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-semibold text-foreground">Für dich relevant</h3>
                </div>
                <ul className="space-y-1.5">
                  {relevantTopics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1 w-1 rounded-full bg-primary" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2.5">
              <Button className="w-full h-11 font-medium" onClick={() => setEditing(true)}>
                Daten aktualisieren
              </Button>
              <Button variant="outline" className="w-full h-11 font-medium text-destructive" onClick={handleReset}>
                App zurücksetzen
              </Button>
            </div>
          </>
        ) : (
          <div className="space-y-4 rounded-2xl bg-card p-5 card-shadow">
            <div>
              <Label>Vorname</Label>
              <Input value={form.vorname} onChange={(e) => setForm({ ...form, vorname: e.target.value })} className="mt-1.5 h-11 text-base" />
            </div>
            <div>
              <Label>Nachname</Label>
              <Input value={form.nachname} onChange={(e) => setForm({ ...form, nachname: e.target.value })} className="mt-1.5 h-11 text-base" />
            </div>
            <div>
              <Label>Geburtsdatum</Label>
              <Input type="date" value={form.geburtsdatum} onChange={(e) => setForm({ ...form, geburtsdatum: e.target.value })} className="mt-1.5 h-11 text-base" />
            </div>
            <div>
              <Label>Bundesland</Label>
              <Select value={form.bundesland} onValueChange={(v) => setForm({ ...form, bundesland: v })}>
                <SelectTrigger className="mt-1.5 h-11 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {BUNDESLAENDER.map((bl) => <SelectItem key={bl} value={bl}>{bl}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger className="mt-1.5 h-11 text-base"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button className="flex-1" onClick={handleSave}>Speichern</Button>
              <Button variant="outline" className="flex-1" onClick={() => setEditing(false)}>Abbrechen</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
