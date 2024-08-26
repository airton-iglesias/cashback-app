import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignupStackParamList } from '@/types/navigationTypes';
import Signup_Step_0 from "@/components/signupComponents/signup_step_0";
import Signup_Step_1 from '@/components/signupComponents/signup_step_1';
import Signup_Step_2 from '@/components/signupComponents/signup_step_2';
import Signup_Step_3 from '@/components/signupComponents/signup_step_3';
import Signup_Step_4 from '@/components/signupComponents/signup_step_4';
import Signup_step_4 from '@/components/signupComponents/signup_step_4';

const SignupStack = createNativeStackNavigator<SignupStackParamList>();

const SignupStackNavigation = () => {
    return (
        <SignupStack.Navigator initialRouteName="signup_step_0">
            <SignupStack.Screen name="signup_step_0" component={Signup_Step_0} options={{ headerShown: false }} />
            <SignupStack.Screen name="signup_step_1" component={Signup_Step_1} options={{ headerShown: false }} />
            <SignupStack.Screen name="signup_step_2" component={Signup_Step_2} options={{ headerShown: false }} />
            <SignupStack.Screen name="signup_step_3" component={Signup_Step_3} options={{ headerShown: false }} />
            <SignupStack.Screen name="signup_step_4" component={Signup_Step_4} options={{ headerShown: false }} />
        </SignupStack.Navigator>
    );
}

export default SignupStackNavigation;
