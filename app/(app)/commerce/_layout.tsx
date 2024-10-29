import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommerceLayout() {
  const route = usePathname();
  const safeareacolor = () => {
    if(route === "/commerce"){return '#212121'};
    if(route === "/commerce/new/register_completed"){return '#000'}
    return '#fff'
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: safeareacolor() }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
