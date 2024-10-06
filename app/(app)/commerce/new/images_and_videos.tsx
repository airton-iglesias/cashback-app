import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Video } from 'expo-av';
import CommerceHeader from '@/components/commerceHeader';
import CommerceGoBackModal from '@/components/commerceGoBackModal';
import { useStepperContext } from '@/contexts/CommerceStepperContext';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import FooterNewCommerce from '@/components/footerNewCommerce';
import { fontSize } from '@/constants/fonts';
import InfoCloudIcon from '@/assets/icons/infoCloudIcon';

export default function New_Commerce_Step_5() {
    const { PlaceType, logoImage, posterImage, descriptionMedia, setStepperData } = useStepperContext();

    const scrollViewRef = useRef<ScrollView>(null);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalMediasInfoVisible, setModalMediasInfoVisible] = useState(false);
    const { t } = useLocale();

    const uriToFile = async (uri: string, name: string, type: string): Promise<File> => {
        const fileUri = `${FileSystem.cacheDirectory}${name}`;
        await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
        });
        const fileInfo = await FileSystem.getInfoAsync(fileUri);

        const file: any = {
            uri: fileInfo.uri,
            name: name,
            type: type,
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
            const file = await uriToFile(result.assets[0].uri, 'logoImage.jpg', 'image/jpeg');
            setStepperData({ logoImage: { uri: result.assets[0].uri, file } });
        }
    };

    const pickBannerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect: [9, 16],
        });

        if (!result.canceled) {
            const isVideo = result.assets[0].type === 'video';
            const file = await uriToFile(
                result.assets[0].uri,
                `posterImage.${isVideo ? 'mp4' : 'jpg'}`,
                isVideo ? 'video/mp4' : 'image/jpeg'
            );
            setStepperData({ posterImage: { uri: result.assets[0].uri, file, type: result.assets[0].type } });
        }
    };

    const pickMultipleMedia = async () => {
        if (descriptionMedia.length >= 10) return;

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect: [16, 9],
        });

        if (!result.canceled) {
            const isVideo = result.assets[0].type === 'video';
            const file = await uriToFile(
                result.assets[0].uri,
                `descriptionMedia_${descriptionMedia.length + 1}.${isVideo ? 'mp4' : 'jpg'}`,
                isVideo ? 'video/mp4' : 'image/jpeg'
            );
            setStepperData({ descriptionMedia: [...descriptionMedia, { uri: result.assets[0].uri, file, type: result.assets[0].type }] });
        }

        setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 200);
    };

    const removeMedia = (index: number) => {
        const newMedia = [...descriptionMedia];
        newMedia.splice(index, 1);
        setStepperData({ descriptionMedia: newMedia });
    };

    const handleNextStep = () => {
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
                        ScreenClose={() => { setModalVisible(true); }}
                    />
                    {/* Logomarca */}
                    <View style={styles.section}>

                        <View style={styles.imagesHeader}>
                            <Text style={styles.sectionTitle}>{t("commerce.new_commerce.step4.logoLabel")}</Text>
                        </View>

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
                        <View style={styles.imagesHeader}>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={styles.sectionTitleScrollable}>{t("commerce.new_commerce.step4.descriptionMediasLabel")}</Text>
                                <TouchableOpacity style={{ marginTop: 3 }} onPress={() => setModalMediasInfoVisible(true)}>
                                    <Feather name="info" size={12} color="#0052FF" />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <TouchableOpacity activeOpacity={0.7} onPress={pickBannerImage}>
                                <View style={styles.uploadContainer}>
                                    {posterImage ? (
                                        posterImage.type === 'image' ? (
                                            <Image source={{ uri: posterImage.uri }} style={styles.imageThumbnail} resizeMode={'cover'} />
                                        ) : (
                                            <Video
                                                source={{ uri: posterImage.uri }}
                                                style={styles.videoThumbnail}
                                                useNativeControls={false}
                                                resizeMode={"contain" as any}
                                                isLooping
                                                shouldPlay={false}
                                            />
                                        )
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
                    {/* Imagens e Vídeos de Descrição */}
                    <View style={styles.section}>
                        <View style={styles.imagesHeader}>
                            <View style={{ flexDirection: 'row', gap: 5 }}>
                                <Text style={styles.sectionTitleScrollable}>{t("commerce.new_commerce.step4.descriptionMediasLabel")}</Text>
                                <TouchableOpacity style={{ marginTop: 3 }} onPress={() => setModalMediasInfoVisible(true)}>
                                    <Feather name="info" size={12} color="#0052FF" />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.imageCount}>{descriptionMedia.length}/10</Text>
                        </View>
                        <ScrollView
                            ref={scrollViewRef}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.horizontalScrollView}
                        >
                            {descriptionMedia.map((media: any, index: any) => (
                                <View key={index} style={{ backgroundColor: '#ebebea', borderRadius: 8 }}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => removeMedia(index)}
                                        style={styles.removeButton}
                                    >
                                        <Feather name="trash" size={16} color="black" />
                                    </TouchableOpacity>
                                    {media.type === 'image' ? (
                                        <Image source={{ uri: media.uri }} style={styles.imageThumbnail} />
                                    ) : (
                                        <Video
                                            source={{ uri: media.uri }}
                                            style={styles.videoThumbnail}
                                            resizeMode={"contain" as any}
                                            isLooping
                                            shouldPlay={false}
                                        />
                                    )}
                                </View>
                            ))}
                            {descriptionMedia.length < 10 && (
                                <TouchableOpacity activeOpacity={0.7} onPress={pickMultipleMedia}>
                                    <View style={styles.uploadContainer}>
                                        <Feather name="upload" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </ScrollView>
                    </View>
                </ScrollView>

                <FooterNewCommerce
                    backStep={() => router.back()}
                    nextStep={handleNextStep}
                    currentStep={5}
                />

                <CommerceGoBackModal
                    modalVisible={modalVisible}
                    setModalVisible={() => setModalVisible(false)}
                    ScreenGoback={handleGoBackConfirmed}
                />

                <Modal
                    animationType="slide"
                    visible={modalMediasInfoVisible}
                    onRequestClose={() => setModalMediasInfoVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalIconContainer}>
                            <View style={styles.modalIconBackground}>
                                <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                            </View>
                            <View style={styles.modalTitleContainer}>
                                <Text style={styles.modalTitle}>{t("commerce.new_commerce.step4.modalTitle")}</Text>
                            </View>
                        </View>
                        <View style={styles.modalContent}>
                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitle}>{t("commerce.new_commerce.step4.modalBanner")}</Text>
                                <Text style={styles.modalSectionText}>{t("commerce.new_commerce.step4.modalBannerDescription")}</Text>
                            </View>
                            <View style={styles.modalSection}>
                                <Text style={styles.modalSectionTitleAdd}>{t("commerce.new_commerce.step4.modalCarroselMedias")}</Text>
                                <Text style={styles.modalSectionText}>{t("commerce.new_commerce.step4.modalCarroselDescription")}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

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
    },
    sectionTitle: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
    },
    sectionTitleScrollable: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
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
        height: 70
    },
    imageCount: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
    },
    horizontalScrollView: {
        flexDirection: 'row',
        gap: 15,
        height: 130,

    },
    imageThumbnail: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    videoThumbnail: {
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
    modalContainer: {
        alignItems: 'center',
        paddingTop: 100,
        paddingHorizontal: 15
    },
    modalIconContainer: {
        alignItems: 'center',
    },
    modalIconBackground: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5EFFF',
        borderRadius: 16,
    },
    modalTitleContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    modalTitle: {
        fontSize: fontSize.titles.medium,
        color: '#3b82f6',
    },
    modalContent: {
        gap: 24,
        marginTop: 24,
    },
    modalSection: {
        alignItems: 'center',
    },
    modalSectionTitle: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionTitleAdd: {
        color: '#14b8a6',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionText: {
        color: '#4b5563',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
    modalBackButton: {
        position: 'absolute',
        left: 30,
        width: 60,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalHeaderContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    modalHeaderText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
        left: 15,
        marginBottom: 3
    },
});
