import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import CommerceHeader from '@/components/commerceHeader';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';

export default function New_Commerce_Step_5() {
    const { PlaceType, logoImage, posterImage, descriptionImages, setStepperData } = useStepperContext();

    const scrollViewRef = useRef<ScrollView>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const { t } = useLocale();
    
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
            setStepperData({ logoImage: { uri: result.assets[0].uri, file } });
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
            setStepperData({ posterImage: { uri: result.assets[0].uri, file } });
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
            setStepperData({ descriptionImages: [...descriptionImages, { uri: result.assets[0].uri, file }] });
        }

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    const removeImage = (index: number) => {
        const newImages = [...descriptionImages];
        newImages.splice(index, 1);
        setStepperData({ descriptionImages: newImages });
    };

    const handleNexStep = () => {
        if (PlaceType === "Físico") {
            router.push("/commerce/new/cashback_items");
            return;
        }
        router.push("/commerce/new/email_contact");
    };

    const handleGoBackConfirmed = () => {
        setModalVisible(false);
        router.replace("/commerce")
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <CommerceHeader
                        Title={t("commerce.new_commerce.step4.headerLabel")}
                        ScreenGoback={() => router.back()}
                        ScreenClose={() => { setModalVisible(true); }}
                    />
                    {/* Logomarca */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step4.logoLabel")}</Text>
                        <View>
                            <TouchableOpacity activeOpacity={0.7} onPress={pickLogoImage}>
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
                                    onPress={() => setStepperData({ logoImage: null })}
                                    style={styles.removeButton}
                                >
                                    <Feather name="trash" size={16} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {/* Cartaz */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step4.bannerLabel")}</Text>
                        <View>
                            <TouchableOpacity activeOpacity={0.7} onPress={pickBannerImage}>
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
                                    onPress={() => setStepperData({ posterImage: null })}
                                    style={styles.removeButton}
                                >
                                    <Feather name="trash" size={16} color="black" />
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                    {/* Imagens de Descrição */}
                    <View style={styles.section}>
                        <View style={styles.imagesHeader}>
                            <Text style={styles.sectionTitleScrollable}>{t("commerce.new_commerce.step4.descriptionImageLabel")}</Text>
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
                                <TouchableOpacity activeOpacity={0.7} onPress={pickMultipleImages}>
                                    <View style={styles.uploadContainer}>
                                        <Feather name="upload" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                </ScrollView>
                {/* Footer */}
                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>{t("commerce.new_commerce.step4.currentStepper")}</Text>
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
                {/* Modal de Confirmação */}
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
