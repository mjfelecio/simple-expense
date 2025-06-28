import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CategoryDetails = () => {
	const { id } = useLocalSearchParams();

	const isEdit = id !== "new"

  return (
	<SafeAreaView>
	  <Text className="text-white">{isEdit ? "Edit" : "Add"} Category: {id}</Text>
	</SafeAreaView>
  )
}

export default CategoryDetails