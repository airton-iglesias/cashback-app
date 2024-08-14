import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";

export default function NotificationItem({ item, handleRemoveNotification, index }: any) {
    const { t } = useLocale();
    switch (item.notificationType) {
        case "deposit_successful":
            return (
                <View style={styles.itemAdminWrapper}>
                    <View style={styles.itemInfosWrapper}>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                            <View style={styles.textWrapper}>
                                <Text style={styles.itemTitle}>
                                    {t("sidebarNotification.notificationItem.depositSuccessful")}
                                </Text>
                                <Text style={styles.itemDescription}>
                                    {item.description} {t("sidebarNotification.notificationItem.tokens")}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.itemIcon} onPress={() => handleRemoveNotification(index)}>
                                <Feather name="trash" size={24} color="#E35D6A" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        case "new_admin":
            return (
                <View style={styles.itemAdminWrapper}>
                    <View style={styles.itemInfosWrapper}>

                        <View style={styles.itemImageWrapper}>
                            <Image source={require('../../assets/images/reidobacalhau.png')} style={styles.itemImage} />
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                            <View style={styles.textWrapper}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.itemDescription}>{item.description} {t("sidebarNotification.notificationItem.admin_add")}</Text>
                            </View>
                            <TouchableOpacity style={styles.itemIcon} onPress={() => handleRemoveNotification(index)}>
                                <Feather name="trash" size={24} color="#E35D6A" />
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={styles.buttonsAdminWrapper}>
                        <TouchableOpacity style={[styles.buttonAdmin, { backgroundColor: '#198754' }]}>
                            <Text style={styles.buttonAdminText}>{t("sidebarNotification.notificationItem.btn_confirm")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonAdmin, { backgroundColor: '#626262' }]} onPress={() => handleRemoveNotification(index)}>
                            <Text style={styles.buttonAdminText}>{t("sidebarNotification.notificationItem.btn_refuse")}</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            );
        case "cashback_canceled":
            return (
                <View style={styles.itemAdminWrapper}>
                    <View style={styles.itemInfosWrapper}>
                        <View style={styles.itemImageWrapper}>
                            <Image source={require('../../assets/images/reidobacalhau.png')} style={styles.itemImage} />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', flex: 1 }}>
                            <View style={styles.textWrapper}>
                                <Text style={styles.itemTitle}>
                                    {item.title}
                                </Text>
                                <Text style={styles.itemDescription}>
                                    {item.description} {t("sidebarNotification.notificationItem.anuableCashback_1")} 40.00 cEur {t("sidebarNotification.notificationItem.anuableCashback_2")}
                                </Text>
                            </View>
                            <TouchableOpacity style={styles.itemIcon} onPress={() => handleRemoveNotification(index)}>
                                <Feather name="trash" size={24} color="#E35D6A" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        default:
            return (
                <></>
            );
    }
}
const styles = StyleSheet.create({
    itemAdminWrapper: {
        borderBottomWidth: 1,
        paddingVertical: 30,
        borderColor: '#373737'
    },
    itemWrapper: {
        borderBottomWidth: 1,
        paddingVertical: 30,
        borderColor: '#373737',
        flexDirection: 'row',
    },
    itemInfosWrapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        gap: 15
    },
    itemImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#BAB3B3',
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,

    },
    textWrapper: {
        flex: 1,
        gap: 5,
    },
    itemTitle: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#a3a3a3'

    },
    itemDescription: {
        color: '#F8F9FA',
        fontSize: 16,
        fontWeight: '400'
    },
    itemIcon: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    buttonsAdminWrapper: {
        flexDirection: 'row',
        gap: 20,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    buttonAdmin: {
        width: '100%',
        height: 36,
        flex: 1,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonAdminText: {
        color: 'white',
        fontSize: 16
    },
});
