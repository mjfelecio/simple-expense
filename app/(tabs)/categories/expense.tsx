import CategoryCard from "@/components/ui/CategoryCard";
import IconCircle from "@/components/ui/IconCircle";
import { Link } from "expo-router";
import { ScrollView, TouchableHighlight, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <CategoryCard
          name="Transportation"
          icon={"local-gas-station"}
          iconColor="red"
        />
      </ScrollView>
      <TouchableHighlight
        className="absolute bottom-10 right-10"
      >
        <Link href={"/categories/new"}>
          <IconCircle icon={"add"} color={"gray"} />
        </Link>
      </TouchableHighlight>
    </View>
  );
}
