import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Image, View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from "../../types";

export default function Search() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    return (
        <TouchableOpacity>
            <View className="py-8 w-full px-4" style={{ borderBottomWidth: 1, borderColor: '#D7D7D7' }}>
                <View className="flex-row p-4 rounded-lg items-center">
                    <View className="w-28 h-28 mr-5">
                        <Image source={require('../../assets/reidobacalhau.png')} className="w-full h-full rounded-lg" />
                    </View>
                    <View className="flex-1 mr-2">
                        <View className="bg-[#FFF3D0] w-16 flex flex-row rounded-lg p-1 items-center justify-center mb-1 gap-1">
                            <Text className="text-[#D9A100] font-bold text-lg">10%</Text>
                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={{ marginLeft: 2 }} />
                        </View>
                        <Text className="font-semibold text-xl mb-1">Rei do Bacalhau</Text>
                        <Text className="text-gray-600 mb-2 text-lg">Descrição curta da loja e produtos</Text>
                        <View className="flex-row justify-between">
                            <Text className="text-gray-600 text-lg">Beja, Portugal</Text>
                            <Text className="text-gray-600 text-lg">Há 3km</Text>
                        </View>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}
