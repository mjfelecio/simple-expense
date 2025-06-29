import { MaterialIcons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Text, TouchableHighlight, View } from "react-native";
import IconCircle from "./IconCircle";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  name: string;
  id: number;
};

export default function CategoryCard({ icon, iconColor, name, id }: Props) {
  return (
    <TouchableHighlight>
      <Link href={`/categories/${id}`}>
        <View className="flex flex-row items-center gap-4 p-4">
          <IconCircle icon={icon} color={iconColor} />
          <Text className="text-white text-2xl font-medium">{name}</Text>
        </View>
      </Link>
    </TouchableHighlight>
  );
}
