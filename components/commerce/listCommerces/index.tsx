import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";

type Promotion = {
    id: string;
    name: string;
    role: string;
    image: string;
};

type Event = {
    id: string;
    name: string;
    role: string;
    image: string;
};

type CommerceData = {
    id: string;
    name: string;
    promotion: Promotion | null;
    event: Event | null;
    image: string;
};

type ListCommercesProps = {
    data: CommerceData;
};

export default function ListCommerces({ data }: ListCommercesProps) {
    const { t } = useLocale();
    return (
        <View style={[styles.sectionContainer, { backgroundColor: '#F8F9FA' }]}>
            <View style={[styles.cardContainer, { gap: 30 }]}>
                <View style={{ gap: 30 }}>
                    <View>
                        {/* Commerce Card */}
                        <View style={styles.card}>
                            <TouchableOpacity style={styles.cardButton} activeOpacity={0.7} onPress={() => router.push({ pathname: "/commerce/menu", params: { id: data.id, name: data.name } })}>
                                <Image source={{ uri: data.image }} style={[styles.image, { borderRadius: 10 }]} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{data.name}</Text>
                                    <View style={styles.cardDetails}>
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text style={styles.cardDetailText}>{t("commerce.home.admin")}</Text>
                                        <View style={styles.cardDetailItem}>
                                            <Text style={styles.cardDetailText}>#99999</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.cardStatus, { backgroundColor: '#D1E7DD', }]}>
                                        <Text style={[styles.cardStatusText, { color: '#0A3622' }]}>{t("commerce.home.permanent")}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                            {/* End of Commerce Card */}
                            {data.promotion || data.event ? (<View style={styles.separator}></View>) : null}
                        </View>
                    </View>

                    {data.promotion && (
                        <View>
                            <View style={styles.card}>
                                <TouchableOpacity style={styles.cardButton} activeOpacity={0.7} onPress={() => router.push({ pathname: "/commerce/menu", params: { id: data.promotion?.id, name: data.promotion?.name } })}>
                                    <Image source={{ uri: data.promotion.image }} style={[styles.image, styles.roundedImage]} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{data.promotion?.name || t("commerce.home.withoutInfos")}</Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>{data.promotion?.role || t("commerce.home.withoutInfos")}</Text>
                                            <View style={styles.cardDetailItem}>
                                                <Text style={styles.cardDetailText}>{data.promotion?.id || t("commerce.home.withoutInfos")}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cardStatus, { backgroundColor: '#CFF4FC', }]}>
                                            <Text style={[styles.cardStatusText, { color: '#055160' }]}>{t("commerce.home.promotion")}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                {data.event && (<View style={styles.separator}></View>)}
                            </View>
                        </View>
                    )}

                    {data.event && (
                        <View>
                            <View style={styles.card}>
                                <TouchableOpacity style={styles.cardButton} activeOpacity={0.7} onPress={() => router.push({ pathname: "/commerce/menu", params: { id: data.event?.id, name: data.event?.name } })}>
                                    <Image source={{ uri: data.event.image }} style={[styles.image, styles.roundedImage]} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{data.event?.name || t("commerce.home.withoutInfos")}</Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>{data.event?.role || t("commerce.home.withoutInfos")}</Text>
                                            <View style={styles.cardDetailItem}>
                                                <Text style={styles.cardDetailText}>{data.event?.id || t("commerce.home.withoutInfos")}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cardStatus, { backgroundColor: '#FFF3CD', }]}>
                                            <Text style={[styles.cardStatusText, { color: '#664D03' }]}>{t("commerce.home.event")}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        paddingTop: 30,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: '500',
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    card: {
        flexDirection: 'row',
        position: 'relative',
    },
    image: {
        width: 96,
        height: 96,
    },
    roundedImage: {
        borderRadius: 48,
    },
    cardContent: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        flex: 1,
        gap: 8
    },
    cardTitle: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: '700'
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    cardDetailText: {
        fontSize: fontSize.labels.medium,
        color: '#635C5C',
        marginLeft: 4
    },
    cardDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },
    cardStatus: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardStatusText: {
        fontSize: fontSize.labels.mini,
        fontWeight: 'bold',
    },
    cardButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    separator: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: '#B2B2B2',
        left: 46,
        bottom: -30,
    },
});
