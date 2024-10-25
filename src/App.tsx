import PWABadge from "./pwa/PWABadge.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";

import {
  checkIfDEKExists,
  decryptUserData,
  encryptUserData,
  initializeEncryption,
} from "./common/utils/encryption/encryptionServices.ts";

async function test() {
  try {
    //alert("test");
    if (!(await checkIfDEKExists())) {
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

      <main>
        <MoodForm />
      </main>

      <PWABadge />
    </>
  );
}

export default App;
