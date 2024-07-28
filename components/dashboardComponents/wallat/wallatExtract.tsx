import React from 'react';
import { View, Text, FlatList, StyleSheet, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import { Octicons, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/types/navigationTypes';

type WallatNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const data = [
    { id: '1', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: true },
    { id: '2', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '3', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: true },
    { id: '4', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '5', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: true },
    { id: '6', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '7', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '8', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '9', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '10', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },
    { id: '11', date: '22/08/2024', transactionId: '983487', amount: '50,00', positive: false },

];

const Item = ({ date, transactionId, amount, positive }: any) => (
    <View style={styles.item}>
        <View style={{ justifyContent: 'center', marginTop: 5 }}>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.transactionId}>ID: {transactionId}</Text>
        </View>
        <View>
            <Text style={[styles.amount, positive ? styles.positive : styles.negative]}>{amount}</Text>
        </View>
    </View>
);

export default function WallatExtract() {
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
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    headerButtonLeft: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    item: {
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginVertical: 8,
        marginHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    date: {
        fontSize: 20,
        color: '#495057',
        fontWeight: '400'

    },
    transactionId: {
        fontSize: 17,
        marginBottom: 10,
        fontWeight: 'bold',
        marginTop: 5
    },
    amount: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    positive: {
        color: 'green',
    },
    negative: {
        color: 'red',
    },
});


