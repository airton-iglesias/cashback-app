import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, Image, ScrollView } from "react-native";
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

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_1'>;

export default function CommerceHome() {
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
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {showTopbar && <Topbar openSidebar={openSidebar} />}
            {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
            {haveCommerce ?
                <ScrollView>
                    <View className="w-full py-6 px-6">
                        <Text className="text-xl font-bold">Estabelecimentos</Text>
                    </View>
                    <View className="px-6 relative border-b py-5 border-[#D8D8D8] bg-gray-100">
                        <TouchableOpacity
                            onPress={()=> commerceNavigation.navigate('commerce_menu')}
                        >
                            <View className="relative flex-row">
                                <Image source={require('../../assets/images/sorveteria.png')} className="h-24 w-24" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da loja</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-green-100 p-1 w-24 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-green-800">Permanente</Text>
                                    </View>
                                </View>
                                <View className="absolute h-12 bg-[#B2B2B2] w-1 -bottom-12 left-11"></View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className="relative flex-row mt-10">
                                <Image source={require('../../assets/images/sorveteria2.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da promoção</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-cyan-100 p-1 w-20 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-cyan-800">Promoção</Text>
                                    </View>
                                </View>
                                <View className="absolute h-12 bg-[#B2B2B2] w-1 -bottom-12 left-11"></View>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <View className="relative flex-row mt-10">
                                <Image source={require('../../assets/images/sorveteria3.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome do evento</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-yellow-100 p-1 w-16 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-yellow-800">Evento</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View className="py-8 px-6 relative">
                        <TouchableOpacity>
                            <View className="relative flex-row ">
                                <Image source={require('../../assets/images/bar1.png')} className="h-24 w-24" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da loja</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-green-100 p-1 w-24 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-green-800">Permanente</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View className="relative flex-row mt-10">
                                <Image source={require('../../assets/images/bar2.png')} className="h-24 w-24 rounded-full" />
                                <View className="justify-between px-8">
                                    <Text className="text-2xl">Nome da promoção</Text>
                                    <View className="flex-row items-center gap-2">
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text className="text-xl text-[#635C5C]">Administrador</Text>
                                        <View className="flex-row items-center">
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text className="text-xl ml-1 text-[#635C5C]">ID</Text>
                                        </View>
                                    </View>
                                    <View className="bg-cyan-100 p-1 w-20 items-center justify-center rounded-lg">
                                        <Text className="text-md font-bold text-cyan-800">Promoção</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                :
                <View className="flex-1 items-center justify-start pt-24 w-full h-full">
                    <MoonStarIcon />
                    <Text className="text-2xl font-semibold text-gray-600 w-48 text-center mt-8">
                        Crie um novo estabelecimento, evento ou promoção
                    </Text>
                </View>
            }
            <TouchableOpacity onPress={() => commerceNavigation.navigate("new_commerce_0")}
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
        </SafeAreaView>
    );
}

