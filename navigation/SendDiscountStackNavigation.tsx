import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SendDiscountParamList } from '@/types/navigationTypes';
import Send_Discount_Home from '@/components/dashboardComponents/sendDiscount/sendDiscountHome';
import Send_Discount_Purchase_Value from '@/components/dashboardComponents/sendDiscount/sendDiscountPurchaseValue';
import Send_Discount_Value from '@/components/dashboardComponents/sendDiscount/sendDiscountValue';
import Send_Discount_Receive_Discount from '@/components/dashboardComponents/sendDiscount/sendDiscountReceiveDiscount';

const SendDiscountStack = createNativeStackNavigator<SendDiscountParamList>();

export const SendDiscountStackNavigation = () => {
    return (
        <SendDiscountStack.Navigator initialRouteName="home">
            <SendDiscountStack.Screen name="home" component={Send_Discount_Home} options={{ headerShown: false }} />
            <SendDiscountStack.Screen name="purchasevalue" component={Send_Discount_Purchase_Value} options={{ headerShown: false }} />
            <SendDiscountStack.Screen name="discountvalue" component={Send_Discount_Value} options={{ headerShown: false }} />
            <SendDiscountStack.Screen name="receivediscount" component={Send_Discount_Receive_Discount} options={{ headerShown: false }} />
        </SendDiscountStack.Navigator>
    );
};
