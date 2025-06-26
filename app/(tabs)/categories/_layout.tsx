import {
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
	createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function CategoriesLayout() {
	// This accounts for the elements in a device that may hide the text above (like status bars)
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={styles.headerText}>Categories</Text>

      <View style={{ flex: 1 }}>
        <MaterialTopTabs>
          <MaterialTopTabs.Screen
            name="expense"
            options={{ title: "Expense" }}
          />
          <MaterialTopTabs.Screen
            name="income"
            options={{ title: "Income" }}
          />
        </MaterialTopTabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: 18,
  },
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 12,
		textAlign: "center"
  },
});
