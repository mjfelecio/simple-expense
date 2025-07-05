import { useAppDB } from "@/database/db";
import { IconName, Record } from "@/shared.types";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, TouchableHighlight, View } from "react-native";
import IconCircle from "./IconCircle";

type Props = {
  record: Record;
};

const RecordCard = ({ record }: Props) => {
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
      alert(`Failed to fetch category details for ${record.name} record`);
    }
  };

  useEffect(() => {
    fetchCategoryDetails(record.category_id);
  }, [record.category_id]);

  const sign = categoryType === "expense" ? "-" : "";

  return (
    <Link href={`/records/${record.id}`} asChild>
      <TouchableHighlight>
        <View className="flex flex-row items-center gap-4 p-4">
          <IconCircle
            icon={categoryIcon}
            color={categoryColor}
            iconSize={26}
            circleSize={38}
          />
          <Text className="text-white text-xl font-medium">{record.name}</Text>
          <View className="flex-1"></View>
          <Text className="text-white text-xl font-medium">
            {`${sign} ${record.amount}`}
          </Text>
        </View>
      </TouchableHighlight>
    </Link>
  );
};

export default RecordCard;
