import { Record, RecordGroup } from "@/shared.types";
import React from "react";
import { Text, View } from "react-native";
import RecordCard from "./RecordCard";

type Props = {
  data: RecordGroup;
};

const RecordGroupCard = ({ data }: Props) => {
  const date = new Date(data.date);
  const records = data.records;

  // Date info
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" }); // Ex. Sunday
  const dayInMonth = date.getDate(); // Ex. 21
  const monthAndYear = date.toLocaleDateString("en-US", { // Ex. June 2025
    month: "long",
    year: "numeric",
  });

  // Calculate Group Balance
  const groupBalance = records
    .map((record) => record.amount)
    .reduce((a, b) => a + b);

  return (
    <View className="mx-4 flex">
      <View className=" flex flex-row gap-2 border-b-2 border-white">
        <Text className="text-white text-[32px] text-bold">{dayInMonth}</Text>
        <View className="flex justify-center">
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white">{monthAndYear}</Text>
        </View>
        <View className="flex-1"></View>
        <Text className="text-white text-2xl text-semibold">
          {groupBalance}
        </Text>
      </View>
      {records
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map((record: Record) => (
          <RecordCard key={record.id} record={record} />
        ))}
    </View>
  );
};

export default RecordGroupCard;
