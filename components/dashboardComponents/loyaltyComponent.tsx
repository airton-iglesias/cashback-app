import {View, Text } from "react-native";

export default function LoyaltyComponent() {
    return (
        <View className='flex-row justify-between items-center mb-2 border-b pb-2 border-gray-300'>
            <View className="w-full flex-1 ">
                <Text className='text-lg'>Item</Text>
                <Text className='text-xl mt-1'>Nome</Text>
            </View>
            <View className='flex-1 w-full flex-row items-center'>
                <View className="flex-1 w-full items-end pl-2">
                    <Text className='text-lg'>Valor</Text>
                    <Text className='text-xl mt-1'>100,00</Text>
                </View>
                <View className="flex-1 w-full items-end pl-2">
                    <Text className='text-lg'>Limite</Text>
                    <Text className='text-xl mt-1'>2000,00</Text>
                </View>
            </View>
        </View>
    );
}
