import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigationTypes';
import SigninScreen from '@/screens/signin';
import SignupScreen from '@/screens/signup';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigation = () => {
    return (
        <AuthStack.Navigator initialRouteName="signin">
            <AuthStack.Screen name="signin" component={SigninScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};
