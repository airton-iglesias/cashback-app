import { useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList} from "../../../types/navigationTypes";
import { Feather } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_7() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            commerceNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'home' }], 
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [commerceNavigation]);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 items-center justify-center">
                <Feather name="check-circle" size={85} color="#4ade80" />
            </View>
        </SafeAreaView>
    );
}
