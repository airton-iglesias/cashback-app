
const data = [
    {
        id: '1',
        title: 'Fitness Center 1',
        location: 'Beja, Portugal',
        discount: '20%',
        type: 'video',
        source: 'https://i.imgur.com/6Y8qkha.mp4',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: null,
            website: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            flexDiscount: [
                {
                    currency: 'EUR',
                    value: 100,
                    discount: '10%'
                },
                {
                    currency: 'EUR',
                    value: 200,
                    discount: '20%'
                },
                {
                    currency: 'EUR',
                    value: 300,
                    discount: '30%'
                },
            ],
            about: "Lorem ipsum...",
            carouselImages: [
                {
                    id: '01',
                    image: 'https://i.imgur.com/7NvPLld.jpeg',
                },
                {
                    id: '02',
                    image: 'https://i.imgur.com/5Qx1oqV.jpeg',
                },
                {
                    id: '03',
                    image: 'https://i.imgur.com/2cFsaV2.png',
                }
            ]
        }
    },
    {
        id: '2',
        title: 'Cafe Center 1',
        location: 'Beja, Portugal',
        discount: '20%',
        type: 'image',
        source: 'https://i.imgur.com/vuz4ufK.png',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: "Beja, portugal",
            website: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            flexDiscount: [
                {
                    currency: 'EUR',
                    value: 100,
                    discount: '10%'
                },
                {
                    currency: 'EUR',
                    value: 200,
                    discount: '20%'
                },
                {
                    currency: 'EUR',
                    value: 300,
                    discount: '30%'
                },
            ],
            carouselImages: [
                {
                    id: '01',
                    image: 'https://i.imgur.com/7NvPLld.jpeg',
                },
                {
                    id: '02',
                    image: 'https://i.imgur.com/5Qx1oqV.jpeg',
                },
                {
                    id: '03',
                    image: 'https://i.imgur.com/2cFsaV2.png',
                }
            ],
            about: `<div><b>Exemplo </b><i>de <u>texto</u></i></div><div><i><u><br></u></i></div><div><font color="#ff0000">Cor Vermelha, </font><font color="#00ff00">Cor Verde, </font><font color="#0000ff">Cor Azul, </font><font color="#ffff00">Cor Amarela, </font><font color="#ff00ff">Cor Lilas, </font><font color="#00ffff">Cor Ciano.</font></div><div><font color="#00ffff"><br></font></div><div><ul><li><font color="#00ffff">&nbsp;</font><font color="#000000">Item 1</font></li><li><font color="#000000">&nbsp;Item 2</font></li><li><font color="#000000">&nbsp;Item 3</font></li></ul><div><font color="#000000"><a href="https://www.google.com">Link para o website</a></font></div></div>`,
        }
    },
    {
        id: '3',
        title: 'Fitness Center 3',
        location: 'Beja, Portugal',
        discount: '20%',
        type: 'video',
        source: 'https://i.imgur.com/6Y8qkha.mp4',
        modal: {
            cupomCode: 'ID s039da',
            locationMap: null,
            website: "sitebacalhao.com",
            createdBy: "Casa Verde dos Relógios",
            eventDate: "0 out - 20:00 a 20 out - 21:00",
            cashbackType: "Evento",
            baseDiscount: "10%",
            flexDiscount: [
                {
                    currency: 'EUR',
                    value: 100,
                    discount: '10%'
                },
                {
                    currency: 'EUR',
                    value: 200,
                    discount: '20%'
                },
                {
                    currency: 'EUR',
                    value: 300,
                    discount: '30%'
                },
            ],
            about: "Lorem ipsum...",
            carouselImages: [
                {
                    id: '01',
                    image: 'https://i.imgur.com/7NvPLld.jpeg',
                },
                {
                    id: '02',
                    image: 'https://i.imgur.com/5Qx1oqV.jpeg',
                },
                {
                    id: '03',
                    image: 'https://i.imgur.com/2cFsaV2.png',
                }
            ]
        }
    },
];

