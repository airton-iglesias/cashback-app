import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";
import Select from "../../select";
import SelectOption from "../../selectOption";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_1() {

    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');
    const [types, setTypes] = useState<number>(0);
    const [association, setAssociation] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);

    const typesOptions = [
        { id: 1, text: 'Promoção'},
        { id: 2, text: 'Evento'},
    ];
    const associationOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={()=> commerceNavigation.navigate("new_commerce_0")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Dados básicos</Text>
                        <TouchableOpacity onPress={()=> commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className={"w-full pt-4 gap-2 mt-6 px-5 border-t border-gray-300"}>
                        <Text className={"text-2xl font-normal"}>
                            Título
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                            />
                        </View>
                    </View>

                    <View className="justify-center items-center px-5">
                        <View className="w-full mt-1 gap-2 mt-4">
                            <Text className="text-2xl font-normal">
                                Associar
                            </Text>
                            <Select
                                options={typesOptions}
                                onChangeSelect={(id: number) => setTypes(id)}
                                text={''}
                                SelectOption={SelectOption}
                            />
                        </View>

                        <View className="w-full mt-1 gap-2 mt-4">
                            <Text className="text-2xl font-normal">
                                Creditar pontos no usuário
                            </Text>
                            <Select
                                options={associationOptions}
                                onChangeSelect={(id: number) => setAssociation(id)}
                                text={''}
                                SelectOption={SelectOption}
                            />
                        </View>
                    </View>

                    <View className={"w-full pt-4 gap-2 px-5 "}>
                        <Text className={"text-2xl font-normal"}>
                            Referido por
                        </Text>
                        <View className={"relative justify-center items-center"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                className={`border border-gray-300 rounded-lg w-full h-14 px-5 text-xl text-gray-500`}
                                placeholder="ID"
                            />
                        </View>
                    </View>

                    <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-44">
                        <TouchableHighlight
                            onPress={()=> commerceNavigation.navigate("new_commerce_2")}
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

