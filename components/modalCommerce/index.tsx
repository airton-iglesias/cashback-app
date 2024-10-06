import { Modal, ScrollView, TouchableOpacity, View, Text, Image, TextInput, StyleSheet } from "react-native";
import Carousel from "../carousel";
import CalendarIcon from "../../assets/icons/calendarIcon";
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons, Octicons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import { router } from "expo-router";
import { fontSize } from "@/constants/fonts";
import React from "react";

interface ModalCommerceProps {
    modalVisible: boolean;
    selectedItem: any;
    handleCloseModal: () => void;
}
interface flexDiscountProps {
    currency: string;
    value: number;
    discount: string;
}

export default function ModalCommerce({ modalVisible, selectedItem, handleCloseModal }: ModalCommerceProps) {
    const { t } = useLocale();
    const copyToClipboard = () => {
        Clipboard.setStringAsync(selectedItem.modal.cupomCode);
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton} activeOpacity={0.7}>
                        <Octicons name="chevron-left" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>{t("modalCommerce.headerLabel")}</Text>
                </View>


                <Carousel carouselData={selectedItem.modal.carouselImages} />

                {selectedItem && (
                    <View style={styles.contentContainer}>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <View style={{ flex:1 }}>
                                    <Text numberOfLines={2} style={styles.title}>{selectedItem.title}</Text>
                                </View>
                                <View style={styles.cashbackType}>
                                    <Text style={styles.cashbackTypeLabel}>{selectedItem.modal.cashbackType}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionItem}>
                                {!selectedItem.modal.locationMap ? (
                                    <>
                                        <View style={styles.iconContainer}>
                                            <Feather name="external-link" size={24} color="#0A58CA" />
                                        </View>
                                        <View>
                                            <Text style={styles.label}>{t("modalCommerce.oficial_website")}</Text>
                                            <Text style={styles.link}>{selectedItem.modal.website}</Text>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            onPress={() => router.push("/map_location")}
                                        >
                                            <Image style={styles.image} source={require("@/assets/images/mapPreview.png")} />
                                        </TouchableOpacity>
                                        <View>
                                            <Text style={styles.location}>{selectedItem.location} | {selectedItem.modal.distance}</Text>
                                            <Text style={styles.link}>{selectedItem.modal.website}</Text>
                                        </View>
                                    </>
                                )}
                            </View>
                            <View style={styles.sectionItem}>
                                <Image style={styles.image} source={require("@/assets/images/reidobacalhau.png")} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>{t("modalCommerce.eventCreatedBy")}</Text>
                                    <Text style={styles.link}>{selectedItem.modal.createdBy}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionItem}>
                                <View style={styles.calendarIconContainer}>
                                    <CalendarIcon />
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>{t("modalCommerce.when")}</Text>
                                    <Text style={styles.date}>{selectedItem.modal.eventDate}</Text>
                                </View>
                            </View>
                        </View>

                        {selectedItem.modal.cupomCode ? (
                            <View style={styles.couponContainer}>
                                <View style={styles.couponIconContainer}>
                                    <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                </View>
                                <View style={styles.couponContent}>
                                    <Text style={styles.couponText}>{t("modalCommerce.getDiscount")}</Text>
                                    <Text style={styles.couponCodeText}>{t("modalCommerce.discountCode")}</Text>
                                    <View style={styles.couponInputContainer}>
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            style={styles.couponInput}
                                            value={selectedItem.modal.cupomCode}
                                            placeholderTextColor={'#ADB5BD'}
                                            editable={false}
                                        />
                                        <TouchableOpacity style={styles.copyIconContainer} onPress={copyToClipboard} activeOpacity={0.7}>
                                            <Ionicons name="copy-outline" size={18} color="#495057" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.accessButtonContainer} activeOpacity={0.7}>
                                        <View style={styles.accessButton}>
                                            <Text style={styles.accessButtonText}>{t("modalCommerce.access")}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.noCouponContainer}>
                                <View style={styles.noCouponIconContainer}>
                                    <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                </View>
                                <Text style={[styles.noCouponText, { marginTop: 5 }]}>{t("modalCommerce.getDiscountLocaly")}</Text>
                                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 4 }} onPress={copyToClipboard} activeOpacity={0.7}>
                                    <Text style={[styles.noCouponText, { fontWeight: '700' }]}>{selectedItem.modal.cupomCode}</Text>
                                    <Ionicons style={styles.copyIcon} name="copy-outline" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.section}>
                            <View style={styles.discountContainer}>
                                <Text style={styles.discountTitle}>{t("modalCommerce.discountBase")}</Text>
                                <View style={styles.discountValueContainer}>
                                    <Text style={styles.discountValue}>{selectedItem.modal.baseDiscount}</Text>
                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                </View>
                            </View>

                            {selectedItem.modal.flexDiscount && selectedItem.modal.flexDiscount.length > 0 &&
                                selectedItem.modal.flexDiscount.map((item: flexDiscountProps, index: number) => (
                                    <View key={index} style={styles.discountContainer}>
                                        <Text style={styles.discountTitle}>
                                            {t("modalCommerce.discountAbove")} {item.value} {item.currency}
                                        </Text>
                                        <View style={styles.discountValueContainer}>
                                            <Text style={styles.discountValue}>{item.discount}</Text>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                        </View>
                                    </View>
                                ))
                            }
                        </View>

                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutTitle}>{t("modalCommerce.about")}</Text>
                            <ScrollView
                                contentContainerStyle={{ flexGrow: 1 }}
                            >
                                <WebView
                                    style={[styles.aboutText, { height: 200 }]}
                                    originWhitelist={['*']}
                                    nestedScrollEnabled
                                    source={{
                                        html:
                                            `<div style='font-size: 40px; color: #4A4949'>${selectedItem.modal.about || ''}</div>`
                                    }}
                                    onShouldStartLoadWithRequest={(request) => {
                                        if (request.url.startsWith('http')) {
                                            Linking.openURL(request.url);
                                            return false;
                                        }
                                        return false;
                                    }}
                                />
                            </ScrollView>
                        </View>
                    </View>
                )}
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
    },
    closeButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: fontSize.titles.mini,
        fontWeight: '600',
        marginBottom: 2,
        marginLeft: 45
    },
    contentContainer: {
        padding: 16,
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingBottom: 4,
        alignItems: 'center',
    },
    title: {
        fontSize: fontSize.titles.mini,
        fontWeight: '700',
        marginBottom: 8,
        flex: 1,
        paddingRight: 15
    },
    cashbackType: {
        height: 30,
        backgroundColor: '#D1FAE5',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontWeight: '600',
        justifyContent: 'center',
        marginBottom: 5
    },
    cashbackTypeLabel:{
        color: '#2D6A4F',
        fontSize: fontSize.labels.mini,
    },
    sectionItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingVertical: 12,
        gap: 14,
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#BFDBFE',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 56,
        width: 56,
        borderRadius: 12,
    },
    location: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: fontSize.labels.medium,
    },
    link: {
        color: '#3B82F6',
        fontWeight: '600',
        fontSize: fontSize.labels.medium,
    },
    label: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: fontSize.labels.mini,
    },
    infoContainer: {
        flexDirection: 'column',
    },
    calendarIconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#D1E7DD',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        color: '#343A40',
        fontWeight: '600',
        fontSize: fontSize.labels.medium,
    },
    couponContainer: {
        position: 'relative',
        backgroundColor: '#D1E7DD',
        marginBottom: 32,
        borderRadius: 12,
        marginTop: 20,
        paddingVertical: 24,
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    couponIconContainer: {
        position: 'absolute',
        top: -20,
        width: '100%',
        alignItems: 'center',
    },
    couponContent: {
        width: '100%',
        alignItems: 'flex-start',
    },
    couponText: {
        color: '#000',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
    couponCodeText: {
        color: '#000',
        fontSize: fontSize.labels.large,
        fontWeight: '600',
        marginTop: 12,
        textAlign: 'center',
    },
    couponInputContainer: {
        position: 'relative',
        width: '100%',
        height: 48,
        marginTop: 8,
        justifyContent: 'center',
    },
    couponInput: {
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        fontSize: fontSize.labels.medium,
        color: '#6B7280',
        backgroundColor: '#FFF',
    },
    copyIconContainer: {
        position: 'absolute',
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#E9ECEF',
        borderWidth: 1,
        zIndex: 10,
    },
    accessButtonContainer: {
        width: '100%',
        marginTop: 16,
    },
    accessButton: {
        width: '100%',
        backgroundColor: '#009951',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    accessButtonText: {
        color: '#FFF',
        fontSize: fontSize.labels.medium,
    },
    noCouponContainer: {
        position: 'relative',
        backgroundColor: '#D1E7DD',
        height: 80,
        marginBottom: 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    noCouponIconContainer: {
        position: 'absolute',
        top: -20,
    },
    noCouponText: {
        color: '#000',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
    discountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
    },
    discountTitle: {
        fontSize: fontSize.labels.medium,
        fontWeight: '700',
    },
    discountValueContainer: {
        backgroundColor: '#FFF3D0',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    discountValue: {
        color: '#D9A100',
        fontSize: fontSize.labels.medium,
        fontWeight: '700',
    },
    ticketIcon: {
        marginLeft: 4,
    },
    aboutContainer: {
        marginBottom: 24,
    },
    aboutTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingBottom: 12,
        paddingTop: 8,
    },
    aboutText: {
        color: '#374151',
        fontSize: fontSize.titles.mini,
    },
    copyIcon: {
        marginLeft: 10,
        marginTop: 2
    },
});
