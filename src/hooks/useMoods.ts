import { useState } from "react";
import usePouchDb from "../hooks/usePouchDb";
import { Mood } from "../types/Mood";
import { UserInfo } from "../types/UserInfo";
import { filterMoodDocs } from "../utils/dataTransformers";

const useMoods = () => {
  const [moods, setMoods] = useState<Mood[]>([]);
  const { addDoc, fetchDocs, updateDoc, deleteDoc, loading } =
    usePouchDb<Mood>();

  const addMood = async (mood: Mood): Promise<Mood | undefined> => {
    try {
      const newMood = await addDoc(mood);
      console.log("Mood posted!");
      setMoods((prevMoods) => [newMood, ...prevMoods]);
      return newMood;
    } catch (err) {
      console.error("Error posting mood to PouchDB", err);
      throw err;
    }
  };

  const fetchMoods = async (): Promise<Mood[] | undefined> => {
    try {
      const allDocs = await fetchDocs({ descending: true });
      const moods = filterMoodDocs(allDocs as (Mood | UserInfo)[]);
      setMoods(moods);
      return moods;
    } catch (err) {
      console.error("Error fetching moods from PouchDB: ", err);
      setMoods([]);
    }
  };

  const updateMood = async (mood: Mood): Promise<Mood | undefined> => {
    try {
      const updatedMood = await updateDoc(mood);
      setMoods((prevMoods) =>
        prevMoods.map((m) => (m._id === updatedMood._id ? updatedMood : m)),
      );
      return updatedMood;
    } catch (err) {
      console.error("Error updating mood:", err);
      throw err;
    }
  };

  const deleteMood = async (id: string): Promise<void> => {
    try {
      await deleteDoc(id);
      setMoods((prevMoods) => prevMoods.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Error soft deleting mood from PouchDB:", err);
    }
  };

  return {
    moods,
    addMood,
    fetchMoods,
    updateMood,
    deleteMood,
    loading,
  };
};

export default useMoods;
