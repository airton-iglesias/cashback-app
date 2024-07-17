import { Image, SafeAreaView, Text, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function Home() {
    
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 w-full justify-center items-center">
                <View className="relative flex justify-center items-center h-full w-full">

                    <Image className="w-full h-full z-0" source={require('../../assets/images/garota.png')}/>
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 1)']}
                        style={{ position: 'absolute', bottom: 0, width: '100%', height: '60%' }}
                    />

                    <View className="absolute bottom-0 flex gap-1 w-full h-52 pt-1 rounded-lg px-5">
                        <View className="flex flex-row justify-between w-full h-full pb-4">
                            <View className="py-4 z-20 flex flex-col">
                                <Text className="text-3xl font-bold text-white">Fitness Center</Text>
                                <View className="flex items-center flex-row">
                                    <Text className="text-2xl font-normal text-white">Beja, Portugal</Text>
                                </View>
                            </View>
                            <View className="mt-8">
                                <View className="bg-[#FFF3D0] flex flex-row rounded-lg py-1 px-2 items-center justify-center">
                                    <Text className="text-[#D9A100] text-3xl font-bold">10%</Text>
                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={22} color="#D9A100" style={{marginLeft: 5}} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
