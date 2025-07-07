import { Record } from "@/shared.types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";

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
};

const OverviewCard = ({ records }: OverviewCardProp) => {
  const [totalIncome, setTotalIncome] = useState("0");
  const [totalExpense, setTotalExpense] = useState("0");
  const [totalBalance, setTotalBalance] = useState("0");

  const calculateValues = () => {
    // Note that we are just ignoring "0" amounts here, regardless of their category type
    // cause they don't really contribute anything
    const incomes = records
      .map((record) => record.amount)
      .filter((record) => record > 0)
      .reduce((a, b) => a + b);

    const expenses = records
      .map((record) => record.amount)
      .filter((record) => record < 0)
      .reduce((a, b) => a + b);

    // We are adding for the balance cause expenses is a negative value
    // (+) - (-) Becomes (+) + (+)
    // (+) + (-) Is the correct approach
    const balances = incomes + expenses;

    setTotalIncome(addSeparators(incomes));
    setTotalExpense(addSeparators(expenses));
    setTotalBalance(addSeparators(balances));
  };

  function addSeparators(number: number) {
     return number.toLocaleString()
  }

  useFocusEffect(
    useCallback(() => {
      calculateValues();
    }, [])
  );

  return (
    <View className="border-4 border-white rounded-xl py-4 m-4 h-32 flex-row">
      <ItemCard name="Income" value={totalIncome} />
      <View className="bg-gray-800 w-1.5 rounded-2xl"></View>
      <ItemCard name="Expenses" value={totalExpense} />
      <View className="bg-gray-700 w-1.5 rounded-2xl"></View>
      <ItemCard name="Balance" value={totalBalance} />
    </View>
  );
};

export default OverviewCard;
