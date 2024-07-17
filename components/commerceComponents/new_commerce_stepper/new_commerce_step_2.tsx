import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_2() {

    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');
    const [country, setCountry] = useState<number>(0);
    const [currency, setCurrency] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);

    const typesOptions = [
        { id: 1, text: 'Promoção', flag: 'PT' },
        { id: 2, text: 'Evento', flag: 'BR' },
    ];
    const currencyOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },

    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_1")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Local e horário</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full pt-4 gap-2 px-5 border-t border-gray-300 mt-6"}>
                        <Text className={"text-2xl font-normal"}>
                            Web Site (http://www...)
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                            />
                        </View>
                    </View>
                    <View className="justify-between flex-row px-5 gap-5">

                        <View className={"flex-1 w-full pt-4 gap-2"}>
                            <Text className={"text-2xl font-normal"}>
                                Data de início
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>

                        <View className={"flex-1 w-full pt-4 gap-2"}>
                            <Text className={"text-2xl font-normal"}>
                                Data de fim
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                    </View>

                    <View className="justify-between flex-row px-5 gap-5">
                        <View className={"flex-1 w-full pt-4 gap-2"}>
                            <Text className={"text-2xl font-normal"}>
                                Hora de início
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                        <View className={"flex-1 w-full pt-4 gap-2"}>
                            <Text className={"text-2xl font-normal"}>
                                Hora de fim
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                    </View>

                    <View className={"w-full pt-4 gap-2 px-5"}>
                        <Text className={"text-2xl font-normal"}>
                            Local do estabelecimento
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                placeholder="Complexo Desportivo municipa do..."
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                            />
                        </View>
                    </View>

                    <View className="px-5 w-full h-56 mt-6">
                        <View className="w-full h-full bg-gray-300 rounded-lg items-center justify-center">
                            <Text className="text-3xl">Maps</Text>
                        </View>
                    </View>

                    <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-8">
                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_3")}
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