import React, { useRef, useState, useEffect, useCallback } from "react";
import { FlatList, SafeAreaView, View, StyleSheet } from "react-native";
import ModalCommerce from "@/components/modalCommerce";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import Reels from "./reels";
import { Video } from 'expo-av';

export default function Home() {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [wasPlayingBeforeModal, setWasPlayingBeforeModal] = useState(false); // Track playback state
    const flatListRef = useRef<FlatList>(null);
    const videoRefs = useRef<{ [key: string]: Video | null }>({});
    const currentPlayingVideo = useRef<Video | null>(null);
    const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
    const currentVisibleItem = useRef<any>(null);
    const isFocused = useIsFocused();


    useFocusEffect(
        useCallback(() => {
            if (selectedItem) {
                setModalVisible(true);
            }

            return () => {
                setModalVisible(false);
            };
        }, [selectedItem])
    );
    
    useEffect(() => {
        if (isFocused && currentVisibleItem.current?.type === 'video' && currentPlayingVideo.current) {
            currentPlayingVideo.current.playAsync();
        } 
        else {
            if (currentPlayingVideo.current) {
                currentPlayingVideo.current.pauseAsync();
            }
        }
    }, [isFocused]);

    const handleItemPress = (item: any) => {
        if (currentPlayingVideo.current) {
            currentPlayingVideo.current.getStatusAsync().then((status) => {
                if (status.isLoaded) {
                    setWasPlayingBeforeModal(status.isPlaying);
                    currentPlayingVideo.current?.pauseAsync();
                }
            });
        }
    
        if (autoScrollTimer.current) {
            clearTimeout(autoScrollTimer.current);
        }
    
        setSelectedItem(item);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedItem(null);

        if (wasPlayingBeforeModal && currentPlayingVideo.current) {
            currentPlayingVideo.current.playAsync();
            startAutoScroll();
        }
    };

    const goToNextItem = () => {
        const nextIndex = (currentIndex + 1) % data.length;
        setCurrentIndex(nextIndex);
        flatListRef.current?.scrollToIndex({ index: nextIndex });
    };

    const startAutoScroll = () => {
        const currentItem = currentVisibleItem.current;
    
        if (currentItem?.type === 'video' && currentPlayingVideo.current) {
            // Para vídeos, começa o auto-scroll quando o vídeo terminar
            currentPlayingVideo.current.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && !status.isPlaying && status.didJustFinish) {
                    goToNextItem();
                }
            });
        } else if (currentItem?.type === 'image') {
            if (autoScrollTimer.current) {
                clearTimeout(autoScrollTimer.current);
            }
            autoScrollTimer.current = setTimeout(() => goToNextItem(), 5000);
        }
    };
    

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        // Pausar todos os vídeos
        Object.values(videoRefs.current).forEach(video => {
            if (video) {
                video.pauseAsync();
            }
        });
    
        if (viewableItems.length > 0) {
            const currentItem = viewableItems[0].item;
    
            currentVisibleItem.current = currentItem;
    
            // Limpar temporizador anterior
            if (autoScrollTimer.current) {
                clearTimeout(autoScrollTimer.current);
            }
    
            // Se for vídeo, configura o vídeo para começar do início
            if (currentItem.type === 'video') {
                currentPlayingVideo.current = videoRefs.current[currentItem.id];
                videoRefs.current[currentItem.id]?.setPositionAsync(0).then(() => {
                    if (!modalVisible) {
                        videoRefs.current[currentItem.id]?.playAsync();
                        startAutoScroll();
                    }
                });
            } else if (currentItem.type === 'image') {
                // Para imagem, inicie o temporizador de rolagem automática
                startAutoScroll();
            }
        }
    }).current;
    

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={({ item }) => (
                        <Reels item={item} handleItemPress={handleItemPress} videoRefs={videoRefs} />
                    )}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    pagingEnabled
                    snapToAlignment="start"
                    decelerationRate={0.5}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
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

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 110,
    },
    container: {
        flex: 1,
    },
});
