import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableHighlight, View } from "react-native";
import IconCircle from "./IconCircle";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  name: string;
};

export default function CategoryCard({ icon, iconColor, name }: Props) {
  return (
    <TouchableHighlight onPress={() => alert(`Clicked ${name} category`)}>
      <View className="flex flex-row items-center gap-4 p-4">
        <IconCircle icon={icon} color={iconColor} />
        <Text className="text-white text-2xl font-medium">{name}</Text>
      </View>
    </TouchableHighlight>
  );
}
