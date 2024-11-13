import MoodChart from "./components/MoodChart/MoodChart.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";
import PWABadge from "./pwa/PWABadge.tsx";

import {
  decryptUserData,
  encryptUserData,
  initializeEncryption,
  isDEKExists,
} from "./common/utils/encryption/encryptionServices.ts";

async function test() {
  try {
    //alert("test");
    if (!(await isDEKExists())) {
      const password =
        prompt("Entrez votre mot de passe pour sécuriser vos données :") ||
        "test";

      console.log("password", password);

      await initializeEncryption(password);

      const userData = "données sensibles";
      const encrypted = await encryptUserData(userData);
      console.log("Données chiffrées:", encrypted);

      const decrypted = await decryptUserData(encrypted);
      console.log("Données déchiffrées:", decrypted);
    }
  } catch (e) {
    console.error(e);
  }
}

await test();

function App() {
  return (
    <>
      <h1>Equilibre</h1>

      <main className="p-4">
        <MoodForm />
        <MoodChart />
      </main>

      <PWABadge />
    </>
  );
}

export default App;
