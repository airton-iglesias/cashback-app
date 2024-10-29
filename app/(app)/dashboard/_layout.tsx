import { Stack, usePathname } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardLayout() {
  const route = usePathname();
  return (
    <SafeAreaView style={[{flex: 1}, route === "/dashboard/qrcode" ? {backgroundColor: '#000'}:{backgroundColor: '#212121'}]}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
