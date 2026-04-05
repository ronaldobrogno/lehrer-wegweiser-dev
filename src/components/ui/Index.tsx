import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getProfile } from "@/lib/storage";
import Onboarding from "./Onboarding";
import StartPage from "./StartPage";
import MeinWegPage from "./MeinWegPage";
import OrganisationPage from "./OrganisationPage";
import WissenPage from "./WissenPage";
import ProfilPage from "./ProfilPage";
import AppShell from "@/components/AppShell";

export default function Index() {
  const [hasProfile, setHasProfile] = useState(!!getProfile());

  if (!hasProfile) {
    return <Onboarding onComplete={() => setHasProfile(true)} />;
  }

  return (
    <AppShell>
      <Routes>
        <Route index element={<StartPage />} />
        <Route path="mein-weg" element={<MeinWegPage />} />
        <Route path="organisation" element={<OrganisationPage />} />
        <Route path="wissen" element={<WissenPage />} />
        <Route path="profil" element={<ProfilPage onReset={() => setHasProfile(false)} />} />
      </Routes>
    </AppShell>
  );
}
