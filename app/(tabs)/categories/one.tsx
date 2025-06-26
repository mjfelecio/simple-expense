import { StyleSheet, Text, View } from "react-native";

export default function TabOneScreen() {
  return (
	<View style={styles.container}>
	  <Text style={styles.title}>Tab One</Text>
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