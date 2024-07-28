import React, { useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ModalCommerce from "@/components/modalCommerce";


const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '30%',
        type: 'image',
        source: 'url da midia',
        modal: {
            haveCupom: false,
            haveLocation: false,
            site: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            discountAbove100: "20%",
            discountAbove200: "30%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
    {
        id: '2',
        title: 'Fitness Center 2',
        location: 'Beja, Portugal',
        discount: '50%',
        type: 'image',
        source: 'url da midia',
        modal: {
            haveCupom: true,
            haveLocation: true,
            site: "sitebacalhao.com",
            distance: "3km",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Promoção",
            baseDiscount: "30%",
            discountAbove100: "40%",
            discountAbove200: "50%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
];

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemPress = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const renderItem = ({ item }: any) => (
        <TouchableWithoutFeedback onPress={() => handleItemPress(item)} style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../../assets/images/garota.png")}
                        style={styles.image}
                    />
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 1)']}
                        style={styles.gradient}
                    />
                    <View style={styles.infoContainer}>
                        <View>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.location}>{item.location}</Text>
                        </View>
                        <View style={styles.discountContainer}>
                            <Text style={styles.discountText}>{item.discount}</Text>
                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={22} color="#D9A100" style={styles.icon} />
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="start"
                    decelerationRate="fast"
                />
                {selectedItem && (
                    <ModalCommerce
                        modalVisible={modalVisible}
                        selectedItem={selectedItem}
                        handleCloseModal={handleCloseModal}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
    },
    container:{
        flex: 1,
    },
    itemContainer: {
        height: heightScreen,
        width: widthScreen,
    },
    itemContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: heightScreen,
        width: '100%',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: '30%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        height: '23%',
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4
    },
    location: {
        fontSize: 20,
        color: 'white',
    },
    discountContainer: {
        backgroundColor: '#FFF3D0',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 90,
        marginTop: 10
    },
    discountText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#D9A100',
    },
    icon: {
        marginLeft: 5,
    },
});
