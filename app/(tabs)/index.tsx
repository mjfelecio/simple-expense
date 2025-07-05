import IconCircle from "@/components/ui/IconCircle";
import OverviewCard from "@/components/ui/OverviewCard";
import RecordCard from "@/components/ui/RecordCard";
import { useAppDB } from "@/database/db";
import { RealRecord } from "@/shared.types";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { getAllRecords } = useAppDB();

  const [records, setRecords] = useState<RealRecord[]>();

  const fetchRecords = async () => {
    try {
      const result = await getAllRecords();

      if (!result) {
        throw new Error("Failed to fetch records");
      }

      setRecords(result);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch records");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="border-b-2 border-white py-2">
        <Text className="text-4xl font-bold text-white mx-4">June 2025</Text>
      </View>
      <OverviewCard />
      <ScrollView>
        {records?.map((record) => (
          <RecordCard key={record.id} record={record} />
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
