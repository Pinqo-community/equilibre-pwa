import PouchDB from "pouchdb";
import { Mood } from "./types";

const moods_db = new PouchDB<Mood>("moods_db", { auto_compaction: true });

/* 'By default, PouchDB and CouchDB are designed to store all document revisions forever. (...) However, if you allow 
your database to grow without bounds, it can end up taking up much more space than you need.  This can especially 
be a problem in browsers with storage quotas'.

auto-compaction:true 'compacte' automatiquement la db (ne sauvegarde pas tous les changements de chaque document).
La propriété est attribuée à la CREATION de la db. 
*/

export const addMood = async (mood: Mood): Promise<Mood> => {
  try {
    const response = await moods_db.put({ ...mood, _id: mood.createdAt });
    console.log("Mood posted!", response);
    return { ...mood, _rev: response.rev };
  } catch (err) {
    console.error("Error posting mood to PouchDB", err);
    throw err;
  }
};

export const fetchMoods = async (): Promise<Mood[]> => {
  try {
    // descending? : trie les notes dans l'ordre descendant si voulu
    /* Pour fetch un certain nombre de moods (par exemple 5), possibilité d'ajouter limit:5 */
    const allMoods = await moods_db.allDocs({
      include_docs: true,
      descending: true,
    });
    return allMoods.rows.map((row) => row.doc) as Mood[];
  } catch (err) {
    console.error("Error fetching moods from PouchDB", err);
    return [];
  }
};

// Soft-delete. Pour du full delete utiliser purge: https://pouchdb.com/api.html#purge
/* "Purge permanently removes data from the database. Normal deletion with db.remove() does not, 
it only marks the document as _deleted=true and creates a new revision."" */
export const softDeleteMood = async (id: string) => {
  try {
    const mood = await moods_db.get(id);

    // Attribue le flag _deleted:true. "Soft delete"
    await moods_db.remove(mood);
  } catch (err: any) {
    // séparation de la 404, peut être retiré.
    err.status === 404
      ? console.warn(`Mood with id ${id} not found.`)
      : console.error("Error soft deleting mood from PouchDB", err);
  }
};

export const updateMood = async (mood: Mood): Promise<Mood> => {
  try {
    // Récupere le mood à modifier avec son _id existant
    const moodToUpdate = await moods_db.get(mood._id);

    // Garde l'_id & le _rev existants, met à jour la description
    // en partant du principe que l'utilisateur n'edit que la note ajoutée à son mood pour l'instant
    const updatedMood = { ...moodToUpdate, description: mood.description };

    // Met à jour le mood dans Pouch db
    const result = await moods_db.put(updatedMood);

    // Retourne la note avec le nouveau _rev
    return { ...updatedMood, _rev: result.rev };
  } catch (err: any) {
    // séparation de la 404, peut être retiré.
    err.status === 404
      ? console.warn(`Mood with id ${mood._id} not found.`)
      : console.error("Error updating note:", err);
    throw err;
  }
};

// Todo: fullDeleteMoodFromDb() ou purgeMoodFromDb()
// Todo: deleteDbFromDevice()
export const deleteDbFromDevice = async () => {
  await moods_db.destroy();
};
