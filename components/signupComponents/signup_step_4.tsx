import { useNavigation, NavigationProp, CommonActions } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableHighlight, View } from "react-native";
import { useEffect, useState } from "react";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignupStackParamList } from "../../types";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type SignupStep4NavigationProp = NativeStackNavigationProp<SignupStackParamList, 'SignupStep4'>;

export default function SignupStep3({ route }: any) {
    const signupNavigation = useNavigation<SignupStep4NavigationProp>();
    
    const { email, password, country, currency, imageProfile, pin } = route.params;

    const [ConfirmPin, setConfirmPin] = useState<string>('');
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pressedButton, setPressedButton] = useState<number | null>(null);
    
    const handleDelete = () => {
        setConfirmPin((prev) => prev.slice(0, -1));
    };
    
    useEffect(() => {
        if (ConfirmPin.length === 6) {
            signupNavigation.navigate('SignupStep5');
        }
    }, [ConfirmPin, signupNavigation]);

    const handlePressIn = (value: number) => {
        setPressedButton(value);
    };

    const handlePressOut = () => {
        setPressedButton(null);
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center top-24">
                <Text className={"text-5xl font-bold mb-8"}>Confirmar pin</Text>
                <View className="w-full h-48 flex justify-center items-center">
                    <View className="flex-row justify-center items-center">
                        {Array(6).fill(0).map((_, index) => (
                            <Text key={index} className="text-5xl font-black mx-3">{ConfirmPin[index] ? ConfirmPin[index] : <Text className="text-[#848484]">•</Text>}</Text>
                        ))}
                    </View>
                </View>
                <View className="relative flex-wrap h-auto flex-row w-full px-5 justify-center items-center">
                    {buttons.map((value) => (
                        <TouchableHighlight
                            key={value}
                            onPress={() => setConfirmPin((prev) => prev.length < 6 ? prev + value.toString() : prev)}
                            underlayColor="#000000" 
                            onPressIn={() => handlePressIn(value)}
                            onPressOut={handlePressOut}
                            style={{backgroundColor: pressedButton === value ? '#000000' : '#d1d5db', marginRight: 16, marginLeft:16, marginTop: 16, marginBottom: 16, width: 70, height: 70, borderRadius: 999, display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <View className="m-4 rounded-full w-20 h-20 justify-center items-center">
                                <Text className="text-4xl font-black" style={{color: pressedButton === value ? '#ffffff' : '#000000'}}>{value}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}


                
                    <View  className="m-4 rounded-full w-20 h-20 justify-center items-center">
                    </View>
                    <View className="m-4 rounded-full w-20 h-20 justify-center items-center">
                    <TouchableHighlight
                            onPress={() => setConfirmPin((prev) => prev.length < 6 ? prev + 0 : prev)}
                            underlayColor="#000000" 
                            onPressIn={() => handlePressIn(0)}
                            onPressOut={handlePressOut}
                            style={{backgroundColor: pressedButton === 0 ? '#000000' : '#d1d5db', marginRight: 16, marginLeft:24, marginTop: 16, marginBottom: 16, width: 70, height: 70, borderRadius: 999, display: 'flex', justifyContent: 'center', alignItems:'center'}}
                        >
                            <View className="m-4 rounded-full w-20 h-20 justify-center items-center">
                                <Text className={`text-4xl font-black ${pressedButton === 0 ? 'text-white' : 'text-black'}`}>0</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                    <View className="m-4 rounded-full w-20 h-20 justify-center items-center">
                        <TouchableHighlight
                            onPress={handleDelete}
                            underlayColor="#000000"
                            onPressIn={() => handlePressIn(-1)} // To identify the delete button
                            onPressOut={handlePressOut}
                            style={{backgroundColor: pressedButton === -1 ? '#000000' : '#d1d5db', marginRight: 16, marginLeft:30, marginTop: 16, marginBottom: 16, width: 70, height: 70, borderRadius: 999, display: 'flex', justifyContent: 'center', alignItems:'center' }}
                        >
                            <View className="m-4 rounded-full w-20 h-20 justify-center items-center">
                                <MaterialCommunityIcons name="backspace-outline" size={32} color={pressedButton === -1 ? '#ffffff' : '#000000'} />
                            </View>
                        </TouchableHighlight>
                    </View>
             
                </View>
            </View>
        </SafeAreaView>
    );
}
