import React, { useEffect, useRef, useState } from "react";
import { FlatList, Image, SafeAreaView, Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ModalCommerce from "@/components/modalCommerce";
import { Video } from 'expo-av';

const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '30%',
        type: 'video',
        source: 'url da midia',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: '',
            website: "www.maps.google.com",
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
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '30%',
        type: 'image',
        source: 'url da midia',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: null,
            website: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            discountAbove100: "20%",
            discountAbove200: "30%",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in neque rhoncus, mattis augue eget, viverra purus. Aliquam erat volutpat. Vivamus lacinia felis id massa blandit, vel pellentesque lacus tincidunt. Integer ac tellus id ipsum tincidunt interdum in eu mi. Cras leo dui, pharetra ac congue feugiat."
        }
    },
];

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);
    const videoRefs = useRef<{ [key: string]: Video | null }>({});

    useEffect(() => {
        const timer = setTimeout(() => {
            const nextIndex = (currentIndex + 1) % data.length;
            setCurrentIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex });
        }, 10000);

        return () => clearTimeout(timer);
    }, [currentIndex]);

    const handleItemPress = (item: any) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);
    };

    const renderMedia = (item: any, index: number) => {
        if (item.type === 'image') {
            return (
                <Image
                    source={require("../../../assets/images/garota.png")}
                    style={styles.image}
                />
            );
        } else if (item.type === 'video') {
            return (
                <Video
                    ref={(ref) => (videoRefs.current[item.id] = ref)}
                    source={require("../../../assets/videos/reels_template.mp4")}
                    style={styles.image}
                    useNativeControls={false}
                    isLooping
                    shouldPlay={true}
                    resizeMode={'cover' as any}
                    isMuted={true}
                />
            );
        }
    };

    const renderItem = ({ item, index }: any) => (
        <TouchableWithoutFeedback onPress={() => handleItemPress(item)} style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <View style={styles.imageContainer}>
                    {renderMedia(item, index)}
                    <LinearGradient
                        colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.9)']}
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
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="start"
                    decelerationRate={0.9}
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
};

const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 110,
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
        paddingBottom: 140
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
        height: '40%',
    },
    infoContainer: {
        position: 'absolute',
        bottom: 0,
        height: '18%',
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
