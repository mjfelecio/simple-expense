import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type Category = "expense" | "income";

export type Record = {
  icon: IconName;
  iconColor: string;
  name: string;
  value: number;
  type: Category;
};