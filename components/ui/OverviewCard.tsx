import { Record } from "@/shared.types";
import React from "react";
import { Text, View } from "react-native";

const values = {
  income: "54,334",
  expense: "50,324",
  balance: "4,010",
};

type ItemCardProps = {
  name: string;
  value: string;
};

const ItemCard = ({ name, value }: ItemCardProps) => {
  return (
    <View className="flex-1 justify-start items-center gap-1 pt-1.5">
      <Text className="text-white text-xl font-semibold">{name}</Text>
      <Text className="text-white text-2xl font-bold">{value}</Text>
    </View>
  );
};

type OverviewCardProp = {
  records: Record[];
}

const OverviewCard = ({ records }: OverviewCardProp) => {
  return (
    <View className="border-4 border-white rounded-xl py-4 m-4 h-32 flex-row">
      <ItemCard name="Income" value={values["income"]} />
      <View className="bg-gray-800 w-1.5 rounded-2xl"></View>
      <ItemCard name="Expenses" value={values["expense"]} />
      <View className="bg-gray-700 w-1.5 rounded-2xl"></View>
      <ItemCard name="Balance" value={values["balance"]} />
    </View>
  );
};

export default OverviewCard;
