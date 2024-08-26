import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigationTypes';
import { Feather } from '@expo/vector-icons';
import CommerceHeader from './commerceHeader';
import {useLocale} from "@/contexts/TranslationContext";

type WallatNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const data = [
    { id: '1', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true },
    { id: '2', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false },
    { id: '3', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true },
    { id: '4', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false },
    { id: '5', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true },
    { id: '6', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false },
    { id: '7', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true },
    { id: '8', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false },
];

export default function CommerceCreditExtract() {
    const rootNavigation = useNavigation<WallatNavigationProp>();
    const { t } = useLocale();

    const Item = ({ date, transactionId, amount, deleted }: any) => (
        <View style={styles.item}>
            {deleted ?
                null
                :
                <View style={styles.trashIcon}>
                    <Feather name="trash" size={16} color="#B02A37" />
                </View>
            }
            <View style={{ justifyContent: 'center', marginTop: 5 }}>
                <Text style={[styles.date, deleted && styles.deletedText]}>{date}</Text>
                <Text style={[styles.transactionId, deleted && styles.deletedText]}>{t("commerce.credit_extract.id")}: {transactionId}</Text>
                {deleted ? <Text style={[styles.whoDeleted, deleted && styles.deletedText]}>{t("commerce.credit_extract.eliminatedBy")} {transactionId}</Text> : null}
            </View>
            <View>
                <Text style={[styles.amount, deleted && styles.deletedText]}>{amount}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>

            <CommerceHeader
                    Title={t("commerce.credit_extract.headerLabel")}
                    ScreenGoback={() => rootNavigation.goBack()}
                    ScreenClose={() => rootNavigation.goBack()}
                />
            <FlatList
                data={data}
                renderItem={({ item }) => (
                    <Item
                        date={item.date}
                        transactionId={item.transactionId}
                        amount={item.amount}
                        deleted={item.deleted}
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
        marginVertical: 20,
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
        fontSize: 17,
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
        fontSize: 20,
        color: '#495057',
        fontWeight: '400'
    },
    transactionId: {
        fontSize: 17,
        marginBottom: 3,
        fontWeight: 'bold',
        marginTop: 5
    },
    amount: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#343A40'
    },
});
