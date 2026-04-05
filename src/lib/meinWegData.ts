export interface WegStep {
  id: string;
  title: string;
  icon: string;
  description: string;
  relevantFor: string[];
  details: {
    meaning: string;
    importance: string;
    considerations: string;
    faq: { q: string; a: string }[];
    checklist?: string[];
  };
}

export const WEG_STEPS: WegStep[] = [
  {
    id: "studium",
    title: "Studium",
    icon: "GraduationCap",
    description: "Die fachliche und pädagogische Grundlage für deine spätere Laufbahn.",
    relevantFor: ["Student"],
    details: {
      meaning: "Im Studium legst du die Grundlage für deine spätere Tätigkeit als Lehrkraft. Je nach Schulform und Bundesland unterscheiden sich Inhalte und Anforderungen.",
      importance: "Hier entstehen Fachwissen, didaktisches Verständnis und oft schon erste Praxiserfahrungen.",
      considerations: "Wichtig sind ein klarer Studienplan, Praktika und ein früher Blick auf die Anforderungen des Referendariats.",
      faq: [
        { q: "Wann sollte ich mich mit dem Referendariat beschäftigen?", a: "Am besten frühzeitig, damit du Fristen, Bewerbungswege und Unterlagen kennst." },
        { q: "Sind Praktika wichtig?", a: "Ja, sie helfen dir, Schule realistisch kennenzulernen und deine Eignung besser einzuschätzen." }
      ],
      checklist: ["Studienverlauf planen", "Praktika organisieren", "Unterlagen sammeln"]
    }
  },
  {
    id: "referendariat",
    title: "Referendariat",
    icon: "BookOpen",
    description: "Die praktische Ausbildungsphase mit Unterricht, Prüfungen und Hospitationen.",
    relevantFor: ["Student", "Referendar"],
    details: {
      meaning: "Im Referendariat sammelst du intensive Praxiserfahrung im Schuldienst und wirst auf den eigenständigen Unterricht vorbereitet.",
      importance: "Diese Phase ist entscheidend für deine spätere berufliche Entwicklung und oft auch emotional fordernd.",
      considerations: "Achte auf Organisation, Fristen, Feedback-Kultur und eine gute Selbststrukturierung.",
      faq: [
        { q: "Was ist im Referendariat am wichtigsten?", a: "Ein gutes Zeitmanagement, saubere Vorbereitung und ein realistischer Umgang mit Belastung." }
      ],
      checklist: ["Seminartermine im Blick behalten", "Unterricht strukturieren", "Prüfungsfristen notieren"]
    }
  },
  {
    id: "berufseinstieg",
    title: "Berufseinstieg",
    icon: "Briefcase",
    description: "Der Start in den Schulalltag mit Verantwortung, Routineaufbau und Organisation.",
    relevantFor: ["Referendar", "Berufseinstieg"],
    details: {
      meaning: "Im Berufseinstieg übernimmst du zunehmend Verantwortung und baust deine Unterrichts- und Schulroutinen auf.",
      importance: "Hier prägen sich Arbeitsweisen, Materialsysteme und dein eigener Stil als Lehrkraft.",
      considerations: "Wichtig sind Struktur, klare Prioritäten und der Schutz deiner Energie im Alltag.",
      faq: [
        { q: "Wie vermeide ich Überforderung?", a: "Mit klaren Routinen, realistischen Ansprüchen und guter Wochenplanung." }
      ],
      checklist: ["Materialstruktur anlegen", "Wochenplanung etablieren", "Kommunikationswege klären"]
    }
  },
  {
    id: "probezeit",
    title: "Beamter auf Probe",
    icon: "ShieldCheck",
    description: "Die Phase zwischen Einstieg und Verbeamtung auf Lebenszeit.",
    relevantFor: ["Berufseinstieg", "Beamter auf Probe"],
    details: {
      meaning: "In der Probezeit wird geprüft, ob du dich im Schuldienst dauerhaft bewährst.",
      importance: "Sie ist die zentrale Übergangsphase zur späteren Verbeamtung auf Lebenszeit.",
      considerations: "Behalte Beurteilungen, Formalien und gesundheitliche Themen im Blick.",
      faq: [
        { q: "Was ist in der Probezeit besonders wichtig?", a: "Zuverlässigkeit, professionelle Entwicklung und die Einhaltung dienstlicher Anforderungen." }
      ],
      checklist: ["Beurteilungen im Blick behalten", "Pflichten kennen", "Organisation stabil halten"]
    }
  },
  {
    id: "lebenszeit",
    title: "Beamter auf Lebenszeit",
    icon: "Award",
    description: "Die langfristige Phase mit Fokus auf Stabilität, Entwicklung und Optimierung.",
    relevantFor: ["Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Mit der Verbeamtung auf Lebenszeit erreichst du einen wichtigen Meilenstein deiner Laufbahn.",
      importance: "Jetzt geht es stärker um nachhaltige Organisation, Weiterentwicklung und langfristige Planung.",
      considerations: "Nutze Systeme und Routinen, die dir dauerhaft Arbeit abnehmen.",
      faq: [
        { q: "Was wird jetzt wichtiger?", a: "Langfristige Planung, Effizienz im Alltag und berufliche Weiterentwicklung." }
      ],
      checklist: ["Routinen optimieren", "Weiterbildungen planen", "Materialien systematisch pflegen"]
    }
  }
];
