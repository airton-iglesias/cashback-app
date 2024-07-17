import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SearchComponent from "./SearchComponent";
import { useState } from "react";

export default function Search({ route }: any) {

    const { openFilterSidebar } = route.params;

    const itemsDatas = [
        {
            haveCupom: false,
            haveLocation: false,
            name: "Rei do Bacalhau",
            description: "Descrição curta da loja e produtos",
            location: "Beja, Portugal",
            distance: "3km",
            discount: "10%",
            site: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            baseDiscount: "10%",
            discountAbove100: "20%",
            discountAbove200: "30%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        },
    ];

    const handleOpenFilterSidebar = () => {
        openFilterSidebar();
    };

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const handleItemPress = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
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
                <View className="w-14 h-14 bg-[#EEEEEE] justify-center items-center rounded-lg ml-3">
                    <Ionicons name="location-outline" size={24} color="#374151" />
                </View>
                <View className="w-14 h-14 bg-[#EEEEEE] justify-center items-center rounded-lg">
                    <TouchableOpacity onPress={handleOpenFilterSidebar} style={{ borderRadius: 8, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="filter-list" size={24} color="#374151" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView className="flex-col mb-24">
                <SearchComponent
                    datas={itemsDatas}
                    onItemPress={handleItemPress}
                    modalVisible={modalVisible}
                    selectedItem={selectedItem}
                    onCloseModal={handleCloseModal}
                />
            </ScrollView>
        </SafeAreaView>
    );
}