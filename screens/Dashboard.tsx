import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { Image, SafeAreaView, Text, TextInput, TouchableHighlight, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export default function DashboardScreen() {
    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    
    return (
        <SafeAreaView className="flex flex-col">
            <View className="flex flex-row items-center px-4 justify-between bg-gray-200 w-full mt-9 h-20">
                <View>
                    <Image className="h-12 w-12" source={require('../assets/burguer.png')}/>
                </View>
                <View>
                    <TextInput  placeholder="Procurar" className="border border-gray-400 w-72 h-14 justify-center items-center p-4 rounded-lg"/>
                </View>
                <View>
                    <Image className="h-12 w-12" source={require('../assets/user-icon-2.png')}/>
                </View>
            </View>
            <View className="w-full h-full pb-60 pt-2 justify-center items-center">
                <View className="relative flex justify-center items-center rounded-lg h-full w-full p-4">

                    <View className="absolute top-0 flex justify-center mt-4 items-end z-10 w-full h-24 overflow-hidden">
                        <View className="rounded-l-full bg-red-400 w-24 left-4 -top-2 -rotate-[20deg] h-full flex justify-center items-center">
                            <Text className="text-2xl text-white">10%</Text>
                        </View>
                    </View>

                    <View className="absolute z-10 px-3 w-full flex flex-row justify-between h-32">
                        <View>
                            <View className="bg-[#424242] p-2 rounded-full">
                                <FontAwesomeIcon style={{color:'white', padding:15}} icon={faChevronLeft} />
                            </View>
                        </View>
                        <View>
                            <View  className="bg-[#424242] p-2 rounded-full">
                                <FontAwesomeIcon style={{color:'white', padding:15}} icon={faChevronRight} />
                            </View>
                        </View>
                    </View>

                    <Image className="w-full rounded-lg h-full z-0" source={require('../assets/academia.png')}/>



                    <View className="absolute bottom-0 flex gap-1 w-full h-60 rounded-lg">
                        <View className="relative w-full h-full pb-4">
                            <View className="absolute w-full h-full rounded-b-lg bg-black opacity-50 z-10"></View>
                            <View className="p-4 z-20 flex flex-col gap-1">
                                <Text className="text-4xl font-bold text-white">Fitness Center</Text>
                                <View className="flex items-center flex-row">
                                    <Image className="w-7 h-5 rounded-lg" source={require('../assets/location-icon.png')}/>
                                    <Text className="text-xl font-bold text-white">Beja, portugal</Text>
                                </View>
                                <Text className="text-xl text-white">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s 
                                    when an unknown printer took a galley of type and scrambled it to make a 
                                    type specimen book.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
  }