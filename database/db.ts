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
        icon TEXT NOT NULL,
        UNIQUE(name, type)
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

  const getAllExpenseCategories = async (): Promise<Category[]> => {
    await init();

    const result = await db.getAllAsync<Category>(
      "SELECT * FROM categories WHERE type = ?",
      "expense"
    );
    return result;
  };

  const getAllIncomeCategories = async (): Promise<Category[]> => {
    await init();

    const result = await db.getAllAsync<Category>(
      "SELECT * FROM categories WHERE type = ?",
      "income"
    );
    return result;
  };

  return {
    init,
    addCategory,
    getAllExpenseCategories,
    getAllIncomeCategories,
    updateCategory,
    getCategory,
    deleteCategory
  };
};
