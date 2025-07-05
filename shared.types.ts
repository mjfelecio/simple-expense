import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type CategoryType = "expense" | "income";

// This is the real record type, the one above is a depreciated version
export type RealRecord = {
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
