import IconCircle from "@/components/ui/IconCircle";
import OverviewCard from "@/components/ui/OverviewCard";
import RecordGroup from "@/components/ui/RecordGroup";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <View className="border-b-2 border-white py-2">
        <Text className="text-4xl font-bold text-white mx-4">June 2025</Text>
      </View>
      <OverviewCard />
      <ScrollView>
        <RecordGroup />
        <RecordGroup />
      </ScrollView>
      <TouchableOpacity onPress={() => alert("Adding new record...")} className="absolute bottom-10 right-10">
        <IconCircle icon="add" color={"gray"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
