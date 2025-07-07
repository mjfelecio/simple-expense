import { useAppDB } from "@/database/db";
import { Record } from "@/shared.types";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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

const OverviewCard = () => {
  const { getAllRecords } = useAppDB();
  const [totalIncome, setTotalIncome] = useState("0");
  const [totalExpense, setTotalExpense] = useState("0");
  const [totalBalance, setTotalBalance] = useState("0");
  const [records, setRecords] = useState<Record[]>([]);

  const fetchRecords = async () => {
    try {
      const result = await getAllRecords();
      if (!result) {
        throw new Error("Failed to fetch records to populate OverviewCard");
      }
      setRecords(result ?? []);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch records to populate OverviewCard");
    }
  };

  const calculateValues = useCallback(() => {
    if (!records || records.length === 0) {
      setTotalIncome("0");
      setTotalExpense("0");
      setTotalBalance("0");
      return;
    }

    // Note that we are just ignoring "0" amounts here, regardless of their category type
    // cause they don't really contribute anything
    const incomes = records
      .map((record) => record.amount)
      .filter((record) => record > 0)
      .reduce((a, b) => a + b, 0);

    const expenses = records
      .map((record) => record.amount)
      .filter((record) => record < 0)
      .reduce((a, b) => a + b, 0);

    // We are adding for the balance cause expenses is a negative value
    // (+) - (-) Becomes (+) + (+)
    // (+) + (-) Is the correct approach
    const balances = incomes + expenses;

    setTotalIncome(addSeparators(incomes));
    setTotalExpense(addSeparators(expenses));
    setTotalBalance(addSeparators(balances));
  }, [records]);

  function addSeparators(number: number) {
    return number.toLocaleString();
  }

  // Fetch records when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      fetchRecords();
    }, [])
  );

  // Calculate values whenever records change
  useEffect(() => {
    calculateValues();
  }, [calculateValues]);

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