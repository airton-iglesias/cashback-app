import { SafeAreaView, View, Text } from "react-native";
import { FontAwesome6 } from '@expo/vector-icons';
import MoonStarIcon from "../../assets/moonStarIcon";
import Topbar from "../dashboardComponents/topbar";

export default function CommerceHome() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Topbar />
            <View className="flex-1 items-center justify-start pt-24 w-full h-full">
                <MoonStarIcon />
                <Text className="text-2xl font-semibold text-gray-600 w-48 text-center mt-8">
                    Crie um novo estabelecimento, evento ou promoção
                </Text>
            </View>
            <View className="absolute h-20 w-20 rounded-full bg-black bottom-4 right-4 items-center justify-center">
                <FontAwesome6 name="plus" size={24} color="white" />
            </View>
        </SafeAreaView>
    );
}

