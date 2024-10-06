import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerceHeader';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';

const data = [
    { id: '1', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: true },
    { id: '2', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: false },
    { id: '3', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: false },
    { id: '4', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
    { id: '5', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: false },
    { id: '6', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
    { id: '7', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: true },
    { id: '8', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
];

export default function CommerceCreditExtract() {
    const { t } = useLocale();

    const Item = ({ date, transactionId, amount, deleted, positive }: any) => (
        <View style={styles.item}>
            {deleted ?
                null
                :
                <TouchableOpacity style={styles.trashIcon} activeOpacity={0.7}>
                    <Feather name="trash" size={16} color="#B02A37" />
                </TouchableOpacity>
            }
            <View style={{ justifyContent: 'center', marginTop: 5 }}>
                <Text style={[styles.date, deleted && styles.deletedText]}>{date}</Text>
                <Text style={[styles.transactionId, deleted && styles.deletedText]}>{t("commerce.credit_extract.id")}: {transactionId}</Text>
                {deleted ? <Text style={[styles.whoDeleted, deleted && styles.deletedText]}>{t("commerce.credit_extract.eliminatedBy")} {transactionId}</Text> : null}
            </View>
            <View>
                <Text style={[styles.amount, deleted && styles.deletedText, positive && styles.positive]}>{amount}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <CommerceHeader
                Title={t("commerce.credit_extract.headerLabel")}
                ScreenGoback={() => router.back()}
                ScreenClose={() => router.back()}
            />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item
                        date={item.date}
                        transactionId={item.transactionId}
                        amount={item.amount}
                        deleted={item.deleted}
                        positive={item.positive}
                    />
                )}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    item: {
        position: 'relative',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginVertical: 15,
        marginHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    deletedText: {
        opacity: 0.6,
    },
    whoDeleted: {
        fontSize: fontSize.labels.medium,
        marginBottom: 10,
    },
    trashIcon: {
        position: 'absolute',
        backgroundColor: '#F8D7DA',
        padding: 10,
        borderRadius: 999,
        top: -20,
        right: -10
    },
    date: {
        fontSize: fontSize.labels.extralarge,
        color: '#495057',
        fontWeight: '400'
    },
    transactionId: {
        fontSize: fontSize.labels.medium,
        marginBottom: 3,
        fontWeight: 'bold',
        marginTop: 5
    },
    amount: {
        fontSize: fontSize.titles.medium,
        fontWeight: 'bold',
        color: 'red',
    },
    positive: {
        color: 'green',
    },
});
