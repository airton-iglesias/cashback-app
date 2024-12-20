import { router } from "expo-router";
import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";

type Promotions = {
    id: string;
    name: string;
    role: string;
    image: string;
};

type Events = {
    id: string;
    name: string;
    role: string;
    image: string;
};

type CommerceData = {
    id: string;
    type: number;
    name: string;
    promotions: Promotions[] | null;
    events: Events[] | null;
    image: string;
};

type ListCommercesProps = {
    data: CommerceData;
};

export default function ListCommerces({ data }: ListCommercesProps) {
    const { t } = useLocale();

    const getStatusDetails = (type: number) => {
        switch (type) {
            case 0: // Permanent
                return {
                    text: t("commerce.home.permanent"),
                    backgroundColor: "#D1E7DD",
                    textColor: "#0A3622",
                };
            case 1: // Event
                return {
                    text: t("commerce.home.event"),
                    backgroundColor: "#FFF3CD",
                    textColor: "#664D03",
                };
            case 2: // Promotion
                return {
                    text: t("commerce.home.promotion"),
                    backgroundColor: "#CFF4FC",
                    textColor: "#055160",
                };
            default:
                return {
                    text: t("commerce.home.unknown"),
                    backgroundColor: "#E9ECEF",
                    textColor: "#6C757D",
                };
        }
    };

    return (
        <View style={[styles.sectionContainer, { backgroundColor: "#F8F9FA" }]}>
            <View style={[styles.cardContainer, { gap: 30 }]}>
                <View style={{ gap: 30 }}>
                    <View>
                        {/* Commerce Card */}
                        <View style={styles.card}>
                            <TouchableOpacity
                                style={styles.cardButton}
                                activeOpacity={0.7}
                                onPress={() =>
                                    router.push({
                                        pathname: "/commerce/menu",
                                        params: { id: data.id, name: data.name },
                                    })
                                }
                            >
                                <Image
                                    source={{ uri: data.image }}
                                    style={[styles.image, { borderRadius: 10 }]}
                                />
                                <View style={styles.cardContent}>
                                    <Text style={styles.cardTitle}>{data.name}</Text>
                                    <View style={styles.cardDetails}>
                                        <Feather name="user" size={16} color="#635C5C" />
                                        <Text style={styles.cardDetailText}>
                                            {t("commerce.home.admin")}
                                        </Text>
                                        <View style={styles.cardDetailItem}>
                                            <Text style={styles.cardDetailText}>{data.id}</Text>
                                        </View>
                                    </View>
                                    <View
                                        style={[
                                            styles.cardStatus,
                                            { backgroundColor: getStatusDetails(data.type).backgroundColor },
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.cardStatusText,
                                                { color: getStatusDetails(data.type).textColor },
                                            ]}
                                        >
                                            {getStatusDetails(data.type).text}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* End of Commerce Card */}
                        {data.promotions || data.events ? (
                            <View style={styles.separator}></View>
                        ) : null}
                    </View>

                    {data.promotions?.map((item) => (
                        <View key={item.id}>
                            <View style={styles.card}>
                                <TouchableOpacity
                                    style={styles.cardButton}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/commerce/menu",
                                            params: { id: item.id, name: item.name },
                                        })
                                    }
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={[styles.image, styles.roundedImage]}
                                    />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>
                                            {item.name || t("commerce.home.withoutInfos")}
                                        </Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>
                                                {item.role || t("commerce.home.withoutInfos")}
                                            </Text>
                                            <View style={styles.cardDetailItem}>
                                                <Text style={styles.cardDetailText}>
                                                    {item.id || t("commerce.home.withoutInfos")}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.cardStatus,
                                                { backgroundColor: "#CFF4FC" },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.cardStatusText,
                                                    { color: "#055160" },
                                                ]}
                                            >
                                                {t("commerce.home.promotion")}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {data.events && <View style={styles.separator}></View>}
                        </View>
                    ))}
                    {data.events?.map((item, index) => (
                        <View key={item.id}>
                            <View style={styles.card}>
                                <TouchableOpacity
                                    style={styles.cardButton}
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        router.push({
                                            pathname: "/commerce/menu",
                                            params: { id: item.id, name: item.name },
                                        })
                                    }
                                >
                                    <Image
                                        source={{ uri: item.image }}
                                        style={[styles.image, styles.roundedImage]}
                                    />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>
                                            {item.name || t("commerce.home.withoutInfos")}
                                        </Text>
                                        <View style={styles.cardDetails}>
                                            <Feather name="user" size={16} color="#635C5C" />
                                            <Text style={styles.cardDetailText}>
                                                {item.role || t("commerce.home.withoutInfos")}
                                            </Text>
                                            <View style={styles.cardDetailItem}>
                                                <Text style={styles.cardDetailText}>
                                                    {item.id || t("commerce.home.withoutInfos")}
                                                </Text>
                                            </View>
                                        </View>
                                        <View
                                            style={[
                                                styles.cardStatus,
                                                { backgroundColor: "#FFF3CD" },
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.cardStatusText,
                                                    { color: "#664D03" },
                                                ]}
                                            >
                                                {t("commerce.home.event")}
                                            </Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {data.events && index < data.events.length - 1 && (
                                <View style={styles.separator}></View>
                            )}
                        </View>
                    ))}

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#D8D8D8",
        paddingTop: 30,
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: "row",
        position: "relative",
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
        justifyContent: "center",
        flex: 1,
        gap: 8,
    },
    cardTitle: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: "700",
    },
    cardDetails: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 4,
    },
    cardDetailText: {
        fontSize: fontSize.labels.medium,
        color: "#635C5C",
        marginLeft: 4,
    },
    cardDetailItem: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 4,
    },
    cardStatus: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        width: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    cardStatusText: {
        fontSize: fontSize.labels.mini,
        fontWeight: "bold",
    },
    cardButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    },
    separator: {
        position: "absolute",
        width: 4,
        height: 30,
        backgroundColor: "#B2B2B2",
        left: 46,
        bottom: -30,
    },
});
