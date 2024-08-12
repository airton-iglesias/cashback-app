import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import initializeI18Next from './utils/i18nextConfig';
import { TranslationProvider } from './contexts/TranslationContext';
import { AuthStackNavigation } from './navigation/AuthStackNavigation';
import { RootStackNavigation } from './navigation/RootStackNavigation';

const MainStack = createNativeStackNavigator();

initializeI18Next();

export default function App() {
  return (
    <TranslationProvider>
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="Root" screenOptions={{ headerShown: false }}>
          <MainStack.Screen name="Auth" component={AuthStackNavigation} />
          <MainStack.Screen name="Root" component={RootStackNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    </TranslationProvider>
  );
}
