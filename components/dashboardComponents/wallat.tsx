import { useNavigation, NavigationProp } from "@react-navigation/native";
import { SafeAreaView, Text, View } from "react-native";
import { RootStackParamList } from "../../types";
import Topbar from "./topbar";


export default function Wallat() {
    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    
    return (
        <SafeAreaView className="flex-1">
            <Topbar/>
            <View className="h-full w-full flex justify-center items-center">
                <Text>Wallat</Text>
            </View>
        </SafeAreaView>
    );
}
