import { MaterialIcons } from "@expo/vector-icons";

export type IconName = keyof typeof MaterialIcons.glyphMap;
export type CategoryTypes = "expense" | "income";

export type Record = {
  icon: IconName;
  iconColor: string;
  name: string;
  value: number;
  type: CategoryTypes;
};

export type Category = {
  id?: number;
  name: string;
  type: CategoryTypes;
  color: string;
  icon: IconName;
};
