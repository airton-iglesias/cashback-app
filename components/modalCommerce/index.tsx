import { Modal, ScrollView, TouchableOpacity, View, Text, Image, TextInput, StyleSheet } from "react-native";
import Carousel from "../carousel";
import CalendarIcon from "../../assets/icons/calendarIcon";
import * as Clipboard from 'expo-clipboard';
import { MaterialCommunityIcons, Octicons, Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

interface ModalCommerceProps {
    modalVisible: boolean;
    selectedItem: any;
    handleCloseModal: () => void;
}

export default function ModalCommerce({ modalVisible, selectedItem, handleCloseModal }: ModalCommerceProps) {

    const copyToClipboard = () => {
        Clipboard.setStringAsync(selectedItem.modal.cupomCode);
    };

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={handleCloseModal} style={styles.closeButton}>
                        <Octicons name="chevron-left" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Informação completa</Text>
                </View>

                <View>
                    <Carousel />
                </View>

                {selectedItem && (
                    <View style={styles.contentContainer}>
                        <View style={styles.section}>
                            <View style={styles.sectionHeader}>
                                <Text numberOfLines={2} style={styles.title}>{selectedItem.title}</Text>
                                <Text style={styles.cashbackType}>{selectedItem.modal.cashbackType}</Text>
                            </View>
                            <View style={styles.sectionItem}>
                                {!selectedItem.modal.locationMap ? (
                                    <>
                                        <View style={styles.iconContainer}>
                                            <Feather name="external-link" size={24} color="#0A58CA" />
                                        </View>
                                        <View>
                                            <Text style={styles.label}>Site oficial</Text>
                                            <Text style={styles.link}>{selectedItem.modal.website}</Text>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Image style={styles.image} source={require("../../assets/images/mapPreview.png")} />
                                        <View>
                                            <Text style={styles.location}>{selectedItem.location} | {selectedItem.modal.distance}</Text>
                                            <Text style={styles.link}>{selectedItem.modal.website}</Text>
                                        </View>
                                    </>
                                )}
                            </View>
                            <View style={styles.sectionItem}>
                                <Image style={styles.image} source={require("../../assets/images/reidobacalhau.png")} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>Evento criado por</Text>
                                    <Text style={styles.link}>{selectedItem.modal.createdBy}</Text>
                                </View>
                            </View>
                            <View style={styles.sectionItem}>
                                <View style={styles.calendarIconContainer}>
                                    <CalendarIcon />
                                </View>
                                <View style={styles.infoContainer}>
                                    <Text style={styles.label}>Quando</Text>
                                    <Text style={styles.date}>{selectedItem.modal.eventDate}</Text>
                                </View>
                            </View>
                        </View>

                        {selectedItem.modal.cupomCode ? (
                            <View style={styles.couponContainer}>
                                <View style={styles.couponIconContainer}>
                                    <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                </View>
                                <View style={styles.couponContent}>
                                    <Text style={styles.couponText}>Para obter descontos, entre e use o código</Text>
                                    <Text style={styles.couponCodeText}>Código de desconto</Text>
                                    <View style={styles.couponInputContainer}>
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            style={styles.couponInput}
                                            value={selectedItem.modal.cupomCode}
                                            placeholderTextColor={'#ADB5BD'}
                                            editable={false}
                                        />
                                        <TouchableOpacity style={styles.copyIconContainer} onPress={copyToClipboard}>
                                            <Ionicons name="copy-outline" size={18} color="#495057" />
                                        </TouchableOpacity>
                                    </View>
                                    <TouchableOpacity style={styles.accessButtonContainer}>
                                        <View style={styles.accessButton}>
                                            <Text style={styles.accessButtonText}>Acessar</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : (
                            <View style={styles.noCouponContainer}>
                                <View style={styles.noCouponIconContainer}>
                                    <MaterialIcons name="local-fire-department" size={40} color="#146C43" />
                                </View>
                                <Text style={[styles.noCouponText, {marginTop: 5}]}>Obtenha o seu desconto no local</Text>
                                <TouchableOpacity style={{flexDirection: 'row', marginTop: 4}} onPress={copyToClipboard}>
                                    <Text style={[styles.noCouponText,{fontWeight: '700'}]}>{selectedItem.modal.cupomCode}</Text>
                                    <Ionicons style={styles.copyIcon} name="copy-outline" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                        )}

                        <View style={styles.section}>
                            <View style={styles.discountContainer}>
                                <Text style={styles.discountTitle}>Desconto Base</Text>
                                <View style={styles.discountValueContainer}>
                                    <Text style={styles.discountValue}>{selectedItem.modal.baseDiscount}</Text>
                                    <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                </View>
                            </View>
                            {selectedItem.modal.discountAbove100 && (
                                <View style={styles.discountContainer}>
                                    <Text style={styles.discountTitle}>Desconto acima de 100 EUR</Text>
                                    <View style={styles.discountValueContainer}>
                                        <Text style={styles.discountValue}>{selectedItem.modal.discountAbove100}</Text>
                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                    </View>
                                </View>
                            )}
                            {selectedItem.modal.discountAbove200 && (
                                <View style={styles.discountContainer}>
                                    <Text style={styles.discountTitle}>Desconto acima de 200 EUR</Text>
                                    <View style={styles.discountValueContainer}>
                                        <Text style={styles.discountValue}>{selectedItem.modal.discountAbove200}</Text>
                                        <MaterialCommunityIcons name="ticket-confirmation-outline" size={16} color="#D9A100" style={styles.ticketIcon} />
                                    </View>
                                </View>
                            )}
                        </View>

                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutTitle}>Sobre</Text>
                            <Text style={styles.aboutText}>{selectedItem.modal.about}</Text>
                        </View>
                    </View>
                )}
            </ScrollView>
        </Modal>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
    },
    closeButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 4,
        marginLeft: 45
    },
    contentContainer: {
        padding: 16,
        marginTop: 8,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeader: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingBottom: 4,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 8,
        flex: 1,
        paddingRight: 15
    },
    cashbackType: {
        fontSize: 16,
        height: 30,
        color: '#2D6A4F',
        backgroundColor: '#D1FAE5',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontWeight: '600',
    },
    sectionItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingVertical: 12,
        gap: 14,
        alignItems: 'center',
    },
    iconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#BFDBFE',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 56,
        width: 56,
        borderRadius: 12,
    },
    location: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: 18,
    },
    link: {
        color: '#3B82F6',
        fontWeight: '600',
        fontSize: 18,
    },
    label: {
        color: '#6B7280',
        fontWeight: '600',
        fontSize: 16,
    },
    infoContainer: {
        flexDirection: 'column',
    },
    calendarIconContainer: {
        width: 56,
        height: 56,
        backgroundColor: '#D1E7DD',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    date: {
        color: '#343A40',
        fontWeight: '600',
        fontSize: 18,
    },
    couponContainer: {
        position: 'relative',
        backgroundColor: '#D1E7DD',
        marginBottom: 32,
        borderRadius: 12,
        marginTop: 20,
        paddingVertical: 24,
        paddingHorizontal: 20,
    },
    couponIconContainer: {
        position: 'absolute',
        top: -20,
        width: '100%',
        alignItems: 'center',
    },
    couponContent: {
        width: '100%',
        alignItems: 'flex-start',
    },
    couponText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
    },
    couponCodeText: {
        color: '#000',
        fontSize: 18,
        fontWeight: '600',
        marginTop: 12,
        textAlign: 'center',
    },
    couponInputContainer: {
        position: 'relative',
        width: '100%',
        height: 48,
        marginTop: 8,
        justifyContent: 'center',
    },
    couponInput: {
        borderColor: '#E5E7EB',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        fontSize: 18,
        color: '#6B7280',
        backgroundColor: '#FFF',
    },
    copyIconContainer: {
        position: 'absolute',
        height: '100%',
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#E9ECEF',
        borderWidth: 1,
        zIndex: 10,
    },
    accessButtonContainer: {
        width: '100%',
        marginTop: 16,
    },
    accessButton: {
        width: '100%',
        backgroundColor: '#009951',
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    accessButtonText: {
        color: '#FFF',
        fontSize: 18,
    },
    noCouponContainer: {
        position: 'relative',
        backgroundColor: '#D1E7DD',
        height: 80,
        marginBottom: 32,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },
    noCouponIconContainer: {
        position: 'absolute',
        top: -20,
    },
    noCouponText: {
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    },
    discountContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        alignItems: 'center',
    },
    discountTitle: {
        fontSize: 18,
        fontWeight: '700',
    },
    discountValueContainer: {
        backgroundColor: '#FFF3D0',
        flexDirection: 'row',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    discountValue: {
        color: '#D9A100',
        fontSize: 18,
        fontWeight: '700',
    },
    ticketIcon: {
        marginLeft: 4,
    },
    aboutContainer: {
        marginBottom: 24,
    },
    aboutTitle: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingBottom: 12,
        paddingTop: 8,
    },
    aboutText: {
        color: '#374151',
        fontSize: 18,
    },
    copyIcon: {
        marginLeft: 10,
        marginTop: 2
    },
});
