import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, Image, ScrollView, TouchableHighlight, KeyboardAvoidingView, TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../types/navigationTypes";
import { FontAwesome6 } from '@expo/vector-icons';
import MoonStarIcon from "../../assets/icons/moonStarIcon";
import Topbar from "../header";
import Sidebar from "../sidebar";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from "../../assets/icons/qrcodeIcon";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_1'>;

export default function CommerceAccessManager() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);
    const [haveCommerce, setHaveCommerce] = useState(true);
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
                    <View className="relative items-start justify-end px-8 w-full h-24 mt-2">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate('commerce_menu')} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 3 }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>

                        <View className="justify-end">
                            <Text className="text-3xl ml-6 font-bold">Soverteria - Loja 1</Text>
                            <Text className="text-xl ml-6 font-bold text-[#635C5C]">32594</Text>
                        </View>

                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', right: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-end', paddingBottom: 3 }}>
                            <AntDesign name="close" size={24} color="black" />
                        </TouchableOpacity>
                    </View>


                    <View className={"w-full pt-8 gap-3 px-5 pb-5 border-t border-gray-300 mt-5 flex-row items-center"}>
                        <Text className={"text-3xl font-bold"}>
                            Gerir acessos
                        </Text>
                    </View>
                    <View className="flex-row gap-3 items-center w-full px-5 mt-5">
                        <View className="flex-row items-center gap-3 w-full border-b border-[#DFDFDF] pb-4">
                            <Image source={require("../../assets/images/sorveteria.png")} className="h-16 w-16 rounded-full" />
                            <View>
                                <Text className="text-2xl">Nome atrelado ao ID</Text>
                                <Text className="text-xl mt-2">#32594</Text>
                            </View>
                        </View>
                    </View>

                    <View className="flex-row gap-3 items-center w-full px-5 mt-4">
                        <TouchableOpacity 
                            onPress={() => commerceNavigation.navigate("commerce_associate_edit")}
                            style={{ width: '100%' }}
                        >
                            <View className="flex-row items-center gap-3 w-full border-b border-[#DFDFDF] pb-4">
                                <View className="h-16 w-16 rounded-full items-center justify-center bg-[#CADCFF]">
                                    <Text className="text-[#0093FD] text-2xl font-bold">Pe</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl">Pedro</Text>
                                    <Text className="text-xl mt-2">#32594</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row gap-3 items-center w-full px-5 mt-4">
                        <View className="flex-row items-center gap-3 w-full border-b border-[#DFDFDF] pb-4">
                            <View className="h-16 w-16 rounded-full items-center justify-center bg-[#FFDADA]">
                                <Text className="text-[#B72E2E] text-2xl font-bold">Fe</Text>
                            </View>
                            <View>
                                <Text className="text-2xl">Fernanda</Text>
                                <Text className="text-xl mt-2">#32594</Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => commerceNavigation.navigate("commerce_add_access")}
                        style={{
                            width: 78,
                            height: 78,
                            bottom: 18,
                            right: 18,
                            borderRadius: 999,
                            position: "absolute",
                            backgroundColor: 'black',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: "#000000",
                            shadowOffset: {
                                width: 0,
                                height: 4,
                            },
                            shadowOpacity: 0.30,
                            shadowRadius: 4.65,
                            elevation: 8,
                        }}
                    >

                        <FontAwesome6 name="plus" size={24} color="white" />

                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

