import IconCircle from "@/components/ui/IconCircle";
import OverviewCard from "@/components/ui/OverviewCard";
import RecordGroupCard from "@/components/ui/RecordGroupCard";
import { useAppDB } from "@/database/db";
import { RecordGroup } from "@/shared.types";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { getAllRecordsGroupedByDate } = useAppDB();

  const [recordsGroupedByDate, setRecordsGroupedByDate] = useState<
    RecordGroup[]
  >([]);

  const fetchRecords = async () => {
    try {
      const groupedRecords = await getAllRecordsGroupedByDate();

      if (!groupedRecords) {
        throw new Error("Failed to fetch records");
      }

      // We sort it descending, starting from earliest record
      const sortedRecords = groupedRecords.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setRecordsGroupedByDate(sortedRecords ?? []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch records");
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchRecords();
    }, [])
  );

  return (
    <SafeAreaView className="flex-1">
      <View className="border-b-2 border-white py-2">
        <Text className="text-4xl font-bold text-white mx-4">June 2025</Text>
      </View>
      <OverviewCard />
      <ScrollView>
        {recordsGroupedByDate.map((recordGroup) => (
          <RecordGroupCard key={recordGroup.date} data={recordGroup} />
        ))}
      </ScrollView>
      <Link href={"/records/new"} asChild>
        <TouchableOpacity className="absolute bottom-10 right-10">
          <IconCircle icon="add" color={"gray"} />
        </TouchableOpacity>
      </Link>
    </SafeAreaView>
  );
}
