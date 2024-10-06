import { View, Text, StyleSheet, Pressable, Dimensions, Image } from 'react-native';
import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize } from '@/constants/fonts';
import { router, usePathname } from 'expo-router';

type videoPost = {
    post: {
        id: string;
        title: string;
        location: string;
        discount: string;
        type: string;
        source: string;
    },
    activePostID: string;
};

const screenHeight = Dimensions.get('window').height;

const VideoPost = ({ post, activePostID }: videoPost) => {
    const video = useRef<Video>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!video.current) {
            return;
        }
        if (activePostID === post.id && pathname === "/dashboard") {
            video.current.playAsync();
        }
        else {
            video.current.pauseAsync();
        }
    }, [activePostID, pathname]);

    const ButtonPressed = () => {
        if (!video.current) {
            return;
        }

        if (activePostID === post.id && pathname === "/dashboard") {
            video.current.pauseAsync();
        }
        router.navigate("/(app)/commerce_informations")
    };

    return (
        <View style={{ height: screenHeight, flex: 1 }}>
            {post.type === "video" ?
                <Video
                    ref={video}
                    style={[StyleSheet.absoluteFill, { flex: 1 }]}
                    source={{ uri: post.source}}
                    resizeMode={ResizeMode.CONTAIN}
                    isLooping
                />
                :
                <Image
                    source={{ uri: post.source}}
                    style={[StyleSheet.absoluteFill, { flex: 1 }]}
                    resizeMode={ResizeMode.CONTAIN}
                />
            }

            <Pressable onPress={ButtonPressed} style={styles.content}>
                <LinearGradient
                    colors={['rgba(255, 255, 255, 0)', 'rgba(0, 0, 0, 0.9)']}
                    style={[StyleSheet.absoluteFill, styles.overlay]}
                />
                <SafeAreaView style={{ flex: 1 }}>
                    <View style={styles.footer}>
                        <View style={{ width: '70%' }}>
                            <Text numberOfLines={2} style={styles.title}>{post.title}</Text>
                            <Text numberOfLines={1} style={styles.location}>{post.location}</Text>
                        </View>
                        <View style={{ width: '25%' }}>
                            <View style={styles.discountContainer}>
                                <Text style={styles.discountText}>{post.discount}</Text>
                                <MaterialCommunityIcons name="ticket-confirmation-outline" size={22} color="#D9A100" style={{ marginLeft: 5 }} />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingHorizontal: 15,
    },
    overlay: {
        top: '65%',
    },
    footer: {
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        flex: 0.2
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: fontSize.titles.mini
    },
    location: {
        color: 'white',
        fontSize: fontSize.titles.extramini,
        marginTop: 5
    },
    discountContainer: {
        backgroundColor: '#FFF3D0',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 36,
        width: 90,
    },
    discountText: {
        fontSize: fontSize.labels.large,
        fontWeight: 'bold',
        color: '#D9A100',
    },
});

export default VideoPost;