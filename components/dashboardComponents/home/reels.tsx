import React from "react";
import { Image, Text, View, StyleSheet, Dimensions, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Video } from 'expo-av';

interface RenderItemProps {
    item: any;
    handleItemPress: (item: any) => void;
    videoRefs: React.MutableRefObject<{ [key: string]: Video | null }>;
}

export default function Reels({ item, handleItemPress, videoRefs }: RenderItemProps) {
    const renderMedia = (item: any) => {
        if (item.type === 'image') {
            return (
                <Image
                    source={{ uri: item.source }}
                    style={styles.image}
                />
            );
        } else if (item.type === 'video') {
            return (
                <Video
                    ref={(ref) => (videoRefs.current[item.id] = ref)}
                    source={{ uri: item.source }}
                    style={styles.image}
                    useNativeControls={false}
                    resizeMode={'cover' as any}
                />
            );
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => handleItemPress(item)} style={styles.itemContainer}>
            <View style={styles.itemContent}>
                <View style={styles.imageContainer}>
                    {renderMedia(item)}
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
}
const heightScreen = Dimensions.get('window').height;
const widthScreen = Dimensions.get('window').width;

const styles = StyleSheet.create({
    itemContainer: {
        height: heightScreen,
        width: widthScreen,
    },
    itemContent: {
        justifyContent: 'center',
        alignItems: 'center',
        height: heightScreen,
        width: '100%',
        paddingBottom: 155
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
