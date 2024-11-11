import { TouchableOpacity, View, Image, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { fontSize } from "@/constants/fonts";
import { router } from "expo-router";

export default function CommerceItem({item}: any) {
    return (
        <TouchableOpacity style={styles.item} onPress={() => router.navigate("/commerce_informations")} activeOpacity={0.7}>
            <Image style={styles.image} source={require('@/assets/images/reidobacalhau.png')} />
            <View style={styles.textContainer}>
                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.location}>{item.location}</Text>
                    <Text style={styles.location}>{item.distance}</Text>
                </View>
                <View style={styles.tagsContainer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={[
                            styles.eventTag,
                            item.cashbackType === 'Evento' && styles.eventTagEvento,
                            item.cashbackType === 'Promoção' && styles.eventTagPromocao,
                            item.cashbackType === 'Permanente' && styles.eventTagPermanente
                        ]}

                        >{item.cashbackType}</Text>
                        <Text style={styles.localTag}>{item.cashbackLocationType}</Text>
                    </View>
                    <View style={[styles.discount]}>
                        <Text style={styles.discountText}>{item.discount}</Text>
                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={15} color="#D9A100" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
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
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
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