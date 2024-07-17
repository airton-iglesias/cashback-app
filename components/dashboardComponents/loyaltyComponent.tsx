import {View, Text } from "react-native";

export default function LoyaltyComponent({nome, valor, limite}:any) {
    return (
        <View className='flex-row justify-between items-center mb-2 border-b pb-3 border-gray-300'>
            <View className="w-full flex-1 ">
                <Text className='text-lg text-gray-800 font-semibold'>Item</Text>
                <Text className='text-2xl mt-2'>{nome}</Text>
            </View>
            <View className='flex-1 w-full flex-row items-center'>
                <View className="flex-1 w-full items-end ml-2">
                    <Text className='text-lg text-gray-800 font-semibold'>Valor</Text>
                    <Text className='text-2xl mt-2'>{valor}</Text>
                </View>
                <View className="flex-1 w-full items-end ml-2">
                    <Text className='text-lg text-gray-800 font-semibold'>Limite</Text>
                    <Text className='text-2xl mt-2'>{limite}</Text>
                </View>
            </View>
        </View>
    );
}
