import PWABadge from "./PWABadge.tsx";

function App() {
  /* différents states: 
    [moodDescription] -> string (description texte de la note)
    [moodRate] -> number (note sur /5 ou /10)
    [selectedMood] -> Mood | null (mood selectionné, pour edit)
    [moods] -> liste des moods fetch
  */

  /* useEffect : Fetch les moods au mount du composant 
    (await fetchMoodsFromDb() et update de [moods])
   */

  /* addMood(event) crée un newMood à stocker dans pouch au submit du form
    try await addMoodToDb(newMood) puis update du state et reset des champs du form
    */

  /* deleteMood(id) supprime un mood de la db au clic delete de la note voulue 
      await softDeleteMoodFromDb() ou fullDeleteMoodFromDb() (cf ./pouchdbService.ts)
      puis retirer les notes supprimées du state
    */

  /* updateMood(event) modifie un mood dans pouch au submit du form (si [selectedNote] n'est pas null) 
    await updateMoodInDb(), met à jour le state & reset le form */

  return (
    <>
      <h1 className="text-4xl font-bold">Equilibre</h1>
      {/* Form */}
      {/* h2 select a mood */}
      {/* Moods récents */}
      {/* <a href=""></a> */}
      {/* <img src="" /> */}
      <PWABadge />
    </>
  );
}

export default App;
