import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type CategoryType = "expense" | "income";

export type Record = {
  icon: IconName;
  iconColor: string;
  name: string;
  value: number;
  type: CategoryType;
};

export type Category = {
  id?: number;
  name: string;
  type: CategoryType;
  color: string;
  icon: IconName;
};
