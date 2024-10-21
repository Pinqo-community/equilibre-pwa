import PouchDB from "pouchdb";
import { Mood } from "./types";

const moods_db = new PouchDB<Mood>("equilibre_db", {
  auto_compaction: true,
  //TODO: check adapter https://pouchdb.com/api.html#adapter et https://pouchdb.com/api.html#purge
});

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
    console.error("Error fetching moods from PouchDB: ", err);
    return [];
  }
};

// fetchMoodById
// db.get('id') + possibilité d'utiliser pouch-find, ajouter pagination, indexation etc

// Soft-delete. Pour du full delete utiliser purge: https://pouchdb.com/api.html#purge
/* "Purge permanently removes data from the database. Normal deletion with db.remove() does not, 
it only marks the document as _deleted=true and creates a new revision."" */
export const softDeleteMood = async (id: string) => {
  try {
    const mood = await moods_db.get(id);

    // Attribue le flag _deleted:true. "Soft delete"
    await moods_db.remove(mood);
  } catch (err) {
    console.error("Error soft deleting mood from PouchDB: ", err);
  }
};

export const updateMood = async (mood: Mood): Promise<Mood> => {
  try {
    // Récupere le mood à modifier avec son _id existant
    const moodToUpdate = await moods_db.get(mood._id);

    // Garde l'_id & le _rev existants, met à jour la note
    // en partant du principe que l'utilisateur n'edit que la note ajoutée à son mood pour l'instant
    const updatedMood = { ...moodToUpdate, note: mood.note };

    // Met à jour le mood dans Pouch db
    const result = await moods_db.put(updatedMood);

    // Retourne la note avec le nouveau _rev
    return { ...updatedMood, _rev: result.rev };
  } catch (err) {
    console.error("Error updating note: ", err);
    throw err;
  }
};

export const deleteDbFromDevice = async () => {
  await moods_db.destroy();
};

// Todo: fullDeleteMoodFromDb() ou purgeMoodFromDb()
/* 
export const purgeMoodFromDb = async (id: string) => {
try {
  const moodToPurge = await moods_db.get(id);
  await moods_db.purge(moodToPurge, moodToPurge._rev); // TODO: pas conseillé (uniquement en cas de leak bancaire ou autre) check comment ça marche https://pouchdb.com/api.html#purge (et adapter)
} catch (err) {
  console.error("Error purging mood from PouchDB: ", err);
}
}; 
*/
