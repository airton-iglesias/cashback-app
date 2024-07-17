import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Select from "../../select";
import SelectOption from "../../selectOption";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_5() {

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
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_4")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Cashback</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full pt-8 gap-2 px-5 mt-8 border-t border-gray-300"}>
                        <Text className={"text-2xl font-normal"}>
                            Desconto base em %
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                placeholder="10%"
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                placeholderTextColor={'#ADB5BD'}
                            />
                        </View>
                    </View>
                    <View className={"w-full pt-4 gap-2 px-5"}>
                        <Text className={"text-2xl font-normal"}>
                            Tipo de Cashback
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <Select
                                options={typesOptions}
                                onChangeSelect={(id: number) => setTypes(id)}
                                text={'Fidelização'}
                                SelectOption={SelectOption}
                            />
                        </View>
                    </View>
                    <View className="relative justify-between flex-row px-5 gap-3 mt-14 border-t border-gray-300">
                        <View className="absolute h-10 w-10 items-center justify-center right-10 -top-5 border border-gray-300 bg-white rounded-full p-2">
                            <FontAwesome6 name="plus" size={16} color="black" />
                        </View>
                        <View className={"w-[40%] pt-4 gap-2 mt-6"}>
                            <Text className={"text-2xl font-normal"}>
                                Valor mínimo
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    placeholder="500c"
                                    placeholderTextColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                />
                            </View>
                        </View>
                        <View className={"w-[60%] pt-4 gap-2 mt-6 pr-5"}>
                            <Text className={"text-2xl font-normal"}>
                                Desconto da etapa em %
                            </Text>
                            <View className={"relative justify-center items-center"}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                    placeholder="20%"
                                    placeholderTextColor={'#ADB5BD'}
                                />
                            </View>
                        </View>
                    </View>

                    <View className={"w-full pt-4 gap-2 px-5 border-b pb-14 border-gray-300"}>
                        <Text className={"text-2xl font-normal"}>
                            Tipo de Cashback
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <Select
                                options={typesOptions}
                                onChangeSelect={(id: number) => setTypes(id)}
                                text={'Fidelização'}
                                SelectOption={SelectOption}
                            />
                        </View>

                        <View className="absolute h-10 w-10 items-center justify-center right-10 -bottom-5 border border-gray-300 bg-white rounded-full p-2">
                            <FontAwesome6 name="plus" size={16} color="black" />
                        </View>
                        <View className="absolute h-10 w-10 items-center justify-center right-24 -bottom-5 border border-gray-300 bg-white rounded-full p-2">
                            <Feather name="trash" size={16} color="black" />
                        </View>
                    </View>
                </ScrollView>

                <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-8">
                    <TouchableHighlight
                        onPress={() => commerceNavigation.navigate("new_commerce_6")}
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