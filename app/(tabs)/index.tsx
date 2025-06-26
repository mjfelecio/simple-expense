import OverviewCard from '@/components/ui/OverviewCard';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1">
        <OverviewCard/>
    </SafeAreaView>
  );
}

