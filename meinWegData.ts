export interface WegStep {
  id: string;
  icon: string;
  title: string;
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
    icon: "GraduationCap",
    title: "Lehramtsstudium",
    description: "Bachelor und Master of Education – der Grundstein für deine Karriere als Lehrkraft.",
    relevantFor: ["Student"],
    details: {
      meaning: "Das Lehramtsstudium umfasst in der Regel ein Bachelor- und ein Masterstudium (oder Staatsexamen). Du studierst deine Unterrichtsfächer und Bildungswissenschaften.",
      importance: "Das Studium legt die fachliche und pädagogische Grundlage für deinen gesamten Berufsweg. Gute Noten können die Einstellungschancen verbessern.",
      considerations: "Wähle deine Fächer strategisch – manche Fächerkombinationen haben bessere Einstellungschancen. Nutze Praxisphasen aktiv.",
      faq: [
        { q: "Wie lange dauert das Studium?", a: "In der Regel 5 Jahre (3 Jahre Bachelor + 2 Jahre Master), je nach Bundesland und Schulform." },
        { q: "Kann ich das Bundesland wechseln?", a: "Ja, aber die Anerkennung von Abschlüssen variiert. Informiere dich frühzeitig." },
      ],
      checklist: [
        "Fächer gewählt",
        "Praxisphasen absolviert",
        "Bachelorarbeit geplant",
        "Über Referendariat informiert",
      ],
    },
  },
  {
    id: "praxisphasen",
    icon: "BookOpen",
    title: "Praxissemester / Praxisphasen",
    description: "Erste Unterrichtserfahrung sammeln und den Schulalltag kennenlernen.",
    relevantFor: ["Student"],
    details: {
      meaning: "Praxisphasen sind verpflichtende Schulpraktika während des Studiums. Du hospitierst, planst eigenen Unterricht und sammelst erste Erfahrungen.",
      importance: "Hier merkst du, ob der Lehrerberuf wirklich zu dir passt. Du knüpfst Kontakte und sammelst wichtige Erfahrungen für das Referendariat.",
      considerations: "Nutze die Zeit aktiv, frage viel, probiere verschiedene Methoden aus. Feedback ist in dieser Phase besonders wertvoll.",
      faq: [
        { q: "Wie finde ich eine Praktikumsschule?", a: "Meist über die Universität oder eigenständige Bewerbung. Frühzeitig kümmern!" },
      ],
    },
  },
  {
    id: "staatsexamen",
    icon: "Award",
    title: "Master / Staatsexamen",
    description: "Der akademische Abschluss als Voraussetzung für das Referendariat.",
    relevantFor: ["Student"],
    details: {
      meaning: "Je nach Bundesland schließt du mit dem Master of Education oder dem 1. Staatsexamen ab. Dieser Abschluss berechtigt zum Eintritt in das Referendariat.",
      importance: "Die Note kann für die Einstellung relevant sein. Ein guter Abschluss verbessert deine Chancen auf die Wunschschule.",
      considerations: "Plane die Prüfungsphase sorgfältig. Informiere dich parallel über Bewerbungsfristen für das Referendariat.",
      faq: [
        { q: "Master oder Staatsexamen?", a: "Das hängt vom Bundesland ab. In manchen Ländern gibt es noch das klassische Staatsexamen, in anderen den Master of Education." },
      ],
    },
  },
  {
    id: "bewerbung-ref",
    icon: "FileText",
    title: "Bewerbung fürs Referendariat",
    description: "Fristen, Unterlagen und Bewerbungsverfahren für den Vorbereitungsdienst.",
    relevantFor: ["Student"],
    details: {
      meaning: "Die Bewerbung für das Referendariat erfolgt beim Kultusministerium oder Landesprüfungsamt. Du gibst Schulwünsche und Seminarpräferenzen an.",
      importance: "Die Fristen sind streng – verpasst du sie, wartest du ein halbes oder ganzes Jahr. Die Bewerbung entscheidet über Seminar- und Schulzuweisung.",
      considerations: "Bewerbungsfristen variieren stark nach Bundesland. Manche Länder haben nur einen Termin pro Jahr, andere zwei.",
      faq: [
        { q: "Wann muss ich mich bewerben?", a: "Meist 6-9 Monate vor Beginn. Fristen unbedingt beim Kultusministerium prüfen." },
        { q: "Kann ich mir die Schule aussuchen?", a: "Du kannst Wünsche angeben, aber eine Garantie gibt es nicht." },
      ],
      checklist: [
        "Bewerbungsfrist recherchiert",
        "Unterlagen zusammengestellt",
        "Abschlusszeugnis beantragt",
        "Schulwünsche überlegt",
        "Bewerbung abgeschickt",
      ],
    },
  },
  {
    id: "referendariat",
    icon: "BookOpen",
    title: "Referendariat",
    description: "Der Vorbereitungsdienst: Praxiserfahrung sammeln und das 2. Staatsexamen ablegen.",
    relevantFor: ["Student", "Referendar"],
    details: {
      meaning: "Das Referendariat (Vorbereitungsdienst) dauert 12-24 Monate. Du unterrichtest eigenverantwortlich, besuchst Seminare und legst Prüfungen ab.",
      importance: "Das Referendariat ist die intensivste Phase der Lehrerausbildung. Hier wirst du auf den eigenständigen Beruf vorbereitet.",
      considerations: "Zeitmanagement ist entscheidend. Suche dir Unterstützung im Kollegium und bei Mit-Referendaren.",
      faq: [
        { q: "Wie lange dauert das Referendariat?", a: "Je nach Bundesland 12-24 Monate, meist 18 Monate." },
        { q: "Werde ich bezahlt?", a: "Ja, als Beamter auf Widerruf erhältst du Anwärterbezüge." },
      ],
      checklist: [
        "Seminar und Schule kennengelernt",
        "Organisationssystem eingerichtet",
        "Mentor:in gefunden",
        "Prüfungstermine notiert",
        "PKV abgeschlossen",
      ],
    },
  },
  {
    id: "seminar",
    icon: "Building",
    title: "Seminar / Schuleinsatz",
    description: "Ausbildung zwischen Studienseminar und Schule.",
    relevantFor: ["Referendar"],
    details: {
      meaning: "Du pendelst zwischen Seminarsitzungen und Schulpraxis. Im Seminar lernst du Didaktik und Methodik, an der Schule setzt du es um.",
      importance: "Die Seminarausbildung ergänzt die Schulpraxis um theoretische und reflektierte Perspektiven.",
      considerations: "Nutze Seminarsitzungen aktiv. Tausche dich mit anderen Referendaren aus und teile Materialien.",
      faq: [
        { q: "Wie oft habe ich Seminar?", a: "Meist 1-2 Tage pro Woche, variiert nach Bundesland und Phase." },
      ],
    },
  },
  {
    id: "unterrichtsbesuche",
    icon: "Eye",
    title: "Unterrichtsbesuche",
    description: "Beratende Besuche durch Seminarleiter und Fachleiter.",
    relevantFor: ["Referendar"],
    details: {
      meaning: "Unterrichtsbesuche sind Hospitationen durch deine Ausbilder. Sie dienen der Beratung und Beurteilung deines Unterrichts.",
      importance: "Die Bewertungen fließen in die Gesamtnote ein. Nutze sie als Lernchance und Feedback-Gelegenheit.",
      considerations: "Bereite dich gründlich vor, aber bleibe authentisch. Zeige, dass du reflektieren kannst.",
      faq: [
        { q: "Wie viele Unterrichtsbesuche gibt es?", a: "Meist 4-8 pro Fach während des gesamten Referendariats." },
      ],
    },
  },
  {
    id: "lehrproben",
    icon: "Presentation",
    title: "Lehrproben / Prüfungen",
    description: "Die praktischen und mündlichen Prüfungen am Ende des Referendariats.",
    relevantFor: ["Referendar"],
    details: {
      meaning: "Lehrproben sind bewertete Unterrichtsstunden als Teil des 2. Staatsexamens. Dazu kommen mündliche Prüfungen und ggf. eine schriftliche Arbeit.",
      importance: "Die Prüfungsnoten bestimmen maßgeblich deine Einstellungschancen. Eine gute Note öffnet Türen.",
      considerations: "Übe Prüfungsstunden vorher. Achte auf klare Struktur, Lernzielorientierung und Schüleraktivierung.",
      faq: [
        { q: "Kann ich die Prüfung wiederholen?", a: "Ja, in den meisten Bundesländern einmal. Die Bedingungen variieren." },
      ],
    },
  },
  {
    id: "berufseinstieg",
    icon: "Briefcase",
    title: "Berufseinstieg",
    description: "Dein Start als eigenverantwortliche Lehrkraft an der Schule.",
    relevantFor: ["Referendar", "Berufseinstieg"],
    details: {
      meaning: "Nach dem Referendariat beginnst du als vollwertige Lehrkraft. Du unterrichtest eigenverantwortlich und übernimmst Aufgaben in der Schulgemeinschaft.",
      importance: "Die ersten Jahre prägen deinen Berufsstil. Hier entwickelst du Routinen, die dich lange begleiten.",
      considerations: "Nimm dir Zeit zum Ankommen. Suche Unterstützung im Kollegium und baue dein Netzwerk auf.",
      faq: [
        { q: "Werde ich sofort verbeamtet?", a: "In den meisten Bundesländern ja – als Beamter auf Probe. In einigen Ländern gibt es zunächst Angestelltenverhältnisse." },
      ],
    },
  },
  {
    id: "verbeamtung-probe",
    icon: "ShieldCheck",
    title: "Verbeamtung auf Probe",
    description: "Die Probezeit als Beamter – meist 2-3 Jahre.",
    relevantFor: ["Berufseinstieg", "Beamter auf Probe"],
    details: {
      meaning: "Als Beamter auf Probe musst du dich bewähren. Du wirst dienstlich beurteilt und musst die gesundheitliche Eignung nachweisen.",
      importance: "Die Probezeit entscheidet über die Verbeamtung auf Lebenszeit. Gute Beurteilungen sind wichtig.",
      considerations: "Dokumentiere deine Leistungen, halte Fristen ein und bereite die amtsärztliche Untersuchung vor.",
      faq: [
        { q: "Wie lange dauert die Probezeit?", a: "In der Regel 2-3 Jahre, in manchen Bundesländern kann sie verkürzt werden." },
        { q: "Kann die Probezeit verlängert werden?", a: "Ja, z.B. bei Krankheit, Elternzeit oder nicht ausreichenden Leistungen." },
      ],
    },
  },
  {
    id: "verbeamtung-lebenszeit",
    icon: "Award",
    title: "Verbeamtung auf Lebenszeit",
    description: "Das Ziel: dauerhafte Verbeamtung mit allen Rechten und Pflichten.",
    relevantFor: ["Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Nach erfolgreicher Probezeit wirst du auf Lebenszeit verbeamtet. Dies bedeutet besondere Arbeitsplatzsicherheit und Anspruch auf Pension.",
      importance: "Die Verbeamtung auf Lebenszeit ist der höchste Status und bietet maximale Sicherheit und Versorgung.",
      considerations: "Auch nach der Verbeamtung gelten besondere Pflichten: Treuepflicht, Neutralität, Amtsverschwiegenheit.",
      faq: [
        { q: "Kann mir als Beamter auf Lebenszeit gekündigt werden?", a: "Nur in schweren Disziplinarfällen. Die Hürden sind sehr hoch." },
      ],
    },
  },
  {
    id: "amtsarzt",
    icon: "Stethoscope",
    title: "Amtsärztliche Untersuchung",
    description: "Die gesundheitliche Eignungsprüfung vor der Verbeamtung.",
    relevantFor: ["Student", "Referendar", "Berufseinstieg", "Beamter auf Probe"],
    details: {
      meaning: "Der Amtsarzt prüft, ob du gesundheitlich für den Beamtendienst geeignet bist. Die Untersuchung umfasst körperliche und psychische Aspekte.",
      importance: "Ohne positive amtsärztliche Bewertung keine Verbeamtung. Bereite dich vor und sei ehrlich.",
      considerations: "Vorerkrankungen bedeuten nicht automatisch eine Ablehnung. Die Prognose ist entscheidend.",
      faq: [
        { q: "Was wird genau untersucht?", a: "Allgemeiner Gesundheitscheck: Blutdruck, BMI, Seh-/Hörtest, Anamnese, ggf. Laborwerte." },
        { q: "Was passiert bei psychischen Vorerkrankungen?", a: "Sie müssen angegeben werden. Entscheidend ist die aktuelle Prognose und Stabilität." },
      ],
      checklist: [
        "Termin vereinbart",
        "Befunde gesammelt",
        "Impfpass mitgebracht",
        "Medikamentenliste vorbereitet",
        "Brille/Hörgerät mitgebracht",
      ],
    },
  },
  {
    id: "beihilfe",
    icon: "Heart",
    title: "Beihilfe",
    description: "Finanzielle Unterstützung des Dienstherrn bei Krankheitskosten.",
    relevantFor: ["Student", "Referendar", "Berufseinstieg", "Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Der Dienstherr übernimmt 50-80% deiner Krankheitskosten. Den Rest deckst du über eine private Restkostenversicherung.",
      importance: "Beihilfe ist einer der großen finanziellen Vorteile der Verbeamtung und macht die PKV besonders attraktiv.",
      considerations: "Beihilferegeln variieren nach Bundesland. Informiere dich über die Regelungen in deinem Land.",
      faq: [
        { q: "Ab wann habe ich Beihilfeanspruch?", a: "Ab dem ersten Tag als Beamter (auch auf Widerruf im Referendariat)." },
        { q: "Gilt Beihilfe auch für meine Familie?", a: "Ja, Ehepartner und Kinder können mitversorgt werden." },
      ],
    },
  },
  {
    id: "pkv",
    icon: "HeartPulse",
    title: "PKV / Gesundheitsprüfung",
    description: "Private Krankenversicherung und Gesundheitsfragen verstehen.",
    relevantFor: ["Student", "Referendar", "Berufseinstieg", "Beamter auf Probe"],
    details: {
      meaning: "Als Beamter versicherst du dich in der Regel privat. Vor Abschluss beantwortest du Gesundheitsfragen, die deine Konditionen beeinflussen.",
      importance: "Die PKV-Wahl ist eine der wichtigsten finanziellen Entscheidungen. Ein früher Abschluss sichert günstige Konditionen.",
      considerations: "Gesundheitsfragen ehrlich beantworten. Vorerkrankungen nicht verschweigen – Risikozuschläge sind besser als Kündigung.",
      faq: [
        { q: "Muss ich als Beamter in die PKV?", a: "Nein, aber die Kombination Beihilfe + PKV ist meist deutlich günstiger als die GKV." },
      ],
    },
  },
  {
    id: "dienstunfaehigkeit",
    icon: "ShieldAlert",
    title: "Dienstunfähigkeit",
    description: "Absicherung für den Fall, dass du nicht mehr unterrichten kannst.",
    relevantFor: ["Student", "Referendar", "Berufseinstieg", "Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Wenn du aus gesundheitlichen Gründen deinen Dienst nicht mehr ausüben kannst, greift die Dienstunfähigkeitsversicherung.",
      importance: "Lehrkräfte haben ein erhöhtes Risiko – besonders für psychische Erkrankungen. Eine DU-Versicherung schützt vor finanziellen Einbußen.",
      considerations: "Achte auf eine echte Dienstunfähigkeitsklausel, nicht nur Berufsunfähigkeit.",
      faq: [
        { q: "Was ist der Unterschied zwischen BU und DU?", a: "Bei der DU entscheidet der Dienstherr, nicht der Versicherer. Die Klausel muss daher speziell formuliert sein." },
      ],
    },
  },
  {
    id: "elternzeit",
    icon: "Baby",
    title: "Elternzeit / Familie",
    description: "Familienplanung und Elternzeit als Lehrkraft.",
    relevantFor: ["Berufseinstieg", "Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Auch als Beamter hast du Anspruch auf Elternzeit. Die Regelungen unterscheiden sich etwas von denen für Angestellte.",
      importance: "Familienplanung beeinflusst Beihilfesätze, PKV-Tarife und die Probezeit. Plane vorausschauend.",
      considerations: "Elternzeit kann die Probezeit verlängern. Informiere dich frühzeitig über die Auswirkungen.",
      faq: [
        { q: "Wie lange kann ich Elternzeit nehmen?", a: "Bis zu 3 Jahre je Kind, aber Details variieren nach Bundesland." },
      ],
    },
  },
  {
    id: "fortbildungen",
    icon: "Sparkles",
    title: "Fortbildungen",
    description: "Berufliche Weiterentwicklung und Qualifizierung.",
    relevantFor: ["Berufseinstieg", "Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Lehrkräfte sind verpflichtet, sich regelmäßig fortzubilden. Es gibt schulinterne und externe Angebote.",
      importance: "Fortbildungen halten dich fachlich und methodisch auf dem neuesten Stand und können für Beförderungen relevant sein.",
      considerations: "Plane Fortbildungen strategisch – wähle Themen, die deinen Unterricht und deine Karriere voranbringen.",
      faq: [
        { q: "Muss ich mich fortbilden?", a: "Ja, es gibt eine Fortbildungspflicht. Der Umfang variiert nach Bundesland." },
      ],
    },
  },
  {
    id: "schulwechsel",
    icon: "ArrowRightLeft",
    title: "Schulwechsel / Bundeslandwechsel",
    description: "Was bei einem Wechsel der Schule oder des Bundeslandes zu beachten ist.",
    relevantFor: ["Beamter auf Probe", "Beamter auf Lebenszeit"],
    details: {
      meaning: "Ein Schulwechsel innerhalb des Bundeslandes ist per Versetzungsantrag möglich. Ein Bundeslandwechsel erfordert Freigabe und Übernahme.",
      importance: "Ein Wechsel kann Karriere und Privatleben positiv beeinflussen, erfordert aber gute Planung.",
      considerations: "Bundeslandwechsel können kompliziert sein. Fristen beachten und frühzeitig Kontakt aufnehmen.",
      faq: [
        { q: "Wie funktioniert ein Bundeslandwechsel?", a: "Über ein Lehreraustauschverfahren oder Freigabe/Übernahme zwischen den Ländern." },
      ],
    },
  },
];
