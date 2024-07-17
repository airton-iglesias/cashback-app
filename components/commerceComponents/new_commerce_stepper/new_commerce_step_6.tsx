import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_6() {

    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [types, setTypes] = useState<number>(0);
    const typesOptions = [
        { id: 1, text: 'Fidelização' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_5")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Mais informações</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full pt-8 gap-2 px-5 mt-8 border-t border-gray-300"}>
                        <Text className={"text-2xl font-normal"}>
                            Email para a nossa equipa o contatar
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                            />
                        </View>
                    </View>


                    <View className={"w-full pt-4 gap-2 px-5 pb-14 border-gray-300"}>
                        <View className="w-full flex-row h-80 bg-yellow-100 border border-yellow-200 rounded-xl items-center mt-8">
                            <View className="flex-1 px-5 py-3">
                                <Text className="text-2xl text-yellow-700">
                                    Vamos contata-lo por email, para encontrar a melhor forma de os nossos clientes se tonarem vossos clientes.
                                </Text>
                                <Text className="text-2xl text-yellow-700 mt-4">
                                    Indique um email seguro, com retorno rápido.
                                </Text>
                            </View>
                            <View className="h-full items-start justify-start w-12 pl-8 pt-4">
                                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-8">
                    <TouchableHighlight
                        onPress={() => commerceNavigation.navigate("new_commerce_7")}
                        underlayColor="#e5e7eb"
                        activeOpacity={0.6}
                        style={{ borderRadius: 8 }}
                    >
                        <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableHighlight>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}