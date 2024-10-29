import { Link } from "expo-router";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";

export default function ListCommerces({data}: any) {
    const { t } = useLocale();
    return (
        <View style={[styles.sectionContainer, { backgroundColor: '#F8F9FA' }]}>
            <View style={[styles.cardContainer, { gap: 30 }]}>
                <Link href={"/commerce/menu"} asChild>
                    <TouchableOpacity style={{ gap: 30 }} activeOpacity={0.7}>
                        <View>
                            <View style={styles.card}>
                                <Image source={require('@/assets/images/sorveteria.png')} style={styles.image} />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{data.name}</Text>
                                    <View style={styles.cardDetails}>
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text style={styles.cardDetailText}>{t("commerce.home.admin")}</Text>
                                        <View style={styles.cardDetailItem}>
                                            <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>#99999</Text>
                                        </View>
                                    </View>
                                    <View style={[styles.cardStatus, { backgroundColor: '#D1E7DD', }]}>
                                        <Text style={[styles.cardStatusText, { color: '#0A3622' }]}>{t("commerce.home.permanent")}</Text>
                                    </View>
                                </View>
                                {data.promotion || data.event ? (<View style={styles.separator}></View>) : null}
                            </View>
                        </View>

                        {data.promotion && (
                            <View>
                                <View style={styles.card}>
                                    <Image source={require('@/assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{data.promotion?.name || t("commerce.home.withoutInfos")}</Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>{data.promotion?.role || t("commerce.home.withoutInfos")}</Text>
                                            <View style={styles.cardDetailItem}>
                                                <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                <Text style={styles.cardDetailText}>{data.promotion?.id || t("commerce.home.withoutInfos")}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cardStatus, { backgroundColor: '#CFF4FC', }]}>
                                            <Text style={[styles.cardStatusText, { color: '#055160' }]}>{t("commerce.home.promotion")}</Text>
                                        </View>
                                    </View>
                                    {data.event && (<View style={styles.separator}></View>)}
                                </View>
                            </View>
                        )}

                        {data.event && (
                            <View>
                                <View style={styles.card}>
                                    <Image source={require('@/assets/images/sorveteria2.png')} style={[styles.image, styles.roundedImage]} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{data.event?.name || t("commerce.home.withoutInfos")}</Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>{data.event?.role || t("commerce.home.withoutInfos")}</Text>
                                            <View style={styles.cardDetailItem}>
                                                <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#635C5C" />
                                                <Text style={styles.cardDetailText}>{data.event?.id || t("commerce.home.withoutInfos")}</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.cardStatus, { backgroundColor: '#FFF3CD', }]}>
                                            <Text style={[styles.cardStatusText, { color: '#664D03' }]}>{t("commerce.home.event")}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        )}
                    </TouchableOpacity>
                </Link>
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
        marginLeft: 8,
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
    separator: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: '#B2B2B2',
        left: 46,
        bottom: -30,
    },
});
