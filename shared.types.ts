import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type CategoryType = "expense" | "income";

export type Record = {
  id: number;
  name: string;
  amount: number;
  date: string;
  category_id: number;
}

export type Category = {
  id: number;
  name: string;
  type: CategoryType;
  color: string;
  icon: IconName;
};
