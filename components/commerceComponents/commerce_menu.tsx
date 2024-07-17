import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, ScrollView, KeyboardAvoidingView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../types/navigationTypes";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import QRCodeIcon from "../../assets/icons/qrcodeIcon";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_1'>;

export default function CommerceMenu() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [showSidebar, setShowSidebar] = useState(false);
    const commerceDatas = [{
        name: 'Nome do comercio',
    }];

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
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("home")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 3 }}>
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

                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate('commerce_credit_extract')}
                    >
                        <View className={"w-full pt-8 gap-3 px-5 pb-5 border-t border-gray-300 mt-5 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <Feather name="play" size={24} color="#0A3A74" style={{ marginLeft: 4 }} />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                Extrato de créditos
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <Feather name="eye" size={24} color="#0A3A74" />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                Ver versão publicada
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate('commerce_edit')}
                    >
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <SimpleLineIcons name="pencil" size={24} color="#0A3A74" />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                Editar
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={()=> commerceNavigation.navigate('commerce_access_manager')}
                    >
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <Feather name="users" size={24} color="#0A3A74" />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                Gerir acessos
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity>
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <QRCodeIcon size={24} color="#0A3A74" />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                QR Code
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => commerceNavigation.navigate('commerce_credit_extract')}
                    >
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#DEEDFF] items-center justify-center">
                                <Octicons name="list-unordered" size={24} color="#0A3A74" />
                            </View>
                            <Text className={"text-2xl font-normal"}>
                                Extrato de créditos
                            </Text>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity>
                        <View className={"w-full gap-3 p-5 border-t border-gray-300 flex-row items-center"}>
                            <View className="h-14 w-14 rounded-full bg-[#FFE0E0] items-center justify-center">
                                <Feather name="trash" size={24} color="#DC3545" />
                            </View>
                            <Text className={"text-2xl font-normal text-red-500"}>
                                Eliminar estabelecimento
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View className={"w-full gap-2 p-5 border-t border-gray-300 flex-row items-center"}></View>



                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

