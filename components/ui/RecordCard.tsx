import { useAppDB } from "@/database/db";
import { IconName } from "@/shared.types";
import React, { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import IconCircle from "./IconCircle";

type Props = {
  name: string;
  amount: number;
  category_id: number;
}

const RecordCard = ({ name, amount, category_id }: Props) => {
  const { getCategory } = useAppDB();

  const [categoryIcon, setCategoryIcon] = useState<IconName>("question-mark");
  const [categoryColor, setCategoryColor] = useState("gray");
  const [categoryType, setCategoryType] = useState("expense");

  const fetchCategoryDetails = async (id: number) => {
    try {
      const result = await getCategory(id);

      if (!result) {
        throw new Error("Failed to fetch category for record");
      }

      setCategoryIcon(result.icon);
      setCategoryColor(result.color);
      setCategoryType(result.type);
    } catch (error) {
      console.error(error);
      alert(`Failed to fetch category details for ${name} record`);
    }
  };

  useEffect(() => {
    fetchCategoryDetails(category_id);
  }, []);

  const sign = categoryType === "expense" ? "-" : "";

  return (
    <TouchableHighlight onPress={() => alert(`Clicked ${name} record`)}>
      <View className="flex flex-row items-center gap-4 p-4">
        <IconCircle
          icon={categoryIcon}
          color={categoryColor}
          iconSize={26}
          circleSize={38}
        />
        <Text className="text-white text-xl font-medium">{name}</Text>
        <View className="flex-1"></View>
        <Text className="text-white text-xl font-medium">{sign + amount}</Text>
      </View>
    </TouchableHighlight>
  );
};

export default RecordCard;
