import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { TranslationProvider } from '@/contexts/TranslationContext';
import initializeI18Next from '@/utils/i18nextConfig';

SplashScreen.preventAutoHideAsync();
initializeI18Next();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TranslationProvider>
        <Stack initialRouteName='index'>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(app)" options={{ headerShown: false }} />
          <Stack.Screen name="recover_datas" options={{ headerShown: false }} />
          <Stack.Screen name="signup" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }}/>
        </Stack>
    </TranslationProvider>
  );
}
