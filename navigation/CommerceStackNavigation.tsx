import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../types/navigationTypes';
import CommerceHome from "../components/commerceComponents/home";
import CommerceMenu from '../components/commerceComponents/commerce_menu';
import CommerceAccessManager from '../components/commerceComponents/commerce_access_manager';
import CommerceAddAccess from '../components/commerceComponents/commerce_add_access';
import CommerceAssociateEdit from '../components/commerceComponents/commerce_associate_edit';
import CommerceCreditExtract from '../components/commerceComponents/commerce_credit_extract';
import New_Commerce_Step_0 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_0";
import New_Commerce_Step_1 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_1";
import new_commerce_Step_2 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_2";
import new_commerce_Step_3 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_3";
import new_commerce_Step_4 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_4";
import new_commerce_Step_5 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_5";
import New_Commerce_Step_6 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_6";
import New_Commerce_Step_7 from "../components/commerceComponents/new_commerce_stepper/new_commerce_step_7";
import Commerce_Qrcode from '@/components/commerceComponents/commerce_qrcode';

const CommerceStack = createNativeStackNavigator<CommerceStackParamList>();

const CommerceStackNavigation = () => {
    return (
        <CommerceStack.Navigator initialRouteName="home">
            <CommerceStack.Screen name="home" component={CommerceHome} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_menu" component={CommerceMenu} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_credit_extract" component={CommerceCreditExtract} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_edit" component={CommerceMenu} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_add_access" component={CommerceAddAccess} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_access_manager" component={CommerceAccessManager} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_associate_edit" component={CommerceAssociateEdit} options={{ headerShown: false }} />
            <CommerceStack.Screen name="commerce_qrcode" component={Commerce_Qrcode} options={{ headerShown: false }} />

            <CommerceStack.Screen name="new_commerce_step_0" component={New_Commerce_Step_0} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_1" component={New_Commerce_Step_1} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_2" component={new_commerce_Step_2} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_3" component={new_commerce_Step_3} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_4" component={new_commerce_Step_4} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_5" component={new_commerce_Step_5} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_6" component={New_Commerce_Step_6} options={{ headerShown: false }} />
            <CommerceStack.Screen name="new_commerce_step_7" component={New_Commerce_Step_7} options={{ headerShown: false }} />
        </CommerceStack.Navigator>
    );
}

export default CommerceStackNavigation;
