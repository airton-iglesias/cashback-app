import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    FlatList,
    Image,
    View,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableWithoutFeedback,
    StyleSheet,
    Modal,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Video } from 'expo-av';
import { FontAwesome6, Octicons } from '@expo/vector-icons';
import { fontSize } from '@/constants/fonts';
import { useLocale } from '@/contexts/TranslationContext';

interface CarouselItem {
    id: string;
    image?: string;
    videoUrl?: string;
    type: 'image' | 'video';
}

export default function Carousel({ carouselData }: { carouselData: CarouselItem[] }) {
    const flatlistRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentVideoUrl, setCurrentVideoUrl] = useState<string | null>(null);
    const videoRef = useRef<Video | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);  // Novo estado para controlar a reprodução
    const { t } = useLocale();

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isAutoScrollEnabled) {
            interval = setInterval(() => {
                const nextIndex = (activeIndex + 1) % carouselData.length;
                flatlistRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                setActiveIndex(nextIndex);
            }, 2000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeIndex, isAutoScrollEnabled, carouselData.length]);

    const getItemLayout = (_data: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const renderItem = ({ item }: { item: CarouselItem }) => {
        if (item.type === 'video') {
            return (
                <TouchableWithoutFeedback
                    onPressIn={() => setIsAutoScrollEnabled(false)}
                    onPressOut={() => setIsAutoScrollEnabled(true)}
                >
                    <View style={styles.videoContainer}>
                        <Image
                            source={{ uri: item.image }}
                            style={styles.image}
                        />
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => {
                                setCurrentVideoUrl(item.videoUrl || null);
                                setIsModalVisible(true);
                            }}
                        >
                            <FontAwesome6 name="play" size={20} color="white" style={{ marginLeft: 3 }} />
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
            );
        }

        return (
            <TouchableWithoutFeedback
                onPressIn={() => setIsAutoScrollEnabled(false)}
                onPressOut={() => setIsAutoScrollEnabled(true)}
            >
                <View>
                    <Image
                        source={{ uri: item.image }}
                        style={styles.image}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        scrollTimeoutRef.current = setTimeout(() => {
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }, 50);
    }, [activeIndex]);

    const renderDotIndicators = () => {
        return carouselData.map((dot: CarouselItem, index: number) => (
            <View
                key={dot.id}
                style={[
                    styles.dot,
                    { backgroundColor: activeIndex === index ? 'black' : 'black', opacity: activeIndex === index ? 1 : 0.2 }
                ]}
            />
        ));
    };

    const handlePlaybackStatusUpdate = (status: any) => {
        if (status.isPlaying) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    };

    return (
        <View>
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            />

            <View style={styles.dotContainer}>
                {renderDotIndicators()}
            </View>

            <Modal
                visible={isModalVisible}
                onRequestClose={() => {
                    setIsModalVisible(false);
                    if (videoRef.current) {
                        videoRef.current.stopAsync();
                    }
                }}
                animationType="slide"
            >
                <View>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', gap: 10, alignItems: 'center', height: 50, paddingLeft: 20, paddingTop: 20 }}
                        onPress={() => {
                            setIsModalVisible(false);
                            if (videoRef.current) {
                                videoRef.current.stopAsync();
                            }
                        }}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />
                        <Text style={{ fontSize: fontSize.titles.mini }}>{t("profile.headerBackLabel")}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback onPress={() => {
                        if (videoRef.current) {
                            
                            videoRef.current.playFromPositionAsync(0);
                        }
                    }}>
                        <View>
                            {!isPlaying && (
                                <View style={{ position: 'absolute', zIndex: 10, height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{
                                        width: 60,
                                        height: 60,
                                        zIndex: 10,
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <FontAwesome6 name="play" size={20} color="white" />
                                    </View>
                                </View>
                            )}

                            {currentVideoUrl && (
                                <Video
                                    ref={videoRef}
                                    source={{ uri: currentVideoUrl }}
                                    style={styles.video}
                                    resizeMode={"contain" as any}
                                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate} 
                                />
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: Dimensions.get('window').width,
    },
    videoContainer: {
        position: 'relative',
        height: 200,
        width: Dimensions.get('window').width,
    },
    playButton: {
        position: 'absolute',
        top: '30%',
        left: '40%',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 9999,
        width: 60,
        height: 60,
        zIndex: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    playButtonText: {
        color: 'white',
        fontSize: 24,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
    modalContainer: {
        flex: 1
    },
    video: {
        width: '100%',
        height: '100%',
    },
});
