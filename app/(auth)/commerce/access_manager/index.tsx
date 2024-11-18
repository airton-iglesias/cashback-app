import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerce/commerceHeader';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import UserSkeleton from '@/components/userSkeleton';

export default function CommerceAccessManager() {
    const { t } = useLocale();
    const [loading, setLoading] = useState(true);
    const [userDatas, setUserDatas] = useState<any>([]);

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
                {
                    id: '#32594',
                    name: 'Pedro',
                    image: null
                },
                {
                    id: '#32595',
                    name: 'Fernanda',
                    image: require('@/assets/images/bar2.png')
                }
            ];

            setTimeout(() => {
                setUserDatas(dataReponse);
                setLoading(false);
            }, 2000);
        }

        fetchSelectDatas();
    }, []);


    return (
        <SafeAreaView style={styles.safeArea}>

            <View style={styles.scrollViewContent}>
                <CommerceHeader
                    Title={'Soverteria - Loja 1'}
                    SubTitle={'32594'}
                    ScreenGoback={() => router.back()}
                    ScreenClose={() => router.replace("/commerce")}
                />

                <View style={styles.manageAccessContainer}>
                    <Text style={styles.manageAccessTitle}>{t("commerce.access_manager.label")}</Text>
                </View>


                {loading ?
                    <UserSkeleton />
                    :
                    <FlatList
                        data={userDatas}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item: user }) => (
                            <View style={styles.accessItemContainer} >
                                <View style={styles.acessItemOutter}>
                                    <TouchableOpacity
                                        activeOpacity={0.7}
                                        onPress={() => router.push("/commerce/associate_edit")}
                                        style={styles.accessItemButton}
                                    >
                                        <View style={styles.accessItemInner}>
                                            <View style={styles.accessItemAvatar}>
                                                {user.image ? (
                                                    <Image source={user.image} style={styles.userImage} resizeMode={'cover'} />
                                                ) : (
                                                    <Text style={styles.accessItemAvatarText}>{user.name.slice(0, 2)}</Text>
                                                )}
                                            </View>
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={styles.accessItemName}>{user.name}</Text>
                                                <Text style={styles.accessItemId}>{user.id}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                }


                <TouchableOpacity
                    onPress={() => router.push("/commerce/add_access")}
                    style={styles.addButton}
                    activeOpacity={0.7}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
            </View>

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
        fontSize: fontSize.titles.mini,
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
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold',
    },
    accessItemName: {
        fontSize: fontSize.labels.large,
        fontWeight: '700'
    },
    accessItemId: {
        fontSize: fontSize.labels.medium,
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
        fontSize: fontSize.labels.medium,
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
