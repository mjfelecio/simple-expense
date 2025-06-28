import { useSQLiteContext } from "expo-sqlite";

export const useAppDB = () => {
  const db = useSQLiteContext();

  const init = async () => {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
		type TEXT NOT NULL
        name TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL
      );
    `);
  };
  return {
    init,
  };
};
