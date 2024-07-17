import { Image, View, Text, TouchableOpacity, Modal, ScrollView, TextInput } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import Carousel from "../carousel";
import CalendarIcon from "../../assets/icons/calendarIcon";
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function SearchComponent({ datas, onItemPress, modalVisible, selectedItem, onCloseModal }: any) {
    return (
        <>
            {datas.map((item: any, index: number) => (
                <TouchableOpacity key={index} onPress={() => onItemPress(item)}>
                    <View className="py-6 w-full px-4" style={{ borderBottomWidth: 1, borderColor: '#D7D7D7' }}>
                        <View className="flex-row p-4 rounded-lg items-center">
                            <View className="w-32 h-32 mr-5">
                                <Image source={require('../../assets/images/reidobacalhau.png')} className="w-full h-full rounded-lg" />
                            </View>
                            <View className="flex-1 mr-2">
                                <View className="bg-[#FFF3D0] w-16 flex-row rounded-lg p-1 items-center justify-center mb-1 gap-1">
                                    <Text className="text-[#D9A100] font-bold text-lg">{item.discount}</Text>
                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={{ marginLeft: 2 }} />
                                </View>
                                <Text className="font-semibold text-2xl">{item.name}</Text>
                                <Text className="text-gray-600 my-1 text-xl">{item.description}</Text>
                                <View className="flex-row justify-between">
                                    <Text className="text-gray-600 text-xl">{item.location}</Text>
                                    <Text className="text-gray-600 text-xl">Há {item.distance}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={onCloseModal}
            >
                <ScrollView className="">
                    <View className="relative flex-row items-center justify-center px-5 w-full h-20">
                        <TouchableOpacity onPress={onCloseModal} style={{ position: 'absolute', left: 15, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                            <Octicons name="chevron-left" size={24} color="black" />
                        </TouchableOpacity>
                        <Text className="text-2xl font-semibold">Informação completa</Text>
                    </View>

                    <View>
                        <Carousel />
                    </View>

                    {selectedItem && (
                        <View className="p-4 mt-2">
                            <View className="mb-6">
                                <View className="justify-between flex-row border-b border-[#D2D2D2] pb-1">
                                    <Text className="text-2xl font-bold mb-2">{selectedItem.name}</Text>
                                    <Text className="text-md text-green-800 rounded-lg mb-2 py-1 px-2 bg-green-100 font-semibold">Evento</Text>
                                </View>
                                <View className="flex-row border-b border-[#D2D2D2] py-3 gap-3.5 items-center mt-3">
                                    {!selectedItem.haveLocation ?
                                        <>
                                            <View className="w-14 h-14 bg-blue-100 rounded-lg justify-center items-center">
                                                <Feather name="external-link" size={24} color="#0A58CA" />
                                            </View>
                                            <View>
                                                <Text className="text-gray-600 font-semibold text-md">Site oficial</Text>
                                                <Text className="text-blue-500 font-semibold text-lg">{selectedItem.site}</Text>
                                            </View>
                                        </>
                                        :
                                        <>
                                            <Image className="h-14 w-14 rounded-lg" source={require("../../assets/images/mapPreview.png")} />
                                            <View>
                                                <Text className="text-gray-600 font-semibold text-lg">{selectedItem.location} | {selectedItem.distance}</Text>
                                                <Text className="text-blue-500 font-semibold text-lg">{selectedItem.site}</Text>
                                            </View>
                                        </>
                                    }
                                </View>
                                <View className="flex-row border-b border-[#D2D2D2] py-3 gap-3.5 items-center">
                                    <Image className="h-14 w-14 rounded-lg" source={require("../../assets/images/reidobacalhau.png")} />
                                    <View className="flex-col">
                                        <Text className="text-gray-600 font-semibold text-md">Evento criado por</Text>
                                        <Text className="text-blue-500 font-semibold text-lg">{selectedItem.createdBy}</Text>
                                    </View>
                                </View>
                                <View className="flex-row border-b border-[#D2D2D2] py-3 gap-3.5 items-center">
                                    <View className="w-14 h-14 bg-[#D1E7DD] rounded-lg justify-center items-center">
                                        <CalendarIcon />
                                    </View>
                                    <View className="flex-col">
                                        <Text className="text-gray-600 font-semibold text-md">Quando</Text>
                                        <Text className="text-gray-800 font-semibold text-lg">{selectedItem.eventDate}</Text>
                                    </View>
                                </View>
                            </View>

                            {selectedItem.haveCupom ?
                                <View className="relative bg-green-100 mb-8 rounded-lg mt-5  px-5 py-6">
                                    <View className="absolute -top-5 w-full items-center">
                                        <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                    </View>
                                    <View className="w-full items-start">
                                        <Text className="text-black text-xl text-center">Para obter descontos, entre e use o código</Text>
                                        <Text className="text-black text-xl text-center font-semibold mt-3">Código de desconto</Text>
                                        <View className="relative w-full items-center  h-12 mt-2">
                                            <View className="absolute h-full right-0 justify-center items-center px-2 bg-gray-100 border-2 border-gray-200 rounded-r-lg z-10">
                                                <Ionicons style={{ marginLeft: 4 }} name="copy-outline" size={18} color="#495057" />
                                            </View>
                                            <TextInput
                                                cursorColor={'#ADB5BD'}
                                                className={`border rounded-lg w-full h-full border-gray-200 px-5 text-xl text-gray-500 bg-white`}
                                                placeholder="4598nz"
                                                placeholderTextColor={'#ADB5BD'}
                                            />
                                        </View>
                                        <TouchableOpacity style={{ width: '100%', marginTop: 16 }}>
                                            <View className="w-full bg-[#009951] h-12 items-center justify-center rounded-lg">
                                                <Text className="text-white text-xl ">Acessar</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                :
                                <View className="relative bg-[#FFEDEF] h-20 mb-8 rounded-lg justify-center items-center mt-3">
                                    <View className="absolute -top-5">
                                        <MaterialIcons name="local-fire-department" size={40} color="#FF6363" />
                                    </View>
                                    <Text className="text-[#630000] text-xl text-center">Obtenha o seu desconto no local</Text>
                                </View>
                            }

                            <View className="mb-6">
                                <View className="flex-row justify-between mb-2 items-center">
                                    <Text className="text-xl font-bold">Desconto Base</Text>
                                    <View className="bg-[#FFF3D0] flex-row py-1 px-2 rounded-lg items-center justify-center">
                                        <Text className="text-[#D9A100] text-xl font-bold">{selectedItem.baseDiscount}</Text>
                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={{ marginLeft: 2 }} />
                                    </View>
                                </View>
                                {selectedItem.discountAbove100 != null ?
                                    <View className="flex-row justify-between mb-2 items-center">
                                        <Text className="text-xl font-bold">Desconto acima de 100 EUR</Text>
                                        <View className="bg-[#FFF3D0] flex-row py-1 px-2 rounded-lg items-center justify-center">
                                            <Text className="text-[#D9A100] text-xl font-bold">{selectedItem.discountAbove100}</Text>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={{ marginLeft: 2 }} />
                                        </View>
                                    </View>
                                    :
                                    null
                                }
                                {selectedItem.discountAbove200 != null ?
                                    <View className="flex-row justify-between mb-2 items-center">
                                        <Text className="text-xl font-bold">Desconto acima de 200 EUR</Text>
                                        <View className="bg-[#FFF3D0] flex-row py-1 px-2 rounded-lg items-center justify-center">
                                            <Text className="text-[#D9A100] text-xl font-bold">{selectedItem.discountAbove200}</Text>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={{ marginLeft: 2 }} />
                                        </View>
                                    </View>
                                    :
                                    null
                                }
                            </View>

                            <View className="mb-6">
                                <Text className="text-2xl font-bold font-bold mb-4 border-b border-[#D2D2D2] pt-2 pb-3">Sobre</Text>
                                <Text className="text-gray-700 text-lg">
                                    {selectedItem.about}
                                </Text>
                            </View>
                        </View>
                    )}
                </ScrollView>
            </Modal>
        </>
    );
}