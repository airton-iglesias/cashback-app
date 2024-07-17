import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";
import { Feather } from '@expo/vector-icons';


type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_4() {

    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const [isChecked, setChecked] = useState(false);

    const typesOptions = [
        { id: 1, text: 'Promoção', flag: 'PT' },
        { id: 2, text: 'Evento', flag: 'BR' },
    ];
    const currencyOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },

    ];

    const handleCheck = () => {
        setChecked(!isChecked);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_3")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Imagens e videos</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full pt-8 gap-2 px-5 mt-8 border-t border-gray-300"}>
                        <Text className={"text-2xl font-normal"}>
                            Logomarca
                        </Text>
                        <View className="w-full  mt-6">
                            <View className="flex-row gap-8 w-24 h-24 bg-[#D9D9D9] rounded-lg items-center justify-center">
                                <Feather name="upload" size={24} color="black" />
                            </View>
                        </View>
                    </View>

                    <View className={"w-full mt-8 gap-2 px-5"}>
                        <Text className={"text-2xl font-normal"}>
                            Cartaz
                        </Text>
                        <View className="w-full  mt-6">
                            <View className="flex-row gap-8 w-24 h-24 bg-[#D9D9D9] rounded-lg items-center justify-center">
                                <Feather name="upload" size={24} color="black" />
                            </View>
                        </View>
                    </View>

                    <View className={"w-full mt-8 gap-2 px-5"}>
                        <View className="flex-row justify-between">
                            <Text className={"text-2xl font-normal"}>
                                Imagens de descrição
                            </Text>
                            <Text className={"text-2xl font-normal"}>
                                0/10
                            </Text>
                        </View>
                        <ScrollView horizontal={true} className="w-full flex-row gap-4 mt-6">
                            <View className="w-full flex-row gap-4">
                                <View className="gap-8 w-24 h-24 bg-[#D9D9D9] rounded-lg items-center justify-center">
                                    <Feather name="upload" size={24} color="black" />
                                </View>

                                <View className="gap-8 w-24 h-24 bg-[#D9D9D9] rounded-lg items-center justify-center"></View>
                                <View className="gap-8 w-24 h-24 bg-[#D9D9D9] rounded-lg items-center justify-center"></View>
                            </View>
                        </ScrollView>
                    </View>








                    <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-8">
                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_5")}
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={{ borderRadius: 8 }}
                        >
                            <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faArrowRight} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}