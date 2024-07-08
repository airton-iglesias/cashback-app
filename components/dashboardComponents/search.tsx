import { SafeAreaView, ScrollView, TextInput, View } from "react-native";
import Topbar from "./topbar";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "./SearchComponent";

export default function Search() {

    return (
        <SafeAreaView className="flex-1">
            <Topbar />
            <View className="flex-row px-5 pt-5 gap-3">
                <View className="flex-1 justify-center">
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
                <View className="w-14 h-14 bg-gray-300 justify-center items-center rounded-lg ml-3">
                    <Ionicons name="location-outline" size={24} color="#374151" />
                </View>
                <View className="w-14 h-14 bg-gray-300 justify-center items-center rounded-lg">
                    <MaterialIcons name="filter-list" size={24} color="#374151" />
                </View>
            </View>

            <ScrollView className="flex-col mb-24">
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />
                <SearchComponent />

            </ScrollView>
 

        </SafeAreaView>
    );
}
