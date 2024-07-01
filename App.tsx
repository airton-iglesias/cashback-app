import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import HomeScreen from './screens/home';
import LoginScreen from './screens/login';
import SignUpScreen from './screens/signup';
import DashboardScreen from './screens/Dashboard';
import "./global.css";
import Pin from './screens/pin';
import React from 'react';
import { faHouse, faQrcode, faWallet } from '@fortawesome/free-solid-svg-icons';
import { View } from 'react-native';
import wallatScreen from './screens/wallat';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function DashboardTabs() {
  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === 'DashboardTab') {
            if(focused){
              return <View className='bg-gray-300 rounded-full p-3 flex items-center justify-center'><FontAwesomeIcon style={{padding:17}} icon={faHouse}/></View>
            }
            return <FontAwesomeIcon style={{padding:17}} icon={faHouse}/>
          } 
          else if (route.name === 'Wallet') {
            if(focused){
              return <View className='bg-gray-300 rounded-full p-3 flex items-center justify-center'><FontAwesomeIcon style={{padding:17}} icon={faWallet}/></View>
            }
            return <FontAwesomeIcon style={{padding:17}} icon={faWallet}/>
          }
        },
        tabBarStyle: {
          height: 80
        },
        tabBarLabelStyle: {
          display: 'none', // Oculta os rótulos
        }
      })}
    >
      <Tab.Screen name="DashboardTab" component={DashboardScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Wallet" component={wallatScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={SignUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Pin" component={Pin} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
