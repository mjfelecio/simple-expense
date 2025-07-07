import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type CategoryType = "expense" | "income";

export type Record = {
  id: number;
  name: string;
  amount: number;
  date: string; // Stores the date the record is set
  category_id: number;
  created_at: string; // Stores the creation of the record
}

export type RecordGroup = {
  date: string;
  records: Record[];
};

export type Category = {
  id: number;
  name: string;
  type: CategoryType;
  color: string;
  icon: IconName;
};
