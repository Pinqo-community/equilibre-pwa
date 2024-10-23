import { useState, useEffect } from "react";

import { Mood } from "../types/Mood";
import db from "../db";

// might need to create a usePouchDb hook as well/instead. not needed atm

const useMoods = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  // manage loading state
  useEffect(() => {
    fetchMoods();
  }, []);

  const addMood = async (mood: Mood): Promise<Mood | undefined> => {
    try {
      const response = await db.put({ ...mood, _id: mood.createdAt });
      console.log("Mood posted!", response);
      const newMood = { ...mood, _rev: response.rev };
      setMoods((prevMoods) => [newMood, ...prevMoods]);
      return newMood;
    } catch (err) {
      console.error("Error posting mood to PouchDB", err);
      throw err;
    }
  };

  const fetchMoods = async (): Promise<void> => {
    try {
      // descending? : trie les notes dans l'ordre descendant si voulu
      /* Pour fetch un certain nombre de moods (par exemple 5), possibilité d'ajouter limit:5 */
      const allMoods = await db.allDocs({
        include_docs: true,
        descending: true,
      });
      const fetchedMoods = allMoods.rows.map((row) => row.doc) as Mood[];
      setMoods(fetchedMoods);
    } catch (err) {
      console.error("Error fetching moods from PouchDB: ", err);
      setMoods([]);
    }
  };

  const updateMood = async (mood: Mood): Promise<Mood | undefined> => {
    try {
      const moodToUpdate = (await db.get(mood._id)) as Mood;

      // Garde l'_id & le _rev existants, met à jour la note
      // en partant du principe que l'utilisateur n'edit que la note ajoutée à son mood pour l'instant
      const updatedMood = { ...moodToUpdate, note: mood.note };
      const result = await db.put(updatedMood);

      // Retourne la note avec le nouveau _rev
      const newMood = { ...updatedMood, _rev: result.rev };
      setMoods((prevMoods) =>
        prevMoods.map((m) => (m._id === newMood._id ? newMood : m)),
      );
      return newMood;
    } catch (err) {
      console.error("Error updating mood:", err);
      throw err;
    }
  };

  // Soft-delete. Pour du full delete utiliser purge: https://pouchdb.com/api.html#purge
  /* "Purge permanently removes data from the database. Normal deletion with db.remove() does not, 
    it only marks the document as _deleted=true and creates a new revision."" */
  const softDeleteMood = async (id: string): Promise<void> => {
    try {
      const mood = await db.get(id);
      await db.remove(mood);
      setMoods((prevMoods) => prevMoods.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error soft deleting mood from PouchDB:", err);
    }
  };

  // TODO fetchMoodById?
  // db.get('id') + possibilité d'utiliser pouch-find, ajouter pagination, indexation etc

  // Todo: fullDeleteMoodFromDb() ou purgeMoodFromDb()
  /* 
export const purgeMoodFromDb = async (id: string) => {
try {
  const moodToPurge = await db.get(id);
  await db.purge(moodToPurge, moodToPurge._rev); // TODO: pas conseillé (uniquement en cas de leak bancaire ou autre) check comment ça marche https://pouchdb.com/api.html#purge (et adapter)
} catch (err) {
  console.error("Error purging mood from PouchDB: ", err);
}
}; 
*/

  return {
    moods,
    addMood,
    fetchMoods,
    updateMood,
    softDeleteMood,
  };
};

export default useMoods;
