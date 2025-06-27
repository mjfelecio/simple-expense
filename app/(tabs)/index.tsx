import OverviewCard from "@/components/ui/OverviewCard";
import RecordGroup from "@/components/ui/RecordGroup";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
      <OverviewCard />
      <ScrollView>
        <RecordGroup />
        <RecordGroup />
      </ScrollView>
    </SafeAreaView>
  );
}
