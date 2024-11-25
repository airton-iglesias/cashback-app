import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, ScrollView, StyleSheet, FlatList, } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import CommerceHeader from '@/components/commerce/commerceHeader';
import { useLocale } from "@/contexts/TranslationContext";
import { router, useLocalSearchParams } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import UserSkeleton from '@/components/userSkeleton';

export default function CommerceAccessManager() {
    const { t } = useLocale();
    const [loading, setLoading] = useState(true);
    const [userDatas, setUserDatas] = useState<any>([]);
    const { id, name } = useLocalSearchParams();

    useEffect(() => {
        const fetchSelectDatas = async () => {
            /* make the request to the API here
                you can use id and name to identify the commerce/promo/event
                {...}
            */

            //temporary variable
            const dataReponse: any = [
                {
                    id: '#32594',
                    name: 'Pedro',
                    image: null // Sem imagem para este exemplo
                },
                {
                    id: '#32595',
                    name: 'Fernando',
                    image: 'https://th.bing.com/th/id/OIP.hCfHyL8u8XAbreXuaiTMQgHaHZ?rs=1&pid=ImgDetMain'
                }
            ];

            /* The Timeout is to simulate an API call delay, you can remove it when making the API call */
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

                {/* Manage Access Label */}
                <View style={styles.manageAccessContainer}>
                    <Text style={styles.manageAccessTitle}>{t("commerce.access_manager.label")}</Text>
                </View>
                {/* end of manage Access Label */}


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
                                        onPress={() => router.push({
                                            pathname: "/commerce/associate_edit",
                                            params: {
                                                id: user.id,
                                                name: user.name,
                                                image: user.image,
                                            },
                                        })}
                                        style={styles.accessItemButton}
                                    >
                                        <View style={styles.accessItemInner}>
                                            {/* Avatar */}
                                            <View style={styles.accessItemAvatar}>
                                                {user.image ? (
                                                    <Image
                                                        source={{ uri: user.image }}
                                                        style={styles.userImage}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <Text style={styles.accessItemAvatarText}>{user.name.slice(0, 2)}</Text>
                                                )}
                                            </View>
                                            {/* end of Avatar */}

                                            {/* Name and ID */}
                                            <View style={{ marginLeft: 15 }}>
                                                <Text style={styles.accessItemName}>{user.name}</Text>
                                                <Text style={styles.accessItemId}>{user.id}</Text>
                                            </View>
                                            {/* end of Name and ID */}
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                }

                {/* Add fab Button */}
                <TouchableOpacity
                    onPress={() => router.push("/commerce/add_access")}
                    style={styles.addButton}
                    activeOpacity={0.7}
                >
                    <FontAwesome6 name="plus" size={24} color="white" />
                </TouchableOpacity>
                {/* end of add fab Button */}
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
