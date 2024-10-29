import { fontSize } from "@/constants/fonts";
import { Skeleton } from "moti/skeleton";
import { View, StyleSheet } from "react-native";

export default function UserSkeleton() {
    return (
        <View style={styles.accessItemContainer} >
            <View style={styles.acessItemOutter}>
                <View
                    style={styles.accessItemButton}
                >
                    <View style={styles.accessItemInner}>
                        <View style={styles.accessItemAvatar}>
                            <Skeleton
                                height={'100%'}
                                width={'100%'}
                                radius={'round'}
                                colorMode="light"
                            />
                        </View>
                        <View style={{ marginLeft: 15, gap: 4 }}>
                            <Skeleton
                                colorMode="light"
                                width={150}
                                height={24}
                            />
                            <Skeleton
                                colorMode="light"
                                width={100}
                                height={24}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.acessItemOutter, {marginTop: 16,}]}>
                <View
                    style={styles.accessItemButton}
                >
                    <View style={styles.accessItemInner}>
                        <View style={styles.accessItemAvatar}>
                            <Skeleton
                                height={'100%'}
                                width={'100%'}
                                radius={'round'}
                                colorMode="light"
                            />
                        </View>
                        <View style={{ marginLeft: 15, gap: 4 }}>
                            <Skeleton
                                colorMode="light"
                                width={150}
                                height={24}
                            />
                            <Skeleton
                                colorMode="light"
                                width={100}
                                height={24}
                            />
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({

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
})