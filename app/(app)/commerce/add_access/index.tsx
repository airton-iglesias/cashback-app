import React, { useState } from 'react';
import {
    SafeAreaView, View, Text, TouchableOpacity,
    ScrollView, TextInput, StyleSheet, Image
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import Switch from '@/components/switch';
import CommerceHeader from '@/components/commerceHeader';
import {useLocale} from "@/contexts/TranslationContext";
import { router } from 'expo-router';

export default function CommerceAddAccess() {
    const [userID, setUserID] = useState('');
    const [administrador, setAdministrador] = useState(false);
    const [canSeeLogs, setCanSeeLogs] = useState(false);
    const [canEraseLogs, setCanEraseLogs] = useState(false);
    const { t } = useLocale();

    const datas: string | any[] = [
        /*{
            userName: 'Pedro',
            image: require('../../assets/images/bar2.png')
        }*/
    ]

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <CommerceHeader
                    Title={t("commerce.add_access.headerLabel")}
                    ScreenGoback={() => router.back()}
                    ScreenClose={() => router.replace("/commerce")}
                />

                <View style={styles.idContainer}>
                    <Text style={styles.idLabel}>{t("commerce.add_access.id")}</Text>
                    <TextInput
                        cursorColor={'#ADB5BD'}
                        value={userID}
                        style={styles.idInput}
                    />
                </View>

                {datas.length > 0 ?
                    <View style={styles.personContainer}>
                        <View style={styles.personButton}>
                            <View style={styles.personInfo}>
                                <View style={styles.personAvatar}>
                                    {datas[0].image ?
                                        <Image source={datas[0].image} style={styles.userImage} resizeMode={'cover'} />
                                        :
                                        <Text style={styles.accessItemAvatarText}>{datas[0].userName.slice(0, 2)}</Text>
                                    }
                                </View>
                                <View>
                                    <Text style={styles.personName}>{datas[0].userName}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }

                <View style={styles.switchContainer}>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.add_access.admin")}</Text>
                        <Switch
                            onChange={(mode: boolean) => setAdministrador(mode)}
                            value={administrador}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.add_access.can_see_logs")}</Text>
                        <Switch
                            onChange={(mode: boolean) => setCanSeeLogs(mode)}
                            value={canSeeLogs}
                        />
                    </View>
                    <View style={styles.switchRow}>
                        <Text style={styles.switchLabel}>{t("commerce.add_access.can_see_and_erase_logs")}</Text>
                        <Switch
                            onChange={(mode: boolean) => setCanEraseLogs(mode)}
                            value={canEraseLogs}
                        />
                    </View>
                </View>

                <View style={styles.footerContainer}>
                    <TouchableOpacity
                        onPress={() => router.push("/commerce/access_manager")}
                        style={styles.submitButton}
                        activeOpacity={0.7}
                    >
                        <View style={styles.submitButtonInner}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    idContainer: {
        paddingTop: 14,
        paddingHorizontal: 20,
        paddingBottom: 16,
        borderTopColor: '#D1D5DB',
    },
    idLabel: {
        fontSize: 18,
    },
    idInput: {
        borderColor: '#DEE2E6',
        borderWidth: 1,
        borderRadius: 8,
        width: '100%',
        height: 48,
        paddingHorizontal: 16,
        fontSize: 18,
        color: '#6C757D',
        marginTop: 8,
    },
    personContainer: {
        paddingHorizontal: 20,
    },
    personButton: {
        width: '100%',
    },
    personInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 16,
    },
    personAvatar: {
        height: 55,
        width: 55,
        borderRadius: 32,
        backgroundColor: '#CADCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    personAvatarText: {
        color: '#0093FD',
        fontSize: 20,
        fontWeight: 'bold',
    },
    personName: {
        fontSize: 20,
        marginLeft: 16,
    },
    switchContainer: {
        paddingHorizontal: 20,
        marginTop: 25,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        alignItems: 'center',
        paddingVertical: 16
    },
    switchLabel: {
        fontSize: 20,
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
    },
    submitButton: {
        borderRadius: 8,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 16,
    },
    submitButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
        width: '100%',
        height: 56,
        borderRadius: 8,
        paddingHorizontal: 16,
    },
    userImage: {
        flex: 1,
        height: 55,
        width: 55,
        borderRadius: 999,
    },
    accessItemAvatarText: {
        color: '#0093FD',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
