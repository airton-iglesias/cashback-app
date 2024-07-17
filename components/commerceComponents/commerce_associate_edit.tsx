import { SafeAreaView, View, Text, TouchableOpacity, BackHandler, ScrollView, KeyboardAvoidingView, TextInput, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CommerceStackParamList } from "../../types/navigationTypes";
import { useEffect, useState } from "react";
import { Feather } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_1'>;

export default function CommerceAssociateEdit() {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
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
                    <View className="relative items-start justify-end px-8 w-full h-24 mt-2">
                        <TouchableOpacity onPress={() => commerceNavigation.navigate("commerce_access_manager")} style={{ position: 'absolute', left: 20, width: 40, height: 40, justifyContent: 'center', alignItems: 'flex-start', paddingBottom: 3 }}>
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


                    <View className={"w-full pt-6 gap-3 px-5 pb-5 border-t border-gray-300 mt-5"}>
                        <Text className="text-xl">ID</Text>
                        <TextInput
                            cursorColor={'#ADB5BD'}
                            value={'355643'}
                            className={`border rounded-lg w-full h-14 px-5 text-xl text-gray-500 border-[#DEE2E6]`}
                        />
                    </View>

                    <View className="px-5">
                        <TouchableOpacity style={{ width: '100%' }}>
                            <View className="flex-row items-center gap-3 w-full border-b border-[#DFDFDF] pb-6">
                                <View className="h-16 w-16 rounded-full items-center justify-center bg-[#CADCFF]">
                                    <Text className="text-[#0093FD] text-2xl font-bold">Pe</Text>
                                </View>
                                <View>
                                    <Text className="text-2xl">Pedro</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="px-5">
                        <View className="items-center flex-row justify-between border-b border-[#DFDFDF] py-1 mt-8">
                            <Text className="text-2xl">Administrador</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View className="items-center flex-row justify-between border-b border-[#DFDFDF] py-1">
                            <Text className="text-2xl">Pode ver registros</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View className="items-center flex-row justify-between border-b border-[#DFDFDF] py-1">
                            <Text className="text-2xl">Pode ver e apagar registros</Text>
                            <Switch
                                trackColor={{ false: '#767577', true: '#81b0ff' }}
                                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View className="items-center flex-row justify-between border-b border-[#DFDFDF] py-5">
                            <Text className="text-2xl text-red-500">Desassociar conta</Text>
                            <Feather name="trash" size={24} color="#DC3545" style={{ marginRight: 10 }} />
                        </View>
                    </View>

                    <View className="flex-1 w-full h-full justify-end px-5">
                        <View className=" w-full rounded-full w-20 h-20 justify-center items-center pb-8">
                            <TouchableOpacity
                                onPress={() => commerceNavigation.navigate("commerce_access_manager")}
                                style={{ borderRadius: 8, width: '100%', alignItems: 'center', justifyContent: 'center' }}
                            >
                                <View className="flex flex-row gap-2 border bg-black w-full h-14 justify-center items-center p-4 rounded-lg">
                                    <Feather name="check" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

