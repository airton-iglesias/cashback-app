import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { Image, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export default function Pin() {
    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    const [pinValue, setPinValue] = useState<string>('');
    const buttons = Array.from({ length: 9 }, (_, i) => i + 1);

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 gap-8 pb-32 justify-center items-center">
                <Text className="text-xl font-bold bg-gray-200 p-8 rounded-full">PIN SCREEN</Text>

                <TextInput
                   className="border border-gray-400 w-72 h-14 justify-center items-center text-center p-4 rounded-lg"
                   placeholder="Pin"
                   secureTextEntry={true}
                   value={pinValue}
                   onChangeText={setPinValue}
                />

                <View className="flex flex-wrap flex-row justify-center items-center px-12 gap-10">
                    {buttons.map((value) => (
                        <TouchableHighlight
                            key={value}
                            onPress={() => setPinValue((prev) => prev + value.toString())}
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={{ borderRadius: 8 }}
                        >
                            <View className="w-16 h-16 bg-blue-600 justify-center items-center p-4 rounded-lg">
                                <Text className="text-white">{value}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                </View>

                <TouchableHighlight onPress={() => navigation.dispatch(CommonActions.reset({index: 0,routes: [{ name: 'Dashboard' }],}))} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="w-72 bg-blue-600 justify-center items-center p-4 rounded-lg">
                        <Text className="text-white">Enter</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
}
