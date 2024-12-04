import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize } from "@/constants/fonts";
import { Skeleton } from "moti/skeleton";


export default function CommerceItemLoading() {

    return (
        <View>
            <View style={styles.item}>
                <Skeleton width={100} height={100} radius={8} colorMode={"light"} />
                <View style={[styles.textContainer, { gap: 10 }]}>
                    <Skeleton width={150} height={24} radius={8} colorMode={"light"} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Skeleton width={100} height={24} radius={8} colorMode={"light"} />
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                    <View style={styles.tagsContainer}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                        </View>
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Skeleton width={100} height={100} radius={8} colorMode={"light"} />
                <View style={[styles.textContainer, { gap: 10 }]}>
                    <Skeleton width={150} height={24} radius={8} colorMode={"light"} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Skeleton width={100} height={24} radius={8} colorMode={"light"} />
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                    <View style={styles.tagsContainer}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                        </View>
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                </View>
            </View>

            <View style={styles.item}>
                <Skeleton width={100} height={100} radius={8} colorMode={"light"} />
                <View style={[styles.textContainer, { gap: 10 }]}>
                    <Skeleton width={150} height={24} radius={8} colorMode={"light"} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Skeleton width={100} height={24} radius={8} colorMode={"light"} />
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                    <View style={styles.tagsContainer}>
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                            <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                        </View>
                        <Skeleton width={60} height={24} radius={8} colorMode={"light"} />
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 25,
        borderBottomWidth: 1,
        borderBottomColor: '#D7D7D7',
        backgroundColor: 'white'
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    title: {
        fontSize: fontSize.titles.mini,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    location: {
        color: '#555',
        marginBottom: 12,
        fontSize: fontSize.labels.medium
    },
    tagsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    eventTag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    localTag: {
        backgroundColor: '#BBBBBB',
        color: '#0A3622',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 8,
    },
    discount: {
        backgroundColor: '#FFF3D0',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        marginBottom: 4
    },
    discountText: {
        color: '#D9A100',
        fontSize: fontSize.labels.medium,
        marginBottom: 2
    },
    eventTagEvento: {
        backgroundColor: '#FFF3CD',
        color: '#664D03'
    },
    eventTagPromocao: {
        backgroundColor: '#CFF4FC',
        color: '#055160'
    },
    eventTagPermanente: {
        backgroundColor: '#D1E7DD',
        color: '#0A3622'
    },
})