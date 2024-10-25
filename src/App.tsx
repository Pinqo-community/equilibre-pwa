import PWABadge from "./pwa/PWABadge.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";
import OnboardingForm from "./components/Onboarding/OnboardingForm.tsx";
import { useState, useEffect } from "react";
import db from "./db.ts";

function App() {
  const [onboardingCompleted, setOnboardingCompleted] = useState(false);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const doc = await db.get("onboarding");
        setOnboardingCompleted(!!doc);
      } catch (err: any) {
        if (err.status === 404) {
          setOnboardingCompleted(false);
        }
      }
    };
    checkOnboardingStatus();
  }, []);
  return (
    <>
      <h1>Equilibre</h1>

      <main>
        {onboardingCompleted ? (
          <MoodForm />
        ) : (
          <OnboardingForm
            setOnboardingCompleted={setOnboardingCompleted}
            onboardingCompleted={onboardingCompleted}
          />
        )}
      </main>

      <PWABadge />
    </>
  );
}

export default App;
