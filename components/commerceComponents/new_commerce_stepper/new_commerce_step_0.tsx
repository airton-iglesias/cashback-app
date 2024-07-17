import { View, Text, TouchableOpacity, TouchableHighlight, SafeAreaView, KeyboardAvoidingView, ScrollView } from "react-native";
import RadioCommerce from "../radioCommerce";
import { useState } from "react";
import RadioCommerceType from "../radioCommerceType";
import { CommerceStackParamList } from "../types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_0() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [selectedType, setSelectedType] = useState<number>(0);
    const [selected, setSelected] = useState<number>(0);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Novo</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View className={"w-full mt-1 gap-2 mt-6 px-5 items-center border-t pt-6 border-gray-300"}>
                        <Text className={"text-3xl font-bold mb-4"}>
                            Escolha um tipo
                        </Text>
                        <View className={"relative mt-1"}>
                            <RadioCommerceType
                                selected={selectedType}
                                options={['Permanente', 'Evento', 'Promoção']}
                                onChangeSelect={(opt: any, i: any) => setSelectedType(i)}
                            />
                        </View>
                    </View>

                    <View className={"w-full mt-1 gap-2 mt-10 px-5 items-center"}>
                        <Text className={"text-3xl font-bold"}>
                            Físico ou online?
                        </Text>
                        <View className={"relative mt-1"}>
                            <RadioCommerce
                                selected={selected}
                                options={['Físico', 'Web']}
                                onChangeSelect={(opt: any, i: any) => setSelected(i)}
                            />
                        </View>
                    </View>

                    <View className="flex-1 w-full px-5 h-full justify-end pb-6 pt-44">
                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_1")}
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