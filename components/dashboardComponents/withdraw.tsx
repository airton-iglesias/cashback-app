import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Withdraw_Home from "./withdrawHome";
import Withdraw_Sucess from "./withdrawSucess";
import { WithdrawStackParamList } from "../../types/navigationTypes";

const WithdrawStack = createNativeStackNavigator<WithdrawStackParamList>();

export default function Withdraw() {
    return (
        <WithdrawStack.Navigator initialRouteName="WithdrawHome">
            <WithdrawStack.Screen name="WithdrawHome" component={Withdraw_Home} options={{ headerShown: false }} />
            <WithdrawStack.Screen name="WithdrawSucess" component={Withdraw_Sucess} options={{ headerShown: false }} />
        </WithdrawStack.Navigator>
    );
}
