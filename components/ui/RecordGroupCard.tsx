import { CategoryType, IconName, Record, RecordGroup } from "@/shared.types";
import React, { useRef, useState } from "react";
import { Text, View } from "react-native";
import RecordCard from "./RecordCard";

const today = new Date();
const monthDate = 27;
const dayName = "Friday";
const monthAndYear = "June 2025";
const groupBalance = -204;

type Props = {
  data: RecordGroup;
};

const RecordGroupCard = ({ data }: Props) => {
  const date = useRef(data.date);
  const [records, setRecords] = useState(data.records);

  return (
    <View className="mx-4 flex">
      <View className=" flex flex-row gap-2 border-b-2 border-white">
        <Text className="text-white text-[32px] text-bold">{monthDate}</Text>
        <View className="flex justify-center">
          <Text className="text-white">{dayName}</Text>
          <Text className="text-white">{monthAndYear}</Text>
        </View>
        <View className="flex-1"></View>
        <Text className="text-white text-2xl text-semibold">
          {groupBalance}
        </Text>
      </View>
      {records.map((record: Record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </View>
  );
};

export default RecordGroupCard;
