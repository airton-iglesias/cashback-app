import { ScrollView, TouchableOpacity, View, Text, Image, TextInput, StyleSheet } from "react-native";
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons, Octicons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { Linking } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { fontSize } from "@/constants/fonts";
import React, { useEffect, useState } from "react";
import CalendarIcon from "@/assets/icons/calendarIcon";
import Carousel from "@/components/carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import CommerceInformationSkeleton from "@/components/commerceInformationSkeleton";

interface flexDiscountProps {
    type: 'base' | 'flex' | 'burn';
    currency?: string;
    value?: number;
    discount: string;
}
interface carouselItem {
    id: string;
    source: string;
    type: 'image' | 'video';
}
interface DatasProps {
    title: string;
    discountType: 'local' | 'online' | 'link';
    location: string;
    distance: string;
    type: string;
    source: string;
    cupomCode?: string;
    locationMap?: string;
    website: string;
    createdBy: string;
    eventDate: string;
    cashbackType: string;
    baseDiscount: string;
    flexDiscount: flexDiscountProps[];
    carouselImages: carouselItem[];
    about: string;
}

export default function Commerce_Informations() {
    const { id }: any = useLocalSearchParams();
    const [datas, setDatas] = useState<DatasProps>({} as DatasProps);

    const { t } = useLocale();
    const [isLoading, setIsLoading] = useState(true);
    const copyToClipboard = () => {
        Clipboard.setStringAsync(datas.cupomCode || '');
    };

    useEffect(() => {
        /* Make the request to the api here, you can use the id to identify the commerce/promo/event and get the data
            {...}
        */

        // The Timeout is to simulate an API call delay, you can remove it when making the API call
        setTimeout(() => {
            setDatas({
                title: 'Cafe Center 1',
                discountType: 'online',
                location: 'Beja, Portugal',
                distance: '1.5 km',
                type: 'image',
                source: 'https://i.imgur.com/vuz4ufK.png',
                cupomCode: 'ID s039da',
                locationMap: 'aaaa',
                website: "sitebacalhao.com",
                createdBy: "Casa Verde dos Relógios",
                eventDate: "0 out - 20:00 a 20 out - 21:00",
                cashbackType: "Evento",
                baseDiscount: "10%",
                flexDiscount: [
                    {
                        type: 'base',
                        discount: '10%',
                    },
                    {
                        type: 'flex',
                        currency: 'EUR',
                        value: 100,
                        discount: '10%'
                    },
                    {
                        type: 'flex',
                        currency: 'EUR',
                        value: 200,
                        discount: '20%'
                    },
                    {
                        type: 'flex',
                        currency: 'EUR',
                        value: 300,
                        discount: '30%'
                    },
                    {
                        type: 'burn',
                        discount: '10%'
                    },
                ],
                carouselImages: [
                    {
                        id: '01',
                        source: 'https://i.imgur.com/7NvPLld.jpeg',
                        type: 'image',
                    },
                    {
                        id: '02',
                        source: 'https://i.imgur.com/5Qx1oqV.jpeg',
                        type: 'image',
                    },
                    {
                        id: '03',
                        source: 'https://i.imgur.com/2cFsaV2.png',
                        type: 'image',
                    }
                ],
                about: 'Descrição do comercio ou da promoção/evento'
            })

            setIsLoading(false);
        }, 2000)
    }, [])

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            {isLoading ?
                <CommerceInformationSkeleton />
                :
                <View>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} activeOpacity={0.7}>
                            <Octicons name="chevron-left" size={32} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>{t("commerceInformations.headerLabel")}</Text>
                    </View>

                    <ScrollView>
                        <Carousel carouselData={datas.carouselImages} />

                        {datas && (
                            <View style={styles.contentContainer}>
                                <View style={styles.section}>
                                    <View style={styles.sectionHeader}>
                                        <View style={{ flex: 1 }}>
                                            <Text numberOfLines={2} style={styles.title}>{datas.title}</Text>
                                        </View>
                                        <View style={styles.cashbackType}>
                                            <Text style={styles.cashbackTypeLabel}>{datas.cashbackType}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.sectionItem}>
                                        {!datas.locationMap ? (
                                            <>
                                                <TouchableOpacity style={styles.iconContainer} activeOpacity={0.7} onPress={() => router.push('/commerce_informations/map')}>
                                                    <Feather name="external-link" size={24} color="#0A58CA" />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={styles.label}>{t("commerceInformations.oficial_website")}</Text>
                                                    <Text style={styles.link}>{datas.website}</Text>
                                                </View>
                                            </>
                                        ) : (
                                            <>
                                                <TouchableOpacity
                                                    activeOpacity={0.7}
                                                    onPress={() => router.navigate("/commerce_informations/map")}
                                                >
                                                    <Image style={styles.image} source={require("@/assets/images/mapPreview.png")} />
                                                </TouchableOpacity>
                                                <View>
                                                    <Text style={styles.location}>{datas.location} | {datas.distance}</Text>
                                                    <TouchableOpacity onPress={() => Linking.openURL("https://www.google.com")} activeOpacity={0.7}>
                                                        <Text style={styles.link}>{datas.website}</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </>
                                        )}
                                    </View>
                                    <View style={styles.sectionItem}>
                                        <Image style={styles.image} source={require("@/assets/images/reidobacalhau.png")} />
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.label}>{t("commerceInformations.eventCreatedBy")}</Text>
                                            <Text style={styles.link}>{datas.createdBy}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.sectionItem}>
                                        <View style={styles.calendarIconContainer}>
                                            <CalendarIcon />
                                        </View>
                                        <View style={styles.infoContainer}>
                                            <Text style={styles.label}>{t("commerceInformations.when")}</Text>
                                            <Text style={styles.date}>{datas.eventDate}</Text>
                                        </View>
                                    </View>
                                </View>

                                {datas.discountType === 'online' || datas.discountType === 'link' ? (
                                    <View style={styles.couponContainer}>
                                        <View style={styles.couponIconContainer}>
                                            <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                        </View>
                                        <View style={styles.couponContent}>
                                            <Text style={styles.couponText}>{t(datas.discountType === 'online' ? "commerceInformations.getDiscount" : "commerceInformations.getDiscountInLink")}</Text>
                                            {datas.discountType === 'online' && (
                                                <>
                                                    <Text style={styles.couponCodeText}>{t("commerceInformations.discountCode")}</Text>
                                                    <View style={styles.couponInputContainer}>
                                                        <TextInput
                                                            cursorColor={'#ADB5BD'}
                                                            style={styles.couponInput}
                                                            value={datas.cupomCode}
                                                            placeholderTextColor={'#ADB5BD'}
                                                            editable={false}
                                                        />
                                                        <TouchableOpacity style={styles.copyIconContainer} onPress={copyToClipboard} activeOpacity={0.7}>
                                                            <Ionicons name="copy-outline" size={18} color="#495057" />
                                                        </TouchableOpacity>
                                                    </View>
                                                </>
                                            )}
                                            <TouchableOpacity style={styles.accessButtonContainer} activeOpacity={0.7}>
                                                <View style={styles.accessButton}>
                                                    <Text style={styles.accessButtonText}>{t("commerceInformations.access")}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={styles.noCouponContainer}>
                                        <View style={styles.noCouponIconContainer}>
                                            <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                        </View>
                                        <Text style={[styles.noCouponText, { marginTop: 5 }]}>{t("commerceInformations.getDiscountLocally")}</Text>
                                    </View>
                                )}

                                <View style={styles.section}>
                                    {datas.flexDiscount && datas.flexDiscount.length > 0 &&
                                        datas.flexDiscount.map((item: flexDiscountProps, index: number) => {
                                            if (item.type === 'base') {
                                                return (
                                                    <View key={index} style={styles.discountContainer}>
                                                        <Text style={styles.discountTitle}>{t("commerceInformations.discountBase")}</Text>
                                                        <View style={styles.discountValueContainer}>
                                                            <Text style={styles.discountValue}>{item.discount}</Text>
                                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                                        </View>
                                                    </View>
                                                )
                                            } else if (item.type === 'flex') {
                                                return (
                                                    <View key={index} style={styles.discountContainer}>
                                                        <Text style={styles.discountTitle}>
                                                            {t("commerceInformations.discountAbove")} {item.value} {item.currency}
                                                        </Text>
                                                        <View style={styles.discountValueContainer}>
                                                            <Text style={styles.discountValue}>{item.discount}</Text>
                                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                                        </View>
                                                    </View>
                                                )
                                            } else if (item.type === 'burn') {
                                                return (
                                                    <View key={index} style={styles.discountContainer}>
                                                        <Text style={styles.discountTitle}>{t("commerceInformations.burn")}</Text>
                                                        <View style={styles.burnValueContainer}>
                                                            <Text style={styles.burnValue}>{item.discount}</Text>
                                                            <MaterialIcons name="local-fire-department" size={16} color="#520DC2" style={styles.ticketIcon} />
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        })
                                    }

                                </View>

                                <View style={styles.aboutContainer}>
                                    <Text style={styles.aboutTitle}>{t("commerceInformations.about")}</Text>

                                    <Text style={styles.aboutText}>
                                        {datas.about}
                                    </Text>

                                </View>
                            </View>
                        )}
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
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
    cashbackTypeLabel: {
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
    burnValueContainer: {
        backgroundColor: '#E0CFFC',
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
    burnValue: {
        color: '#520DC2',
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
        fontSize: fontSize.labels.medium,
    },
    copyIcon: {
        marginLeft: 10,
        marginTop: 2
    },
});
