import "./global.css";
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SigninScreen from './screens/signin';
import SignUpScreen from './screens/signup';
import CommerceScreen from "./screens/commerce";
import DashboardScreen from "./screens/dashboard";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="commerce">
        <Stack.Screen name="signin" component={SigninScreen} options={{ headerShown: false }} />
        <Stack.Screen name="signup" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" component={DashboardScreen} options={{ headerShown: false }} />
        <Stack.Screen name="commerce" component={CommerceScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
