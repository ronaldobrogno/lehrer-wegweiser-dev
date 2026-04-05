export interface WissenArticle {
  id: string;
  icon: string;
  title: string;
  description: string;
  intro: string;
  sections: { heading: string; content: string }[];
  tips: string[];
  checklist?: string[];
}

export const WISSEN_ARTICLES: WissenArticle[] = [
  {
    id: "verbeamtung",
    icon: "ShieldCheck",
    title: "Verbeamtung verstehen",
    description: "Alles über den Weg zur Verbeamtung – einfach und verständlich erklärt.",
    intro: "Die Verbeamtung ist das Ziel vieler Lehrkräfte. Sie bietet finanzielle Sicherheit, einen besonderen Kündigungsschutz und Zugang zur Beihilfe. Hier erfährst du, wie der Prozess abläuft.",
    sections: [
      { heading: "Was bedeutet Verbeamtung?", content: "Als Beamter stehst du in einem besonderen Dienstverhältnis zum Staat. Du hast Pflichten (Treuepflicht, Neutralität), aber auch besondere Rechte (Alimentationsprinzip, Beihilfe, Pension)." },
      { heading: "Die Stufen der Verbeamtung", content: "Du durchläufst typischerweise: Beamter auf Widerruf (Referendariat) → Beamter auf Probe (2-3 Jahre) → Beamter auf Lebenszeit. Jede Stufe hat eigene Anforderungen." },
      { heading: "Voraussetzungen", content: "Erforderlich sind: 2. Staatsexamen, gesundheitliche Eignung (amtsärztliche Untersuchung), Altersgrenze beachten (je nach Bundesland 40-45 Jahre), einwandfreies Führungszeugnis." },
      { heading: "Unterschiede nach Bundesland", content: "Jedes Bundesland hat eigene Regelungen zu Altersgrenzen, Probezeiten und Anforderungen. Informiere dich frühzeitig über die Regeln deines Bundeslandes." },
    ],
    tips: [
      "Frühzeitig über die Altersgrenze im Bundesland informieren",
      "Gesundheitliche Vorsorge ernst nehmen",
      "Alle Fristen und Termine dokumentieren",
      "Beurteilungen während der Probezeit sammeln",
    ],
    checklist: [
      "2. Staatsexamen bestanden",
      "Amtsärztliche Untersuchung terminiert",
      "Führungszeugnis beantragt",
      "Beihilfeberechtigung geprüft",
      "PKV abgeschlossen oder geplant",
    ],
  },
  {
    id: "beihilfe",
    icon: "Heart",
    title: "Beihilfe einfach erklärt",
    description: "Was ist Beihilfe, wie funktioniert sie und wer hat Anspruch?",
    intro: "Die Beihilfe ist ein zentraler Vorteil der Verbeamtung. Der Dienstherr übernimmt einen Anteil deiner Krankheitskosten – den Rest deckst du über eine private Krankenversicherung ab.",
    sections: [
      { heading: "Was ist Beihilfe?", content: "Beihilfe ist eine finanzielle Unterstützung des Dienstherrn für Krankheitskosten. Sie deckt je nach Situation 50-80% der Kosten. Den Rest deckst du über eine Restkostenversicherung (PKV)." },
      { heading: "Beihilfesätze", content: "Ledige Beamte erhalten 50%, verheiratete 50% (Ehepartner 70%), mit Kindern steigt der Satz auf bis zu 80% für Kinder. Die genauen Sätze variieren nach Bundesland." },
      { heading: "Was wird erstattet?", content: "Arztbesuche, Medikamente, Krankenhausaufenthalte, Zahnbehandlungen, Heilmittel und vieles mehr. Die genauen Leistungen sind in der Beihilfeverordnung geregelt." },
      { heading: "Antragstellung", content: "Beihilfeanträge stellst du bei deiner zuständigen Beihilfestelle. Sammle alle Rechnungen und reiche sie gesammelt ein. Die Bearbeitung dauert meist 2-4 Wochen." },
    ],
    tips: [
      "Rechnungen immer zeitnah einreichen",
      "Beihilfevorschriften deines Bundeslandes kennen",
      "PKV-Tarif auf Beihilfe abstimmen",
      "Familienplanung bei Tarifwahl berücksichtigen",
    ],
  },
  {
    id: "referendariat-tipps",
    icon: "GraduationCap",
    title: "Referendariat Tipps",
    description: "Praktische Tipps und Erfahrungen für den Vorbereitungsdienst.",
    intro: "Das Referendariat ist intensiv, aber machbar. Mit der richtigen Vorbereitung und Organisation kannst du diese Phase erfolgreich meistern.",
    sections: [
      { heading: "Vorbereitung", content: "Informiere dich vorab über dein Seminar, die Schule und die Erwartungen. Bereite grundlegende Unterrichtsmaterialien vor und lege ein Organisationssystem an." },
      { heading: "Unterrichtsbesuche meistern", content: "Plane Unterrichtsbesuche sorgfältig. Erstelle klare Stundenentwürfe, formuliere Lernziele und bereite Reflexionen vor. Feedback ist eine Chance zum Wachsen." },
      { heading: "Work-Life-Balance", content: "Setze dir klare Grenzen. Plane feste Arbeitszeiten und Erholungsphasen. Perfektionismus ist der größte Feind – ‚gut genug' ist oft wirklich gut genug." },
      { heading: "Prüfungsvorbereitung", content: "Beginne früh mit der Vorbereitung auf Lehrproben und mündliche Prüfungen. Übe mit Kolleg:innen und nutze Feedback konstruktiv." },
    ],
    tips: [
      "Netzwerk mit anderen Referendaren aufbauen",
      "Frühzeitig Routinen für Unterrichtsplanung entwickeln",
      "Feedback aktiv einfordern und reflektieren",
      "Gesundheit und Erholung priorisieren",
    ],
    checklist: [
      "Seminarort und Schule bekannt",
      "Grundausstattung Unterrichtsmaterial",
      "Organisationssystem eingerichtet",
      "Mentor:in kennengelernt",
      "Prüfungstermine notiert",
    ],
  },
  {
    id: "berufseinstieg",
    icon: "Briefcase",
    title: "Berufseinstieg im Schulalltag",
    description: "So gelingt der Start als Lehrkraft.",
    intro: "Der Übergang vom Referendariat in den eigenverantwortlichen Schulalltag bringt neue Herausforderungen. Hier findest du Orientierung für die ersten Wochen und Monate.",
    sections: [
      { heading: "Die ersten Wochen", content: "Lerne das Kollegium kennen, verschaffe dir einen Überblick über Schulregeln und -kultur. Nimm dir Zeit zum Ankommen, bevor du alles optimieren willst." },
      { heading: "Unterricht organisieren", content: "Entwickle dein eigenes System für Unterrichtsplanung, Materialverwaltung und Notendokumentation. Digitale Tools können hier enorm helfen." },
      { heading: "Elternarbeit", content: "Kommunikation mit Eltern ist ein wichtiger Teil des Berufs. Sei proaktiv, transparent und professionell. Dokumentiere wichtige Gespräche." },
      { heading: "Selbstfürsorge", content: "Der Lehrerberuf ist anspruchsvoll. Achte auf Grenzen, pflege Hobbys und suche bei Bedarf Unterstützung – das ist kein Zeichen von Schwäche." },
    ],
    tips: [
      "Nicht alles auf einmal ändern wollen",
      "Kollegiale Unterstützung suchen",
      "Klare Routinen für den Schulalltag",
      "Regelmäßig reflektieren und anpassen",
    ],
  },
  {
    id: "pkv",
    icon: "Stethoscope",
    title: "PKV Vorbereitung",
    description: "Gesundheitsfragen, Anbieterwahl und worauf du achten solltest.",
    intro: "Als Beamter bist du beihilfeberechtigt und kannst dich privat krankenversichern. Die Wahl der richtigen PKV ist eine der wichtigsten finanziellen Entscheidungen.",
    sections: [
      { heading: "Warum PKV als Beamter?", content: "Durch die Beihilfe zahlst du nur für den Restkosten-Anteil (meist 50%). Das macht die PKV oft deutlich günstiger als die GKV. Die Leistungen sind zudem umfangreicher." },
      { heading: "Gesundheitsfragen", content: "Vor Abschluss einer PKV musst du Gesundheitsfragen beantworten. Sei dabei absolut ehrlich – Falschangaben können zur Kündigung führen. Kläre Vorerkrankungen vorab." },
      { heading: "Tarifwahl", content: "Achte auf: Selbstbeteiligung, Leistungsumfang, Beitragsrückerstattung, Beitragsstabilität und Openings für den Öffnungstarif bei Vorerkrankungen." },
      { heading: "Zeitpunkt", content: "Am besten versicherst du dich so früh wie möglich – idealerweise zu Beginn des Referendariats. Je jünger und gesünder, desto günstiger der Beitrag." },
    ],
    tips: [
      "Gesundheitsfragen immer ehrlich beantworten",
      "Mehrere Anbieter vergleichen",
      "Auf Beitragsstabilität achten, nicht nur auf den Einstiegspreis",
      "Beihilfeergänzungstarif prüfen",
    ],
  },
  {
    id: "dienstunfaehigkeit",
    icon: "ShieldAlert",
    title: "Dienstunfähigkeit verstehen",
    description: "Was passiert bei Dienstunfähigkeit und wie schützt du dich?",
    intro: "Dienstunfähigkeit bedeutet, dass du deinen Beruf als Beamter aus gesundheitlichen Gründen nicht mehr ausüben kannst. Eine Absicherung ist besonders für Lehrkräfte wichtig.",
    sections: [
      { heading: "Was ist Dienstunfähigkeit?", content: "Anders als bei der Berufsunfähigkeit (Angestellte) gelten für Beamte besondere Regeln. Der Dienstherr entscheidet, ob du dienstunfähig bist – nicht der Versicherer." },
      { heading: "Warum ist das wichtig?", content: "Lehrkräfte haben ein erhöhtes Risiko für psychische Erkrankungen und Burnout. Ohne Absicherung droht eine erhebliche Versorgungslücke." },
      { heading: "Die richtige Absicherung", content: "Eine Dienstunfähigkeitsversicherung (DU) zahlt eine monatliche Rente, wenn du dienstunfähig wirst. Achte auf eine echte DU-Klausel, nicht nur BU." },
      { heading: "Worauf achten?", content: "Wichtig: echte Dienstunfähigkeitsklausel, Nachversicherungsgarantie, Verzicht auf abstrakte Verweisung, ausreichende Rentenhöhe." },
    ],
    tips: [
      "Frühzeitig abschließen – je gesünder, desto besser die Konditionen",
      "Auf echte DU-Klausel achten",
      "Versorgungslücke berechnen lassen",
      "Regelmäßig Versicherungsschutz prüfen",
    ],
  },
  {
    id: "alltag-organisation",
    icon: "CalendarCheck",
    title: "Lehrer-Alltag & Organisation",
    description: "Strukturen, Routinen und Tools für den Schulalltag.",
    intro: "Gute Organisation ist der Schlüssel zu einem entspannten Lehreralltag. Mit den richtigen Strukturen gewinnst du Zeit und reduzierst Stress.",
    sections: [
      { heading: "Wochenplanung", content: "Plane am Sonntag deine Woche vor: Unterricht, Korrekturen, Elterngespräche, eigene Termine. Eine klare Struktur gibt Sicherheit." },
      { heading: "Unterrichtsvorbereitung", content: "Entwickle ein System für deine Materialien. Digitale Ordnerstrukturen, Vorlagen und Bausteine sparen Zeit bei der Vorbereitung." },
      { heading: "Notenverwaltung", content: "Führe Noten konsequent und zeitnah. Digitale Tools helfen bei der Übersicht und Berechnung von Durchschnitten." },
      { heading: "Selbstorganisation", content: "To-do-Listen, Kalendersysteme und klare Prioritäten helfen, den Überblick zu behalten. Finde das System, das für dich funktioniert." },
    ],
    tips: [
      "Feste Zeiten für Korrekturen einplanen",
      "Materialien digital und strukturiert ablegen",
      "Elterngespräche dokumentieren",
      "Regelmäßige Pausen und Erholung einplanen",
    ],
  },
  {
    id: "elternabend",
    icon: "Users",
    title: "Elternabend vorbereiten",
    description: "Tipps und Checklisten für erfolgreiche Elternabende.",
    intro: "Elternabende können herausfordernd sein, aber mit guter Vorbereitung werden sie zu einer produktiven Veranstaltung für alle Beteiligten.",
    sections: [
      { heading: "Vorbereitung", content: "Erstelle eine klare Agenda, reserviere den Raum, bereite Unterlagen vor und informiere Eltern rechtzeitig über den Termin." },
      { heading: "Durchführung", content: "Begrüße die Eltern freundlich, stelle die Agenda vor, halte dich an den Zeitplan. Sei offen für Fragen, aber lenke zurück zum Thema." },
      { heading: "Schwierige Situationen", content: "Einzelfallgespräche gehören nicht in den Elternabend. Biete separate Termine an. Bleibe sachlich und professionell." },
      { heading: "Nachbereitung", content: "Dokumentiere Ergebnisse und To-dos. Informiere abwesende Eltern. Setze besprochene Maßnahmen zeitnah um." },
    ],
    tips: [
      "Agenda vorher an Eltern schicken",
      "Zeitlimit pro Punkt setzen",
      "Positives hervorheben, nicht nur Probleme",
      "Protokoll führen und verteilen",
    ],
    checklist: [
      "Einladung verschickt",
      "Raum reserviert",
      "Agenda erstellt",
      "Unterlagen vorbereitet",
      "Technik geprüft",
      "Nachbereitung geplant",
    ],
  },
  {
    id: "klassenfuehrung",
    icon: "Users",
    title: "Klassenführung",
    description: "Strategien für ein gutes Klassenklima.",
    intro: "Gute Klassenführung ist die Basis für erfolgreichen Unterricht. Sie schafft ein positives Lernklima und ermöglicht effektives Lernen.",
    sections: [
      { heading: "Regeln und Routinen", content: "Klare Regeln geben Orientierung. Etabliere sie gemeinsam mit der Klasse und setze sie konsequent um. Routinen entlasten alle." },
      { heading: "Beziehungsarbeit", content: "Lerne deine Schüler:innen kennen. Zeige echtes Interesse, sei fair und respektvoll. Eine gute Beziehung ist die beste Prävention." },
      { heading: "Umgang mit Störungen", content: "Reagiere ruhig und konsequent. Nutze nonverbale Signale, bevor du verbal eingreifst. Eskaliere schrittweise." },
      { heading: "Feedback", content: "Gib regelmäßig konstruktives Feedback – nicht nur bei Noten. Lob und Anerkennung motivieren mehr als Kritik." },
    ],
    tips: [
      "Konsequenz ist wichtiger als Strenge",
      "Humor hilft – nimm dich selbst nicht zu ernst",
      "Jeder Schüler verdient eine Chance",
      "Reflektiere regelmäßig dein eigenes Verhalten",
    ],
  },
  {
    id: "unterrichtsplanung",
    icon: "BookOpen",
    title: "Unterrichtsplanung",
    description: "Effiziente Strategien für die Unterrichtsvorbereitung.",
    intro: "Gute Unterrichtsplanung ist effizient und zielgerichtet. Hier findest du bewährte Strategien, die dir Zeit sparen und die Qualität steigern.",
    sections: [
      { heading: "Lernziele definieren", content: "Was sollen die Schüler am Ende der Stunde können? Formuliere klare, überprüfbare Lernziele als Ausgangspunkt deiner Planung." },
      { heading: "Methodenvielfalt", content: "Wechsle zwischen Einzel-, Partner- und Gruppenarbeit. Nutze verschiedene Medien und aktivierende Methoden." },
      { heading: "Differenzierung", content: "Biete verschiedene Schwierigkeitsstufen an. Zusatzaufgaben für Schnelle, Hilfestellungen für Schwächere." },
      { heading: "Material organisieren", content: "Erstelle wiederverwendbare Bausteine und Vorlagen. Teile Materialien mit Kolleg:innen und baue eine Sammlung auf." },
    ],
    tips: [
      "Weniger ist mehr – nicht jede Stunde muss ein Feuerwerk sein",
      "Bausteine wiederverwenden spart Zeit",
      "Schüleraktivierung vor Lehrervortrag",
      "Puffer einplanen für unvorhergesehenes",
    ],
  },
  {
    id: "amtsarzt",
    icon: "Stethoscope",
    title: "Amtsärztliche Untersuchung",
    description: "Was dich erwartet und wie du dich vorbereitest.",
    intro: "Die amtsärztliche Untersuchung ist Voraussetzung für die Verbeamtung. Sie prüft deine gesundheitliche Eignung für den Beamtendienst.",
    sections: [
      { heading: "Was wird untersucht?", content: "Allgemeiner Gesundheitszustand, Blutdruck, BMI, Seh- und Hörtest, psychische Gesundheit. Je nach Bundesland variiert der Umfang." },
      { heading: "Vorbereitung", content: "Sammle alle relevanten Befunde und Arztberichte. Sei ehrlich bei der Anamnese. Vorerkrankungen müssen angegeben werden." },
      { heading: "Ablauf", content: "Fragebogen ausfüllen, ärztliches Gespräch, körperliche Untersuchung. Ergebnis wird dem Dienstherrn mitgeteilt." },
      { heading: "Bei Vorerkrankungen", content: "Vorerkrankungen führen nicht automatisch zur Ablehnung. Wichtig ist die Prognose. Hole ggf. vorab ein Gutachten ein." },
    ],
    tips: [
      "Alle Befunde und Atteste mitbringen",
      "Ehrlich antworten – Verschweigen hat Konsequenzen",
      "Bei Vorerkrankungen vorab beraten lassen",
      "Entspannt bleiben – die meisten bestehen",
    ],
  },
  {
    id: "stress-selbstorganisation",
    icon: "Brain",
    title: "Stress & Selbstorganisation",
    description: "Strategien gegen Stress im Lehreralltag.",
    intro: "Lehrkräfte gehören zu den am stärksten belasteten Berufsgruppen. Gute Selbstorganisation und Stressbewältigung sind essentiell für eine lange, gesunde Karriere.",
    sections: [
      { heading: "Stressquellen erkennen", content: "Identifiziere deine persönlichen Belastungen: Korrekturdruck, Elternkontakte, Lärm, Zeitdruck? Nur wer die Ursachen kennt, kann gegensteuern." },
      { heading: "Grenzen setzen", content: "Lerne ‚Nein' zu sagen. Du musst nicht jede Aufgabe übernehmen. Klare Arbeitszeiten und handyfreie Zeiten schützen deine Erholung." },
      { heading: "Routinen aufbauen", content: "Feste Abläufe für Unterrichtsvor- und -nachbereitung reduzieren Entscheidungsstress. Plane auch Pausen aktiv ein." },
      { heading: "Hilfe suchen", content: "Kollegiale Beratung, Supervision oder professionelle Hilfe sind Zeichen von Stärke. Nutze Angebote deiner Schule oder des Dienstherrn." },
    ],
    tips: [
      "Regelmäßig Sport treiben",
      "Perfektionismus ablegen",
      "Soziale Kontakte außerhalb der Schule pflegen",
      "Professionelle Hilfe bei Bedarf nutzen",
    ],
  },
];

export const WISSEN_RESOURCES = [
  { id: "ref-checklist", icon: "ClipboardList", title: "Referendariat Checkliste", description: "Alle wichtigen Schritte für den Vorbereitungsdienst." },
  { id: "verb-checklist", icon: "ShieldCheck", title: "Verbeamtung Checkliste", description: "Was du für die Verbeamtung vorbereiten musst." },
  { id: "pkv-prep", icon: "Stethoscope", title: "PKV Vorbereitung", description: "Gesundheitsfragen und Vorbereitung für die Versicherung." },
  { id: "wochenplan", icon: "CalendarCheck", title: "Lehrer Wochenplan Vorlage", description: "Strukturiere deine Unterrichtswoche." },
  { id: "unterricht-tipps", icon: "FileText", title: "Unterricht Organisation Tipps", description: "Praktische Vorlagen für die Unterrichtsplanung." },
  { id: "elternabend-prep", icon: "Users", title: "Elternabend Vorbereitung", description: "Checkliste und Tipps für erfolgreiche Elternabende." },
];
