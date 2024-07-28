import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigationTypes';
import { Feather } from '@expo/vector-icons';

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
            <Text style={[styles.transactionId, deleted && styles.deletedText]}>ID: {transactionId}</Text>
            {deleted ? <Text style={[styles.whoDeleted, deleted && styles.deletedText]}>Eliminado por {transactionId}</Text> : null}
        </View>
        <View>
            <Text style={[styles.amount, deleted && styles.deletedText]}>{amount}</Text>
        </View>
    </View>
);

export default function CommerceCreditExtract() {
    const rootNavigation = useNavigation<WallatNavigationProp>();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => rootNavigation.goBack()}
                >
                    <Octicons name="chevron-left" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>Extrato de Crédito</Text>
                <TouchableOpacity style={styles.closeButton}
                    onPress={() => rootNavigation.goBack()}
                >
                    <AntDesign name="close" size={28} color="black" />
                </TouchableOpacity>
            </View>
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
        paddingTop: 30
    },
    backButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        paddingBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 20
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
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
