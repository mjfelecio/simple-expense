import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme.web";
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
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Text style={[styles.headerText, { color: theme.text }]}>Categories</Text>

      <View style={{ flex: 1 }}>
        <MaterialTopTabs>
          <MaterialTopTabs.Screen
            name="expense"
            options={{ title: "Expense",tabBarLabelStyle: styles.tabBarLabel }}
          />
          <MaterialTopTabs.Screen
            name="income"
            options={{ title: "Income", tabBarLabelStyle: styles.tabBarLabel }}
          />
        </MaterialTopTabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: "white",
    fontSize: 30,
    fontWeight: "bold",
    paddingBottom: 4,
    textAlign: "center",
  },
  tabBarLabel: {
    fontSize: 16,
    fontWeight: "bold",
  }
});
