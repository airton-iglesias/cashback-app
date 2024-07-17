import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, ScrollView, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../types/navigationTypes";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_1'>;

export default function CommerceCreditExtract() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const commerceDatas = [{
        name: 'Nome do comercio',
    }];


    const openSidebar = () => {
        setShowSidebar(true);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => {
            setShowSidebar(false);
        }, 300);
    };

    useEffect(() => {
        const backAction = () => {
            if (isSidebarOpen) {
                closeSidebar();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [isSidebarOpen, closeSidebar]);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="relative items-start justify-end px-8 w-full h-24">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("commerce_menu")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-3xl ml-6 mb-1 font-bold">Extrato de Crédito</Text>
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'flex-end', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View className={"w-full gap-3 px-5 pb-5 mt-5"}>
                        <View className="relative border rounded-xl p-4 justify-center items-center gap-4 border-[#DBDBDB]">
                            <View className="w-full justify-between flex-row">
                                <View className="border border-[#DBDBDB] p-2 rounded-lg">
                                    <Text className="text-xl text-gray-700">2/06</Text>
                                </View>
                                <Text className="text-4xl font-bold text-teal-700">50,00</Text>
                                <View className="h-10 w-10 bg-red-100 justify-center items-center rounded-lg">
                                    <Feather name="trash" size={20} color="#DC3545" />
                                </View>
                            </View>

                            <Text className="text-2xl font-bold">ID</Text>
                        </View>
                    </View>
                    <View className={"w-full gap-3 px-5 pb-5 mt-5"}>
                        <View className="relative border rounded-xl p-4 justify-center items-center gap-4 border-[#DBDBDB]">
                            <View className="w-full justify-between flex-row">
                                <View className="border border-[#DBDBDB] p-2 rounded-lg">
                                    <Text className="text-xl text-gray-700">2/06</Text>
                                </View>
                                <Text className="text-4xl font-bold text-[#DC3545]">50,00</Text>
                                <View className="h-10 w-10 bg-red-100 justify-center items-center rounded-lg">
                                    <Feather name="trash" size={20} color="#DC3545" />
                                </View>
                            </View>

                            <View className="flex-row justify-between w-full">
                                <Text className="text-xl">Eliminado por</Text>
                                <Text className="text-2xl font-bold mr-2">ID</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

