import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import RecordCard from "./RecordCard";

export type Record = {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  name: string;
  value: number;
  type: "expense" | "income";
};

const records: Record[] = [
  {
    icon: "school",
    iconColor: "blue",
    name: "Tuition Fee",
    value: 290,
    type: "expense",
  },
  {
    icon: "local-gas-station",
    iconColor: "red",
    name: "Gas",
    value: 200,
    type: "expense",
  },
];

const today = new Date();
const monthDate = 27;
const dayName = "Friday";
const monthAndYear = "June 2025";
const groupBalance = -204;

const RecordGroup = () => {
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
      {records.map((record, index) => (
        <RecordCard
          key={index}
          icon={record.icon}
          iconColor={record.iconColor}
          name={record.name}
          value={record.value}
          type={record.type}
        />
      ))}
    </View>
  );
};

export default RecordGroup;
