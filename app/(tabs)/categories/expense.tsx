import CategoryCard from "@/components/ui/CategoryCard";
import { ScrollView } from "react-native";

export default function TabOneScreen() {
  return (
	<ScrollView>
	  <CategoryCard name="Transportation" icon={"local-gas-station"} iconColor="red" />
	</ScrollView>
  );
}
