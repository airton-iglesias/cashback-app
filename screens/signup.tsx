import React, { useState } from 'react';
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { Image, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';

export default function SignUp() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const [isChecked, setChecked] = useState(false);
    const [image, setImage] = useState<any>(null);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImage(pickerResult.assets[0].uri);
        }
    };

    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 gap-8 pb-20 justify-center items-center">
                <Text className="text-xl font-bold bg-gray-200 p-8 rounded-full">REGISTER SCREEN</Text>

                <TouchableHighlight onPress={handleImagePick} underlayColor="#e5e7eb" style={{ borderRadius: 8 }}>
                    {image ? (
                        <Image source={{ uri: image }} className="text-xl h-16 w-16 font-bold bg-gray-200 p-12 rounded-full" />
                    ) : (
                        <Image source={require("../assets/user-icon.png")} className="text-xl h-16 w-16 font-bold bg-gray-200 p-12 rounded-full" />
                    )}
                </TouchableHighlight>

                <TextInput
                    className="border border-gray-400 w-40 h-14 justify-center items-center text-center p-4 rounded-lg"
                    placeholder="ID"
                    readOnly={true}
                />

                <TextInput
                    className="border border-gray-400 w-72 h-14 justify-center items-center text-center p-4 rounded-lg"
                    placeholder="Name"
                />

                <TextInput
                    className="border border-gray-400 w-72 h-14 justify-center items-center text-center p-4 rounded-lg"
                    placeholder="Email/Telefone"
                />
                
                <TextInput
                    className="border border-gray-400 w-72 h-14 justify-center items-center text-center p-4 rounded-lg"
                    placeholder="Codigo Bonús"
                />

                <TouchableHighlight onPress={() => navigation.navigate('Pin')}
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="bg-blue-600 w-72 justify-center items-center p-4 rounded-lg">
                        <Text className="text-white">Register</Text>
                    </View>
                </TouchableHighlight>

                <View className="relative full flex flex-row justify-center items-center px-20">
                    <View className="absolute w-full border-b border-gray-400 border-1"></View>
                    <Text className="bg-gray-100 px-4">OR</Text> 
                </View>

                <TouchableHighlight onPress={() => navigation.navigate('Pin')} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="flex flex-row gap-2 border border-gray-400 w-72 justify-center items-center p-4 rounded-lg">
                        <Image source={require("../assets/google-icon.png")} className="w-6 h-6" />
                        <Text>Google</Text>
                    </View>
                </TouchableHighlight>

                <View className="absolute flex flex-row gap-1 justify-center items-center w-full h-16 bg-gray-200 bottom-0">
                    <Text className="text-lg">Already have account?</Text>
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
                        <Text className="text-lg text-blue-600">Sign In</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        </SafeAreaView>
    );
}
