import CategoryCard from "@/components/ui/CategoryCard";
import IconCircle from "@/components/ui/IconCircle";
import { useAppDB } from "@/database/db";
import { Category } from "@/shared.types";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ScrollView, TouchableHighlight, View } from "react-native";

export default function IncomeCategoriesTab() {
  const [categories, setCategories] = useState<Category[] | undefined>();
  const { getAllIncomeCategories } = useAppDB();

  useFocusEffect(
    useCallback(() => {
      loadIncomeCategories();
    }, [])
  );

  const loadIncomeCategories = async () => {
    try {
      const result = await getAllIncomeCategories();
      setCategories(result);
    } catch (error) {
      console.error("Failed to load categories:", error);
    }
  };

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        {categories?.map((record: Category) => (
          <CategoryCard
            key={record.id}
            id={record.id}
            name={record.name}
            icon={record.icon}
            iconColor={record.color}
          />
        ))}
      </ScrollView>
      <TouchableHighlight className="absolute bottom-10 right-10">
        <Link href={"/categories/new/income"}>
          <IconCircle icon={"add"} color={"gray"} />
        </Link>
      </TouchableHighlight>
    </View>
  );
}
