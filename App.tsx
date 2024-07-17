import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import { AuthStackNavigation } from "./navigation/AuthStackNavigation";
import { RootStackNavigation } from "./navigation/RootStackNavigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const MainStack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <MainStack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
        <MainStack.Screen name="Auth" component={AuthStackNavigation} />
        <MainStack.Screen name="Root" component={RootStackNavigation} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
}