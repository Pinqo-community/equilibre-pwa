import { useState } from "react";
import db from "../constants/dbConstants";

// Define a type alias for the constraint
type PouchDbDocument = {
  _id: string;
  _rev?: string;
};

// Define the usePouchdb Hook with a generic type T that extends PouchDbDocument
const usePouchDb = <T extends PouchDbDocument>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Fetches all documents from the database
   * @param options
   * @returns - Promise that resolves to an array of documents of type T
   */
  const fetchDocs = async (options = {}): Promise<T[]> => {
    try {
      setLoading(true);
      const allDocs = await db.allDocs({ include_docs: true, ...options });
      return allDocs.rows.map((row) => row.doc as T);
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Adds a document to the database
   * @param doc - The document to add
   * @returns - Promise that resolves to the added document
   */
  const addDoc = async (doc: T): Promise<T> => {
    try {
      const result = await db.put({ ...doc });
      return { ...doc, _rev: result.rev };
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  /**
   * Updates a document in the database
   * @param doc - The document to update
   * @returns Promise that resolves to the updated document
   */
  const updateDoc = async (doc: T): Promise<T> => {
    try {
      const existingDoc = await db.get(doc._id);
      const result = await db.put({ ...existingDoc, ...doc });
      return { ...doc, _rev: result.rev };
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  /**
   * Deletes a document from the database
   * @param id - The id of the document to delete
   */
  const deleteDoc = async (id: string): Promise<void> => {
    try {
      const existingDoc = await db.get(id);
      await db.remove(existingDoc);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { loading, error, fetchDocs, addDoc, updateDoc, deleteDoc };
};

export default usePouchDb;
