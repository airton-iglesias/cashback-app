import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from '@/types/navigationTypes';
import SigninScreen from '@/screens/signin';
import SignupScreen from '@/screens/signup';
import CheckInbox from '@/components/recoveryDatasComponents/CheckInbox';
import ResetPassword from '@/components/recoveryDatasComponents/resetPassword';
import ResetPasswordSucess from '@/components/recoveryDatasComponents/resetSucess';
import Pin from '@/components/pin';
import ResetPinHome from '@/components/recoveryDatasComponents/resetPinHome';
import RecoveryDatas from '@/screens/RecoveryDatas';
import ResetPinConfirm from '@/components/recoveryDatasComponents/resetPinConfirm';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigation = () => {
    return (
        <AuthStack.Navigator initialRouteName="signin">
            <AuthStack.Screen name="signin" component={SigninScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="signup" component={SignupScreen} options={{ headerShown: false }} />
            <AuthStack.Screen name="pinValidate" component={Pin} options={{ headerShown: false }} />
            <AuthStack.Screen name="recoveryDatas" component={RecoveryDatas} options={{ headerShown: false }} />
            <AuthStack.Screen name="verifyInbox" component={CheckInbox} options={{ headerShown: false }} />

            <AuthStack.Screen name="resetPassword" component={ResetPassword} options={{ headerShown: false }} />

            <AuthStack.Screen name="resetPin" component={ResetPinHome} options={{ headerShown: false }} />
            <AuthStack.Screen name="resetPinConfirm" component={ResetPinConfirm} options={{ headerShown: false }} />

            <AuthStack.Screen name="resetSucess" component={ResetPasswordSucess} options={{ headerShown: false }} />
        </AuthStack.Navigator>
    );
};
