import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from './types';
import { SafeAreaView, Text, TouchableHighlight, View } from "react-native";

export default function HomeScreen() {
    const navigation = useNavigation< NavigationProp<RootStackParamList> >();
    
    return (
        <SafeAreaView className="flex-1">
            <View className="flex-1 gap-4 justify-center items-center">
                <Text className="text-xl font-bold bg-gray-200 p-8 rounded-full">HOME SCREEN</Text>
                <TouchableHighlight onPress={() => navigation.navigate('Login')} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="bg-blue-600 w-72 justify-center items-center p-4 rounded-lg">
                        <Text className="text-white">Login</Text>
                    </View>
                </TouchableHighlight>

                <TouchableHighlight onPress={() => navigation.navigate('Register')} 
                    underlayColor="#e5e7eb"
                    activeOpacity={0.6}
                    style={{ borderRadius: 8 }}
                >
                    <View className="bg-blue-600 w-72 justify-center items-center p-4 rounded-lg">
                        <Text className="text-white">Register</Text>
                    </View>
                </TouchableHighlight>
            </View>
        </SafeAreaView>
    );
  }