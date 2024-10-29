import db from "../constants/dbConstants";

export const deleteDbFromDevice = async () => {
  try {
    await db.destroy();
    console.log("Database deleted successfully");
  } catch (err) {
    console.error("Error deleting database from device:", err);
  }
};
