import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/dashboard';
import Profile from '../screens/profile';
import Points from '../screens/points';
import CommerceScreen from '../screens/commerce';
import { RootStackParamList } from '../types/navigationTypes';


const RootStack = createNativeStackNavigator<RootStackParamList>();

export  const RootStackNavigation = () => {
    return (
        <RootStack.Navigator initialRouteName="dashboard">
            <RootStack.Screen name="dashboard" component={DashboardScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="commerce" component={CommerceScreen} options={{ headerShown: false }} />
            <RootStack.Screen name="profile" component={Profile} options={{ headerShown: false }} />
            <RootStack.Screen name="points" component={Points} options={{ headerShown: false }} />
        </RootStack.Navigator>
    );
}