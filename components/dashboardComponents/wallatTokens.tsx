import { View, Text, ScrollView } from "react-native";
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function WallatTokens() {
    const itemDatas =[
        {
            tokensAmount: "50,00",
            creditsAmount: "50,00",
            token: "X",
            blockChain: "XXXX",
            wallatLink: "lorenipsunsdocklorenipsunsdockloreni..."
        }
    ]
    return (
        <ScrollView>
            <View className="flex-1">
                <View className='pt-4 px-5 gap-4 justify-between flex-row w-full'>

                    <View className='w-[55%] h-40 flex-col bg-[#D2F4EA] justify-center items-center rounded-3xl p-4 mt-2 gap-4'>
                        <Text className='text-5xl font-black text-center text-teal-800'>{itemDatas[0].tokensAmount}</Text>
                        <Text className='text-center text-2xl text-teal-800 font-black mr-2'>Tokens</Text>
                    </View>
                    <View className='w-[40%] h-40 flex-col bg-red-100 justify-center items-center rounded-3xl p-4 mt-2 gap-4'>
                        <Feather name="lock" size={28} color="#991b1b" />
                        <Text className='text-5xl font-black text-center text-red-800'>{itemDatas[0].tokensAmount}</Text>
                        <Text className='text-center text-2xl text-red-800 font-black mr-2'>Créditos</Text>
                    </View>
                </View>

                <View className="h-10 px-5 mt-10 mb-3">
                    <Text className={'text-3xl font-bold mb-2'}>Depositar token</Text>
                </View>

                <View className="px-5">
                    <View className="flex-row justify-between border-b border-gray-300 items-center h-14">
                        <Text className="text-2xl">Token</Text>
                        <Text className="text-2xl text-blue-500">{itemDatas[0].token}</Text>
                    </View>
                    <View className="flex-row justify-between border-b border-gray-300 items-center h-14">
                        <Text className="text-2xl">blockchain</Text>
                        <Text className="text-2xl text-blue-500">{itemDatas[0].blockChain}</Text>
                    </View>
                    <View className="flex-col h-24 border-b border-gray-300 justify-center h-14 py-4">
                        <Text className="text-2xl">Carteira de depósito</Text>
                        <View className="flex-row items-center justify-between">
                            <Text className="text-2xl mt-3 text-blue-500">{itemDatas[0].wallatLink}</Text>
                            <Ionicons style={{ marginLeft: 4, marginTop: 5 }} name="copy-outline" size={18} color="black" />
                        </View>
                    </View>
                    <View className="w-full flex-row h-28 bg-yellow-100 border border-yellow-200 rounded-xl items-center mt-8">
                        <View className="h-full items-center justify-center w-14 pl-4">
                            <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                        </View>
                        <View className="flex-1 p-4">
                            <Text className="text-2xl text-yellow-700">
                                Qualquer dado mal colocado pode  levar a perda irreversível do seu deposito.
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}