import { KeyboardAvoidingView, Platform, SafeAreaView, Text, TextInput, TouchableHighlight, View, ScrollView } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { WithdrawStackParamList } from "../../types/navigationTypes";

export default function Withdraw_Home() {
    const withdrawNavigation = useNavigation<NavigationProp<WithdrawStackParamList>>();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined} 
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                    <View className="flex-1 p-5 h-full w-full flex gap-5">
                        <TextInput
                            placeholder="ID"
                            className="border border-gray-300 rounded-lg text-gray-500 w-full h-14 px-4 text-xl text-gray-500"
                        />

                        <View className="w-full h-14 bg-gray-200 rounded-lg justify-center items-center">
                            <Text className="text-4xl font-black ">00,00</Text>
                        </View>

                        <View className="flex-row px-5 w-full h-16 bg-gray-200 rounded-lg justify-between items-center">
                            <View className="flex-row h-full items-center">
                                <View className="h-10 mr-4 w-10 rounded-full bg-[#D9D9D9]"></View>
                                <View><Text className="text-2xl">nome</Text></View>
                            </View>
                            <View>
                                <Octicons name="verified" size={24} color="#3b82f6" />
                            </View>
                        </View>

                        <View className="justify-between items-center mt-2 flex-row">
                            <View className="bg-black rounded-lg w-14 h-8 justify-center items-center">
                                <Text className="text-white text-lg font-bold">cEUR</Text>
                            </View>

                            <LinearGradient
                                colors={['#E8C04B', '#FFE69C', '#E8C04B']}
                                style={{ borderRadius: 8 }}
                                className="w-24 h-8 flex-row items-center justify-center">
                                <MaterialCommunityIcons name="ticket-confirmation-outline" size={18} color="#D9A100" style={{ marginRight: 5 }} />
                                <Text className="text-lg font-black text-yellow-600">10%</Text>
                            </LinearGradient>
                        </View>

                        <View className="flex-1 justify-between flex-row mt-1">
                            <View className="mr-2 flex-1 w-full h-44 gap-3 bg-green-100 rounded-lg items-center justify-center">
                                <Text className="text-green-800 font-black text-md">Cashback</Text>
                                <Text className="text-3xl text-green-800">1000</Text>
                                <Text className="text-green-800 font-black text-md mt-3">Tipo</Text>
                                <Text className="text-3xl text-green-800">Livre</Text>
                            </View>
                            <View className="ml-2 flex-1 w-full h-44 gap-3 border border-gray-300 rounded-lg items-center justify-center">
                                <Text className="text-md font-black">Send</Text>
                                <Text className="text-3xl">1000</Text>
                                <Text className="mt-3 text-md font-black">Burn</Text>
                                <Text className="text-3xl">1000</Text>
                            </View>
                        </View>

                        <View className="flex-1 mt-6 h-14 flex w-full pt-2">
                            <TouchableHighlight
                                onPress={() => withdrawNavigation.navigate('WithdrawSucess')}
                                underlayColor="#e5e7eb"
                                activeOpacity={0.6}
                                style={{ borderRadius: 8 }}
                            >
                                <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                    <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faPaperPlane} />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
