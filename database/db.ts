import { Category } from "@/shared.types";
import { useSQLiteContext } from "expo-sqlite";

export const useAppDB = () => {
  const db = useSQLiteContext();

  const init = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        color TEXT NOT NULL,
        icon TEXT NOT NULL
      );
    `);
  };

  const addCategory = async (category: Category) => {
    const { name, type, color, icon } = category;

    return await db.runAsync(
      "INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)",
      name, type, color, icon 
    );
  };

  return {
    init,
    addCategory,
  };
};
