import { ScrollView, TextInput, View, Text } from "react-native";
import LoyaltyComponent from "./loyaltyComponent";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Entypo } from '@expo/vector-icons';

export default function WallatCredits() {
    return (
        <View className="flex-1">
            <View className={'pt-4 px-4'}>
                <View className={'flex-row bg-gray-200 justify-between items-center rounded-lg p-4 mt-2'}>
                    <Text className={'text-4xl font-bold text-center'}>50,00</Text>
                    <View className="flex-row">
                        <Text className={'text-center text-2xl font-semibold mr-2'}>cEUR</Text>
                        <Entypo name="chevron-small-down" size={24} color="black" />
                    </View>
                </View>
            </View>

            <View className="h-10 px-4 mt-8">
                <View className="h-full border-b border-gray-300 ">
                    <Text className={'text-2xl font-bold mb-2'}>Fidelidade</Text>
                </View>
            </View>

            <View className="justify-center px-4 mt-3">
                <View className="justify-center">
                    <FontAwesomeIcon
                        icon={faSearch}
                        size={18}
                        style={{ color: 'gray', position: 'absolute', marginLeft: 14 }}

                    />
                    <TextInput
                        placeholder="Buscar"
                        className="border border-[#D7D7D7] rounded-xl w-full h-14 pl-12 pr-5 text-xl text-gray-500"
                    />
                </View>
            </View>

            <ScrollView className="px-5 mt-4 mb-24">
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
                <LoyaltyComponent />
            </ScrollView>
        </View>
    );
}