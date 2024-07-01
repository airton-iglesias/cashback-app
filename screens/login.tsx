import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { Image, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export default function LoginScreen() {

    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    const [isChecked, setChecked] = useState(false);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 gap-8 pb-32 justify-center items-center">
                <Text className="text-xl font-bold bg-gray-200 p-8 rounded-full">LOGIN SCREEN</Text>

                <TextInput
                   className="border border-gray-400 w-72 h-14 text-center justify-center items-center p-4 rounded-lg"
                   placeholder="Username"
                />

                <TextInput
                    textContentType="password"
                    secureTextEntry={true}
                    className="border border-gray-400 w-72 h-14 text-center justify-center items-center p-4 rounded-lg"
                    placeholder="Password"
                />

                <View className="w-full px-20 flex flex-row justify-between">
                    <View className="flex flex-row gap-2">
                        <Checkbox style={{borderRadius: 5, borderWidth: 1}} value={isChecked} onValueChange={setChecked}/>
                        <Text>Remember</Text>
                    </View>
                    <View>
                        <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                            <Text className="text-blue-600">Forgot Password?</Text>
                        </TouchableWithoutFeedback>
                    </View>
                </View>


                <TouchableHighlight onPress={() => navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'Dashboard' }],}))} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="w-72 bg-blue-600 justify-center items-center p-4 rounded-lg">
                        <Text className="text-white">Login</Text>
                    </View>
                </TouchableHighlight>

                <View className="relative full flex flex-row justify-center items-center px-20">
                    <View className="absolute w-full border-b border-gray-400 border-1"></View>
                    <Text className="bg-gray-100 px-4">OR</Text> 
                </View>


                <TouchableHighlight onPress={() => navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'Dashboard' }],}))} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="flex flex-row gap-2 border border-1 border-gray-400 w-72 justify-center items-center p-4 rounded-lg">
                        <Image source={require("../assets/google-icon.png")} className="w-6 h-6" />
                        <Text>Google</Text>
                    </View>
                </TouchableHighlight>

                <View className="absolute flex flex-row gap-1 justify-center items-center w-full h-16 bg-gray-200 bottom-0">
                    <Text className="text-lg">Don't have account?</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                        <Text className="text-lg text-blue-600">Sign Up</Text>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </SafeAreaView>
    );
  }