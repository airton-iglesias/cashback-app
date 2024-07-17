import { useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { useEffect } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { Feather } from '@expo/vector-icons';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Signup_Step_4() {
    const rootNavigation = useNavigation<RootNavigationProp>();
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            rootNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'Root' }], 
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [rootNavigation]);

    return (
        <SafeAreaView className="flex-1 bg-black">
            <View className="flex-1 items-center justify-center">
                <Feather name="check-circle" size={85} color="#4ade80" />
            </View>
        </SafeAreaView>
    );
}
