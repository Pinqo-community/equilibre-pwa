import PWABadge from "./pwa/PWABadge.tsx";
import MoodForm from "./components/MoodForm/MoodForm.tsx";

function App() {
  return (
    <>
      <h1>Equilibre</h1>

      <main className="p-4">
        <MoodForm />
      </main>

      <PWABadge />
    </>
  );
}

export default App;
