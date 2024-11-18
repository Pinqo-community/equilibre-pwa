import MoodChart from "./components/MoodChart/MoodChart.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";
import PWABadge from "./pwa/PWABadge.tsx";
import EncryptionDemo from "./components/EncryptionDemo.tsx";

function App() {
  return (
    <>
      <h1>Equilibre</h1>

      <main className="p-4">
        <EncryptionDemo />
        <MoodForm />
        <MoodChart />
      </main>

      <PWABadge />
    </>
  );
}

export default App;
