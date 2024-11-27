import React, { useEffect, useState } from 'react';
import { FlatList, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, Octicons } from '@expo/vector-icons';
import Topbar from '@/components/header';
import InfoCloudIcon from '@/assets/icons/infoCloudIcon';
import Sidebar from '@/components/sidebar';
import { useLocale } from "@/contexts/TranslationContext";
import { fontSize } from '@/constants/fonts';
import NotificationSidebar from '@/components/notificationSidebar';
import ListCommerces from '@/components/commerce/listCommerces';
import { Skeleton } from 'moti/skeleton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import EstablishmentSkeleton from '@/components/establishmentSkeleton';

export default function Points() {

    const [modalVisible, setModalVisible] = useState(false);
    const [showTopbar, setShowTopbar] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(true);
    const [showNotifications, setShowNotifications] = useState(false);
    const [loading, setLoading] = useState(true)
    const { t } = useLocale();
    const [commerceDatas, setCommerceDatas] = useState<any>([]);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        const fetchSelectDatas = async () => {
            /* make the request to the API here
                {...}
            */

            //temporary variable
            const dataReponse: any = [{
                name: 'Nome do comercio',
                amount_points: "2.552",
                promotion: {
                    name: 'Nome da promoção',
                    id: '#99999',
                    role: 'Administrador'
                },
                event: {
                    name: 'Nome do evento',
                    id: '#99999',
                    role: 'Administrador'
                },
            }];

            setTimeout(() => {
                setCommerceDatas(dataReponse);
                setLoading(false);
            }, 2000);
        }

        fetchSelectDatas();
    }, []);

    const openSidebar = () => {
        setShowSidebar(true);
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
        setTimeout(() => {
            setShowSidebar(false);
        }, 300);
    };

    const openNotifications = () => {
        setIsNotificationsOpen(true);
        setShowNotifications(true);
    };

    const closeNotifications = () => {
        setIsNotificationsOpen(false);
        setTimeout(() => {
            setShowNotifications(false);
        }, 300);
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }, modalVisible ? { backgroundColor: 'white' } : { backgroundColor: '#212121' }]}>
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                {showTopbar && <Topbar openSidebar={openSidebar} openNotifications={openNotifications} />}
                {showSidebar && <Sidebar closeSidebar={closeSidebar} isSidebarOpen={isSidebarOpen} />}
                {showNotifications && <NotificationSidebar closeSidebar={closeNotifications} isSidebarOpen={isNotificationsOpen} />}
                <View style={styles.relative}>
                    <View style={styles.infoButtonContainer}>
                        <TouchableOpacity style={styles.infoButton}
                            onPress={() => setModalVisible(true)}
                        >
                            <InfoCloudIcon size={26} color={'#3b82f6'} style={{ marginTop: 3 }} />
                            <Text style={styles.infoButtonText}>{t("points.info")}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.pointsContainer}>
                        <View style={styles.starsContainer}>
                            <Feather name="star" size={13} color="gray" />
                            <Feather name="star" size={13} color="gray" />
                            <Feather name="star" size={13} color="black" />
                            <Feather name="star" size={13} color="gray" />
                            <Feather name="star" size={13} color="gray" />
                        </View>
                        <View style={{ marginTop: 24, alignItems: 'center' }}>
                            <Skeleton
                                show={loading}
                                width={'60%'}
                                height={55}
                                colorMode='light'
                            >
                                {loading ? null : <Text style={[styles.pointsText, { alignSelf: 'center' }]}>{commerceDatas[0].amount_points}</Text>}
                            </Skeleton>
                        </View>
                    </View>


                    {loading ?
                        <EstablishmentSkeleton />
                        :
                        <FlatList
                            data={commerceDatas}
                            renderItem={({ item }) => <ListCommerces data={item} />}
                            contentContainerStyle={{ paddingBottom: 110 }}
                        />
                    }


                </View>

                <View>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.modalHeaderContainer}>
                            <TouchableOpacity
                                style={styles.modalBackButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Octicons name="chevron-left" size={32} color="black" />
                                <Text style={styles.modalHeaderText}>{t("points.modal.headerLabel")}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalContainer}>
                            <View style={styles.modalIconContainer}>
                                <View style={styles.modalIconBackground}>
                                    <InfoCloudIcon width={36} height={36} color={'#3b82f6'} />
                                </View>
                                <View style={styles.modalTitleContainer}>
                                    <Text style={styles.modalTitle}>{t("points.modal.title1")}</Text>
                                    <Text style={styles.modalTitle}>{t("points.modal.title2")}</Text>
                                </View>
                            </View>
                            <View style={styles.modalContent}>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitle}>{t("points.modal.deductionPoints")}</Text>
                                    <Text style={styles.modalSectionText}>{t("points.modal.deductionDescription")}</Text>
                                </View>
                                <View style={styles.modalSection}>
                                    <Text style={styles.modalSectionTitleAdd}>{t("points.modal.additionPoints")}</Text>
                                    <Text style={styles.modalSectionText}>{t("points.modal.additionDescription")}</Text>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
                
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalBackButton: {
        position: 'absolute',
        left: 30,
        width: 60,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    modalHeaderContainer: {
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
    modalHeaderText: {
        fontSize: fontSize.titles.medium,
        fontWeight: '700',
        left: 15,
        marginBottom: 3
    },
    relative: {
        position: 'relative',
        paddingTop: 80,
        flex: 1
    },
    infoButtonContainer: {
        position: 'absolute',
        right: 24,
        top: 95,
        alignItems: 'center',
        zIndex: 10,
    },
    infoButton: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    infoButtonText: {
        color: '#3b82f6',
        fontSize: fontSize.labels.medium,
    },
    pointsContainer: {
        width: '100%',
        paddingVertical: 32,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 16,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 2,
    },
    pointsText: {
        fontSize: fontSize.titles.superlarge,
        fontWeight: 'bold',
    },
    sectionRow: {
        flexDirection: 'row',
        position: 'relative',
        marginTop: 40,
    },
    sectionContainer: {
        paddingTop: 20,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 80,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: fontSize.titles.medium,
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
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold'
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailText: {
        fontSize: fontSize.labels.medium,
        color: '#635C5C',
        marginLeft: 3
    },
    cardDetailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 8,
    },
    cardStatus: {
        backgroundColor: '#E0F7FA',
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
        color: '#00ACC1',
    },
    separator: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: '#B2B2B2',
        left: 46,
        bottom: -30,
    },
    modalContainer: {
        alignItems: 'center',
        paddingTop: 50,
    },
    modalIconContainer: {
        alignItems: 'center',
    },
    modalIconBackground: {
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E5EFFF',
        borderRadius: 16,
    },
    modalTitleContainer: {
        alignItems: 'center',
        marginTop: 24,
    },
    modalTitle: {
        fontSize: fontSize.titles.medium,
        color: '#3b82f6',
    },
    modalContent: {
        gap: 24,
        marginTop: 24,
    },
    modalSection: {
        alignItems: 'center',
    },
    modalSectionTitle: {
        color: '#4b5563',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionTitleAdd: {
        color: '#14b8a6',
        fontWeight: 'bold',
        fontSize: fontSize.labels.extralarge,
    },
    modalSectionText: {
        color: '#4b5563',
        fontSize: fontSize.labels.medium,
        textAlign: 'center',
    },
});
