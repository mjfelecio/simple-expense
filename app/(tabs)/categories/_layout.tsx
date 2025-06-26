import {
	MaterialTopTabNavigationEventMap,
	MaterialTopTabNavigationOptions,
	createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import { withLayoutContext } from "expo-router";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

export default function CategoriesLayout() {
	return (
	<MaterialTopTabs>
	  <MaterialTopTabs.Screen name="one" options={{ title: "Tab One" }} />
	  <MaterialTopTabs.Screen name="two" options={{ title: "Tab Two" }} />
	</MaterialTopTabs>
  );
}

