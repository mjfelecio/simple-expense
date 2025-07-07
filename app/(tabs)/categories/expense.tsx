import CategoryCard from "@/components/ui/CategoryCard";
import IconCircle from "@/components/ui/IconCircle";
import { useAppDB } from "@/database/db";
import { Category } from "@/shared.types";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableHighlight, View } from "react-native";

export default function ExpenseCategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const { getAllCategories } = useAppDB();

  useFocusEffect(
    useCallback(() => {
      loadExpenseCategories();
    }, [])
  );

  const loadExpenseCategories = async () => {
    try {
      const result = await getAllCategories("expense");
      setCategories(result);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        {categories.length > 0 ? (
          categories.map((record: Category) => (
          <CategoryCard
            key={record.id}
            id={record.id}
            name={record.name}
            icon={record.icon}
            iconColor={record.color}
          />
        ))
        ) : (
          <View className="flex-1 justify-center items-center mt-32 gap-2">
            <Text className="text-white text-4xl font-bold">
              No Expense Category Yet
            </Text>
            <Text className="text-blue-200 text-sm text-center">
              Click the plus button below to create a new category
            </Text>
          </View>
        )}
      </ScrollView>
      <TouchableHighlight className="absolute bottom-10 right-10">
        <Link href={"/categories/new/expense"}>
          <IconCircle icon={"add"} color={"gray"} />
        </Link>
      </TouchableHighlight>
    </View>
  );
}
