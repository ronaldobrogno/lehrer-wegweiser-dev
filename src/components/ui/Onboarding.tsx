import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { saveProfile, BUNDESLAENDER, STATUS_OPTIONS } from "@/lib/storage";
import { GraduationCap, Sparkles } from "lucide-react";

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [vorname, setVorname] = useState("");
  const [nachname, setNachname] = useState("");
  const [geburtsdatum, setGeburtsdatum] = useState("");
  const [bundesland, setBundesland] = useState("");
  const [status, setStatus] = useState("");
  const [step, setStep] = useState(0);

  const canProceed =
    step === 0
      ? vorname.trim() && nachname.trim()
      : step === 1
      ? geburtsdatum && bundesland
      : status;

  const handleSubmit = () => {
    if (step < 2) {
      setStep(step + 1);
      return;
    }
    saveProfile({ vorname: vorname.trim(), nachname: nachname.trim(), geburtsdatum, bundesland, status });
    onComplete();
  };

  const stepTitles = [
    "Willkommen! Lass uns starten.",
    "Noch ein paar Details…",
    "Wo stehst du gerade?",
  ];

  const stepSubtitles = [
    "Dein persönlicher Begleiter durchs Lehramt.",
    "Damit wir alles auf dich zuschneiden können.",
    "So können wir dir die passenden Inhalte zeigen.",
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-in">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
            <GraduationCap className="h-8 w-8 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Lehrer Begleiter</h1>
          <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            {stepSubtitles[step]}
          </p>
        </div>

        <div className="mb-2 text-center">
          <h2 className="text-lg font-semibold text-foreground">{stepTitles[step]}</h2>
        </div>

        <div className="mb-6 flex items-center justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i === step ? "w-8 bg-primary" : i < step ? "w-6 bg-primary/40" : "w-6 bg-border"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div className="animate-fade-in space-y-4">
            <div>
              <Label htmlFor="vorname">Vorname</Label>
              <Input
                id="vorname"
                value={vorname}
                onChange={(e) => setVorname(e.target.value)}
                placeholder="Max"
                className="mt-1.5 h-12 text-base"
              />
            </div>
            <div>
              <Label htmlFor="nachname">Nachname</Label>
              <Input
                id="nachname"
                value={nachname}
                onChange={(e) => setNachname(e.target.value)}
                placeholder="Mustermann"
                className="mt-1.5 h-12 text-base"
              />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="animate-fade-in space-y-4">
            <div>
              <Label htmlFor="geb">Geburtsdatum</Label>
              <Input
                id="geb"
                type="date"
                value={geburtsdatum}
                onChange={(e) => setGeburtsdatum(e.target.value)}
                className="mt-1.5 h-12 text-base"
              />
            </div>
            <div>
              <Label>Bundesland</Label>
              <Select value={bundesland} onValueChange={setBundesland}>
                <SelectTrigger className="mt-1.5 h-12 text-base">
                  <SelectValue placeholder="Bundesland wählen" />
                </SelectTrigger>
                <SelectContent>
                  {BUNDESLAENDER.map((bl) => (
                    <SelectItem key={bl} value={bl}>{bl}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in space-y-4">
            <Label>Dein aktueller Status</Label>
            <div className="space-y-2.5">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setStatus(opt)}
                  className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm font-medium transition-all ${
                    status === opt
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/30"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!canProceed}
          className="mt-6 h-12 w-full text-base font-semibold"
        >
          {step < 2 ? "Weiter" : "Loslegen 🚀"}
        </Button>

        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="mt-3 w-full text-center text-sm text-muted-foreground"
          >
            Zurück
          </button>
        )}
      </div>
    </div>
  );
}
