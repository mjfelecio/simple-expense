import CategoryCard from "@/components/ui/CategoryCard";
import IconCircle from "@/components/ui/IconCircle";
import { ScrollView, TouchableHighlight, View } from "react-native";

export default function TabOneScreen() {
  return (
    <View className="flex-1">
      <ScrollView>
        <CategoryCard
          name="Transportation"
          icon={"local-gas-station"}
          iconColor="red"
        />
      </ScrollView>
      <TouchableHighlight
        onPress={() => alert("Add category")}
        className="absolute bottom-10 right-10"
      >
        <IconCircle icon={"add"} color={"gray"} />
      </TouchableHighlight>
    </View>
  );
}
