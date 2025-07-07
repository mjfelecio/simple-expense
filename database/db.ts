import { Category, CategoryType, Record, RecordGroup } from "@/shared.types";
import { useSQLiteContext } from "expo-sqlite";
import { groupBy } from "lodash";

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
        category_id INTEGER NOT NULL,
        created_at TEXT NOT NULL
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
  const addRecord = async (record: Omit<Record, "id">) => {
    const { name, amount, date, category_id, created_at } = record;

    await init();

    return await db.runAsync(
      "INSERT INTO records (name, amount, date, category_id, created_at) VALUES (?, ?, ?, ?, ?)",
      name,
      amount,
      date,
      category_id,
      created_at,
    );
  };

  const updateRecord = async (record: Omit<Record, "created_at">) => {
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


const getAllRecordsGroupedByDate = async (): Promise<RecordGroup[]> => {
  await init();

  const allRecords = await getAllRecords();

  // We map the date to its date string so we only group by the date, not the time
  // This means we can avoid situations where the records are the same date, but not same time
  // causing them to be grouped differently
  const mappedRecords = allRecords.map((record) => ({
    ...record, date: new Date(record.date).toDateString(),   
  }))
  // Using lodash's groupBy instead of Object.groupBy cause it doesn't work here for some reason
  const groupedObj = groupBy(mappedRecords, "date");

  const recordGroups: RecordGroup[] = Object.entries(groupedObj).map(
    ([date, records]) => ({
      date,
      records: records ?? [],
    })
  );

  return recordGroups;
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
    getAllRecordsGroupedByDate,
  };
};
