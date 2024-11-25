import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Octicons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from "expo-router";
import { fontSize } from "@/constants/fonts";
import React from "react";
import { Skeleton } from "moti/skeleton";


export default function CommerceInformationSkeleton() {
    const { t } = useLocale();
    return (
        <View>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton} activeOpacity={0.7}>
                    <Octicons name="chevron-left" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerText}>{t("commerceInformations.headerLabel")}</Text>
            </View>

            <View>
                <Skeleton
                    colorMode="light"
                    radius={10}
                    width={'100%'}
                    height={200}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <View style={{ flex: 1 }}>
                                <Skeleton width={100} colorMode="light" radius={10} />
                            </View>
                            <View style={styles.cashbackType}>
                                <Skeleton width={100} colorMode="light" radius={10} />
                            </View>
                        </View>
                        <View style={styles.sectionItem}>
                            <Skeleton width={56} height={56} colorMode="light" radius={10} />
                            <View style={[styles.infoContainer, { gap: 5 }]}>
                                <Skeleton width={120} height={24} colorMode="light" radius={10} />
                                <Skeleton width={150} height={24} colorMode="light" radius={10} />
                            </View>
                        </View>
                        <View style={styles.sectionItem}>
                            <Skeleton width={56} height={56} colorMode="light" radius={10} />
                            <View style={[styles.infoContainer, { gap: 5 }]}>
                                <Skeleton width={120} height={24} colorMode="light" radius={10} />
                                <Skeleton width={150} height={24} colorMode="light" radius={10} />
                            </View>
                        </View>
                        <View style={styles.sectionItem}>
                            <Skeleton width={56} height={56} colorMode="light" radius={10} />
                            <View style={[styles.infoContainer, { gap: 5 }]}>
                                <Skeleton width={120} height={24} colorMode="light" radius={10} />
                                <Skeleton width={150} height={24} colorMode="light" radius={10} />
                            </View>
                        </View>
                    </View>
                    <Skeleton width={'100%'} height={130} colorMode="light" radius={10} />
                </View>

            </View>
        </View>
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
        fontSize: fontSize.titles.mini,
        fontWeight: '600',
        marginBottom: 2,
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
        alignItems: 'center',
    },
    cashbackType: {
        height: 30,
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 8,
        fontWeight: '600',
        justifyContent: 'center',
        marginBottom: 5
    },
    sectionItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingVertical: 12,
        gap: 14,
        alignItems: 'center',
    },
    infoContainer: {
        flexDirection: 'column',
    },
});