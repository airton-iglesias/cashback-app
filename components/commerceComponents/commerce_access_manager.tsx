import React from 'react';
import {SafeAreaView,View,Text,TouchableOpacity,Image,ScrollView,StyleSheet,} from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '@/types/navigationTypes';
import { FontAwesome6 } from '@expo/vector-icons';
import CommerceHeader from './commerceHeader';
import {useLocale} from "@/contexts/TranslationContext";

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'new_commerce_step_1'>;

export default function CommerceAccessManager() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const { t } = useLocale();

    const userDatas = [
        {
            id: '#32594',
            name: 'Pedro',
            image: null
        },
        {
            id: '#32594',
            name: 'Fernanda',
            image: require('../../assets/images/bar2.png')
        },
    ];


    return (
        <SafeAreaView style={styles.safeArea}>

            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <CommerceHeader
                    Title={'Soverteria - Loja 1'}
                    SubTitle={'32594'}
                    ScreenGoback={() => commerceNavigation.goBack()}
                    ScreenClose={() => commerceNavigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [{ name: 'home' }],
                        })
                    )}
                />

                <View style={styles.manageAccessContainer}>
                    <Text style={styles.manageAccessTitle}>{t("commerce.access_manager.label")}</Text>
                </View>
                {
                    userDatas.map((user, index) =>
                        <View style={styles.accessItemContainer} key={index}>
                            <View style={styles.acessItemOutter}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => commerceNavigation.navigate('commerce_associate_edit')}
                                    style={styles.accessItemButton}
                                >
                                    <View style={styles.accessItemInner}>
                                        <View style={styles.accessItemAvatar}>
                                            {user.image ?
                                                <Image source={user.image} style={styles.userImage} resizeMode={'cover'} />
                                                :
                                                <Text style={styles.accessItemAvatarText}>{user.name.slice(0, 2)}</Text>
                                            }
                                        </View>
                                        <View style={{ marginLeft: 15 }}>
                                            <Text style={styles.accessItemName}>{user.name}</Text>
                                            <Text style={styles.accessItemId}>{user.id}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }

                <TouchableOpacity
                    onPress={() => commerceNavigation.navigate('commerce_add_access')}
                    style={styles.addButton}
                    activeOpacity={0.7}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </ScrollView>

        </SafeAreaView >
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
    manageAccessContainer: {
        paddingTop: 24,
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    manageAccessTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    commerceInfoContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    commerceInfoInner: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
        paddingBottom: 16,
    },
    commerceImage: {
        height: 64,
        width: 64,
        borderRadius: 32,
    },
    commerceName: {
        fontSize: 20,
    },
    commerceId: {
        fontSize: 18,
        marginTop: 8,
    },
    accessItemContainer: {
        paddingHorizontal: 20,
        marginTop: 16,
    },
    accessItemButton: {
        width: '100%',
    },
    acessItemOutter: {
        borderBottomWidth: 1,
        borderBottomColor: '#DFDFDF',
    },
    accessItemInner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 16,
    },
    accessItemAvatar: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#CADCFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessItemAvatarText: {
        color: '#0093FD',
        fontSize: 20,
        fontWeight: 'bold',
    },
    accessItemName: {
        fontSize: 20,
        fontWeight: '400'
    },
    accessItemId: {
        fontSize: 16,
        marginTop: 4,
        color: '#635C5C'
    },
    accessItemAvatarRed: {
        height: 64,
        width: 64,
        borderRadius: 32,
        backgroundColor: '#FFDADA',
        justifyContent: 'center',
        alignItems: 'center',
    },
    accessItemAvatarTextRed: {
        color: '#B72E2E',
        fontSize: 20,
        fontWeight: 'bold',
    },
    userImage: {
        flex: 1,
        height: 64,
        width: 64,
        borderRadius: 999,
    },
    addButton: {
        width: 78,
        height: 78,
        bottom: 18,
        right: 18,
        borderRadius: 39,
        position: 'absolute',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
});
