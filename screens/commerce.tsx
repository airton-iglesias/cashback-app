import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CommerceHome from "../components/commerceComponents/home";

const CommerceStack = createNativeStackNavigator();

export default function CommerceScreen() {

    return (
        <CommerceStack.Navigator initialRouteName="home">
            <CommerceStack.Screen name="home" component={CommerceHome} options={{ headerShown: false }} />
            <CommerceStack.Screen name="newcommerce" component={CommerceHome} options={{ headerShown: false }} />
        </CommerceStack.Navigator>
    );
}
