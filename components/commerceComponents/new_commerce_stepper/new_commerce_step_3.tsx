import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../../types/navigationTypes";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_3() {

    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_2")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-4xl ml-6 font-bold">Descrição</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full pt-4 gap-2 px-5"}>
                        <Text className={"text-2xl font-normal"}>
                            Descreva o evento
                        </Text>
                        <View className="w-full">
                            <View className="flex-row gap-8 w-full bg-[#F1F1F1] h-14 rounded-lg items-center justify-center">
                                <FontAwesome name="bold" size={24} color="black" />
                                <Fontisto name="italic" size={24} color="black" />
                                <Feather name="underline" size={24} color="black" />
                                <MaterialCommunityIcons name="brush-variant" size={24} color="black" />
                                <FontAwesome5 name="list-ol" size={24} color="black" />
                                <FontAwesome6 name="list" size={24} color="black" />
                                <Feather name="link" size={24} color="black" />
                            </View>
                        </View>
                        <View className={"relative justify-center items-center mt-3"}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                className={`border border-gray-300 rounded-lg w-full h-[37rem] px-5 text-xl text-gray-500`}
                            />
                        </View>
                    </View>

                    <View className="flex-1 w-full px-5 justify-end pb-6">
                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_4")}
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={{ borderRadius: 8 }}
                        >
                            <View className="flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                <FontAwesomeIcon style={{ color: 'white', padding: 11 }} icon={faArrowRight} />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>

    );
}