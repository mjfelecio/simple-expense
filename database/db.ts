import { Category, CategoryType, Record } from "@/shared.types";
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
        icon TEXT NOT NULL,
        UNIQUE(name, type)
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS records (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        amount INTEGER NOT NULL,
        date TEXT NOT NULL,
        category_id INTEGER NOT NULL
      );
    `);
  };

  type NewCategory = Omit<Category, "id">;

  const addCategory = async (category: NewCategory) => {
    const { name, type, color, icon } = category;

    await init();

    return await db.runAsync(
      "INSERT INTO categories (name, type, color, icon) VALUES (?, ?, ?, ?)",
      name,
      type,
      color,
      icon
    );
  };

  const updateCategory = async (category: Category) => {
    const { id, name, type, color, icon } = category;

    if (!id) {
      throw new Error("Category id is required for update");
    }

    await init();

    return await db.runAsync(
      "UPDATE categories SET name = ?, type = ?, color = ?, icon = ? WHERE id = ?",
      name,
      type,
      color,
      icon,
      id
    );
  };

  const getCategory = async (id: number): Promise<Category | null> => {
    await init();

    return await db.getFirstAsync<Category>(
      "SELECT * FROM categories WHERE id = ?",
      id
    );
  };

  const deleteCategory = async (id: number) => {
    await init();

    return await db.runAsync("DELETE FROM categories WHERE id = ?", id);
  };

  const getAllCategories = async (type: CategoryType): Promise<Category[]> => {
    await init();

    const result = await db.getAllAsync<Category>(
      "SELECT * FROM categories WHERE type = ?",
      type
    );
    return result;
  };

  // ==> Record Functions <==

  type NewRecord = Omit<Record, "id">;
  const addRecord = async (record: NewRecord) => {
    const { name, amount, date, category_id } = record;

    await init();

    return await db.runAsync(
      "INSERT INTO records (name, amount, date, category_id) VALUES (?, ?, ?, ?)",
      name,
      amount,
      date,
      category_id
    );
  };

  const updateRecord = async (record: Record) => {
    const { id, name, amount, date, category_id } = record;

    if (!id) {
      throw new Error("Record id is required for update");
    }

    await init();

    return await db.runAsync(
      "UPDATE records SET name = ?, amount = ?, date = ?, category_id = ? WHERE id = ?",
      name,
      amount,
      date,
      category_id,
      id
    );
  };

  const deleteRecord = async (id: number) => {
    await init();

    return await db.runAsync("DELETE FROM records WHERE id = ?", id);
  };

  const getRecord = async (id: number): Promise<Record | null> => {
    await init();

    return await db.getFirstAsync<Record>(
      "SELECT * FROM records WHERE id = ?",
      id
    );
  };

  const getAllRecords = async (): Promise<Record[]> => {
    await init();

    return await db.getAllAsync<Record>("SELECT * FROM records");
  };

  return {
    addCategory,
    getAllCategories,
    updateCategory,
    getCategory,
    deleteCategory,

    addRecord,
    updateRecord,
    deleteRecord,
    getRecord,
    getAllRecords,
  };
};
