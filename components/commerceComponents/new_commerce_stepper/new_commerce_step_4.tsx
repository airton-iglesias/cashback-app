import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Image } from 'react-native';
import { CommonActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CommerceHeader from '../commerceHeader';
import CommerceGoBackModal from '../commerceGoBackModal';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;
type ImageFile = {
    uri: string;
    file: File;
};


export default function New_Commerce_step_4({ route }: any) {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const {
        CashbackType, PlaceType, referenceUser,
        association, title, userPoints, webSite, startDate,
        endDate, startHour, endHour, mapAdress, description
    } = route.params || {};

    const [logoImage, setLogoImage] = useState<{ uri: string, file: File } | null>(null);
    const [posterImage, setPosterImage] = useState<{ uri: string, file: File } | null>(null);
    const [descriptionImages, setDescriptionImages] = useState<{ uri: string, file: File }[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const uriToFile = async (uri: string, name: string): Promise<File> => {
        const fileUri = `${FileSystem.cacheDirectory}${name}`;
        await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
        });
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        const file: any = {
            uri: fileInfo.uri,
            name: name,
            type: 'image/jpeg',
        };
        return file;
    };

    const pickLogoImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const file = await uriToFile(result.assets[0].uri, 'logoImage.jpg');
            setLogoImage({ uri: result.assets[0].uri, file });
        }
    };

    const pickBannerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
        });

        if (!result.canceled) {
            const file = await uriToFile(result.assets[0].uri, 'posterImage.jpg');
            setPosterImage({ uri: result.assets[0].uri, file });
        }
    };

    const pickMultipleImages = async () => {
        if (descriptionImages.length >= 10) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [16, 9],
        });

        if (!result.canceled) {
            const file = await uriToFile(result.assets[0].uri, `descriptionImage_${descriptionImages.length + 1}.jpg`);
            setDescriptionImages([...descriptionImages, { uri: result.assets[0].uri, file }]);
        }

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    const removeImage = (index: number) => {
        const newImages = [...descriptionImages];
        newImages.splice(index, 1);
        setDescriptionImages(newImages);
    };

    const handleNexStep = () => {
        if (PlaceType === "Físico") {
            commerceNavigation.navigate("new_commerce_step_5",
                {
                    CashbackType, PlaceType, referenceUser,
                    association, title, userPoints, webSite, startDate,
                    endDate, startHour, endHour, mapAdress, description,
                    logoImage: logoImage ? logoImage.file : null,
                    posterImage: posterImage ? posterImage.file : null,
                    descriptionImages: descriptionImages.map(image => image.file)
                }
            )
            return;
        };

        commerceNavigation.navigate("new_commerce_step_6",
            {
                CashbackType, PlaceType, referenceUser,
                association, title, userPoints, webSite, startDate,
                endDate, startHour, endHour, mapAdress, description,
                logoImage: logoImage ? logoImage.file : null,
                posterImage: posterImage ? posterImage.file : null,
                descriptionImages: descriptionImages.map(image => image.file)
            }
        );
    };

    useFocusEffect(
        useCallback(() => {
            const onBackPress = (e: any) => {
                if (!modalVisible) {
                    e.preventDefault();
                    setModalVisible(true);
                }
            };

            const subscription = commerceNavigation.addListener('beforeRemove', onBackPress);

            return () => {
                subscription();
            };
        }, [commerceNavigation, modalVisible])
    );

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        commerceNavigation.dispatch(CommonActions.goBack());
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    <CommerceHeader
                        Title={'Imagens e vídeos'}
                        ScreenGoback={() => commerceNavigation.goBack()}
                        ScreenClose={() => commerceNavigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'home' }],
                            })
                        )}
                    />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Logomarca</Text>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={pickLogoImage}
                            >
                                <View style={styles.uploadContainer}>
                                    {logoImage ? (
                                        <Image source={{ uri: logoImage.uri }} style={styles.imageThumbnail} resizeMode={'cover'} />
                                    ) : (
                                        <Feather name="upload" size={24} color="black" />
                                    )}
                                </View>
                            </TouchableOpacity>
                            {logoImage && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setLogoImage(null)}
                                    style={styles.removeButton}
                                >
                                    <Feather name="trash" size={16} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cartaz</Text>
                        <View>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={pickBannerImage}
                            >
                                <View style={styles.uploadContainer}>
                                    {posterImage ? (
                                        <Image source={{ uri: posterImage.uri }} style={styles.imageThumbnail} resizeMode={'cover'} />
                                    ) : (
                                        <Feather name="upload" size={24} color="black" />
                                    )}
                                </View>
                            </TouchableOpacity>
                            {posterImage && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setPosterImage(null)}
                                    style={styles.removeButton}
                                >
                                    <Feather name="trash" size={16} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.imagesHeader}>
                            <Text style={styles.sectionTitleScrollable}>Imagens de descrição</Text>
                            <Text style={styles.imageCount}>{descriptionImages.length}/10</Text>
                        </View>
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalScrollView}
                        >
                            {descriptionImages.map((image, index) => (
                                <View key={index}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => removeImage(index)}
                                        style={styles.removeButton}
                                    >
                                        <Feather name="trash" size={16} color="black" />
                                    </TouchableOpacity>
                                    <Image source={{ uri: image.uri }} style={styles.imageThumbnail} />
                                </View>
                            ))}
                            {descriptionImages.length < 10 && (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={pickMultipleImages}
                                >
                                    <View style={styles.uploadContainer}>
                                        <Feather name="upload" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>5 de 6</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                        <View style={styles.stepperLayout}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            style={styles.nextButtonContent}
                            onPress={handleNexStep}
                            activeOpacity={0.7}
                        >
                            <Feather name="arrow-right" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <CommerceGoBackModal
                    modalVisible={modalVisible}
                    setModalVisible={() => setModalVisible(false)}
                    ScreenGoback={handleGoBackConfirmed}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    section: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 30,
    },
    sectionTitleScrollable: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 20,
    },
    uploadContainer: {
        width: 100,
        height: 100,
        backgroundColor: '#ebebea',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageCount: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 20
    },
    horizontalScrollView: {
        flexDirection: 'row',
        gap: 15,
        height: 130,
        alignItems: 'center'
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 120
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    stepperLayout: {
        height: 6,
        width: 14,
        backgroundColor: '#121212',
        borderRadius: 22,
        opacity: 0.5,
        marginTop: 2
    },
    stepperLayoutSelected: {
        opacity: 1,
        width: 31,
        backgroundColor: '#121212',
        borderRadius: 22,
        height: 6,
        marginTop: 2
    },
    stepperLayoutText: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 78,
        height: 78,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
    imageThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    removeButton: {
        position: 'absolute',
        top: -13,
        left: 80,
        zIndex: 10,
        borderRadius: 999,
        borderWidth: 1,
        padding: 6,
        backgroundColor: '#FFFFFF',
        borderColor: '#D0DCE2'
    },
    removeText: {
        color: 'red',
        marginTop: 10,
    },
});
