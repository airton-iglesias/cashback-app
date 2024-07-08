import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import SignupStep1 from "../components/signupComponents/signup_step_1";
import SignupStep2 from "../components/signupComponents/signup_step_2";
import SignupStep3 from "../components/signupComponents/signup_step_3";
import SignupStep4 from "../components/signupComponents/signup_step_4";
import SignupStep5 from "../components/signupComponents/signup_step_5";


const SignupStack = createNativeStackNavigator();

export default function SignupScreen() {
    return (
        <SignupStack.Navigator initialRouteName="SignupStep1">
            <SignupStack.Screen name="SignupStep1" component={SignupStep1} options={{ headerShown: false }} />
            <SignupStack.Screen name="SignupStep2" component={SignupStep2} options={{ headerShown: false }} />
            <SignupStack.Screen name="SignupStep3" component={SignupStep3} options={{ headerShown: false }} />
            <SignupStack.Screen name="SignupStep4" component={SignupStep4} options={{ headerShown: false }} />
            <SignupStack.Screen name="SignupStep5" component={SignupStep5} options={{ headerShown: false }} />
        </SignupStack.Navigator>
    );
}

