import { StyleSheet, Text, View } from "react-native";

export default function TabTwoScreen() {
  return (
	<View style={styles.container}>
	  <Text style={styles.title}>Tab Two</Text>
	</View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignContent: "center"
	},
	title: {
		fontSize: 30
	}
})