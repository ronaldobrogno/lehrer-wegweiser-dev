import { useState, useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getNotes, saveNotes } from "@/lib/storage";

export default function NotesModule({ onBack }: { onBack: () => void }) {
  const [notes, setNotes] = useState(getNotes());
  useEffect(() => { saveNotes(notes); }, [notes]);

  return (
    <div className="animate-fade-in">
      <PageHeader title="Notizen" subtitle="Deine persönlichen Notizen" />
      <div className="px-5 pb-28">
        <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Schreibe hier deine Notizen..." className="min-h-[300px] text-base" />
        <p className="mt-2 text-xs text-muted-foreground">Wird automatisch gespeichert.</p>
        <Button variant="outline" className="mt-6 w-full" onClick={onBack}>Zurück</Button>
      </div>
    </div>
  );
}
