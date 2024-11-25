import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Octicons, Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { fontSize } from '@/constants/fonts';
import ExtractSkeleton from '../extractSkeleton';

interface ModalExtractProps {
    modalVisible: boolean;
    handleCloseModal: () => void;
}

const Item = ({  date, transactionId, amount, deleted, positive }: any) => (
    <View style={styles.item}>
        <View style={{ justifyContent: 'space-around', height: '100%' }}>
            <Text style={[styles.date, deleted && styles.deletedText]}>{date}</Text>
            <Text style={[styles.transactionId, deleted && styles.deletedText]}>ID: {transactionId}</Text>
        </View>
        <View>
            <Text style={[styles.amount, deleted && styles.deletedText, positive && styles.positive]}>{amount}</Text>
        </View>
    </View>
);

export default function CreditsExtractModal({ modalVisible, handleCloseModal }: ModalExtractProps) {
    const { t } = useLocale();
    const [loading, setLoading] = useState(true);
    const [datas, setDatas] = useState<any>([]);

    useEffect(() => {
        const fetchSelectDatas = async () => {
            /* make the request to the API here
            //Example: 
            const selectDataReponse = await
                fetch('domain of application here', {
                    method: 'GET',
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                })
                .catch((error) => {
                    console.log(error)
                });
            */

            //temporary variable
            const dataReponse: any = [
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

            setTimeout(() => {
                setDatas(dataReponse);
                setLoading(false);
            }, 5000);
        }

        fetchSelectDatas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={handleCloseModal}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />

                    </TouchableOpacity>
                    <Text style={styles.headerText}>{t("dashboardWallat.creditsScreen.creditExtract")}</Text>
                </View>

                {loading ? <ExtractSkeleton /> :
                    <FlatList
                        data={datas}
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
                }
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        paddingTop: 30,
        position: 'absolute'
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
        fontSize: fontSize.titles.mini,
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
        position: 'relative',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginVertical: 12,
        marginHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100
    },
    deletedText: {
        opacity: 0.6,
    },
    whoDeleted: {
        fontSize: fontSize.labels.medium,
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
        fontWeight: 'bold',
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


