import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { Image, SafeAreaView, ScrollView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function WallatScreen() {
    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    
    return (
        <SafeAreaView className="flex items-start flex-col">
            <ScrollView>    
                <View className="w-full h-72 p-4 mt-8">
                    <View className="bg-gray-300 gap-8 p-8 w-full h-full rounded-lg">
                        <Text className="text-xl">Balance</Text>
                        <Text className="text-6xl font-bold">€ 1,300.00</Text>

                        <TouchableHighlight onPress={() => navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'Dashboard' }],}))} 
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={{ borderRadius: 8 }}
                        >
                            <View className="w-32 bg-blue-600 justify-center items-center p-4 rounded-lg">
                                <Text className="text-white">Withdraw</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>
                <View className="px-6 mt-10 flex flex-row justify-between w-full">
                    <Text className="text-xl font-bold">Today</Text>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                
                <View className="px-6 mt-3 border-y border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
                <View className="px-6 border-b border-gray-400 flex flex-row justify-between h-20 items-center w-full">
                    <View className="">
                        <View className="flex flex-row items-center gap-2">
                            <View className="w-16 h-16">
                                <Image className="w-full h-full" source={require('../assets/user-icon-2.png')}/>
                            </View>
                            <View>
                                <Text className="text-xl font-bold">Starbucks</Text>
                                <Text>1h ago</Text>
                            </View>
                        </View>
                    </View>
                    <Text className="text-gray-500 font=bold text-lg">-9.50</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
  }