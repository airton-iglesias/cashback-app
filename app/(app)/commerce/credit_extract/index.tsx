import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, Modal } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerce/commerceHeader';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import ExtractSkeleton from '@/components/extractSkeleton';
import ExtractItem from '@/components/extractItem';
import { fontSize } from '@/constants/fonts';


export default function CommerceCreditExtract() {
    const [data, setData] = useState<any>([]);

    const { t } = useLocale();
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

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
                { id: '1', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: true },
                { id: '2', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: false },
                { id: '3', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: false },
                { id: '4', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
                { id: '5', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: false },
                { id: '6', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
                { id: '7', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: true, positive: true },
                { id: '8', date: '22/08/2024', transactionId: '983487', amount: '50,00', deleted: false, positive: true },
            ];

            setTimeout(() => {
                setData(dataReponse);
                setLoading(false);
            }, 2000);
        }

        fetchSelectDatas();
    }, []);

    return (
        <SafeAreaView style={styles.container}>

            <CommerceHeader
                Title={t("commerce.credit_extract.headerLabel")}
                ScreenGoback={() => router.back()}
                ScreenClose={() => router.back()}
            />
            {loading ? <ExtractSkeleton /> :
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <ExtractItem
                            date={item.date}
                            transactionId={item.transactionId}
                            amount={item.amount}
                            deleted={item.deleted}
                            positive={item.positive}
                            delItem={() => setModalVisible(true)}
                        />
                    )}
                    keyExtractor={item => item.id}
                />
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <View style={[styles.iconContainer, styles.deleteIconContainer]}>
                                <Feather name="trash" size={24} color="#DC3545" />
                            </View>
                        </View>

                        <View style={{width: '100%', alignItems: 'center'}}>
                            <Text style={styles.modalText}>{t("commerce.credit_extract.modal.title")}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonSaveContent}>
                                    <Feather name="check" size={24} color="black" />
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setModalVisible(false)}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonCancelContent}>
                                    <AntDesign name="close" size={24} color="white" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    modalContainer: {
        height: '100%',
        justifyContent: 'flex-end',
    },
    modalView: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20
    },
    modalText: {
        textAlign: 'center',
        fontSize: fontSize.labels.medium,
        color: '#fff'
    },
    buttonContainer: {
        gap: 10,
        justifyContent: 'space-between',
        width: '100%',
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    modalButtonCancelContent: {
        flexDirection: 'row',
        backgroundColor: '#232323',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#DEEDFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteIconContainer: {
        backgroundColor: '#FFE0E0',
    },
});
