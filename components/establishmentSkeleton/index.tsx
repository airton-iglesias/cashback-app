import { fontSize } from "@/constants/fonts";
import { usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Skeleton } from "moti/skeleton";
import { MotiView } from 'moti';
import React from "react";

export default function EstablishmentSkeleton() {
    const pathname = usePathname();
    return (
        <View style={{ flex: 1 }}>
            {pathname === "/commerce" && (
                <View style={styles.headerContainer}>
                    <Skeleton
                        colorMode="light"
                        width={160}
                    />
                </View>
            )}
            <MotiView
                style={[styles.sectionContainer]}
                transition={{
                    type: 'timing',
                }}
                animate={{ backgroundColor: '#F8F9FA' }}
            >
                <View style={[styles.cardContainer, { gap: 30 }]}>
                    <View>
                        <View style={{ gap: 30 }}>
                            <View>
                                <View style={styles.card}>
                                    <Skeleton
                                        height={96}
                                        width={96}
                                        colorMode="light"
                                    />
                                    <View style={styles.cardContent}>
                                        <Skeleton
                                            height={24}
                                            width={180}
                                            colorMode="light"
                                        />
                                        <View style={styles.cardDetails}>
                                            <Skeleton
                                                height={24}
                                                width={200}
                                                colorMode="light"
                                            />
                                        </View>
                                        <Skeleton
                                            height={24}
                                            width={100}
                                            colorMode="light"
                                        />
                                    </View>
                                    <View style={styles.separator}></View>
                                </View>
                            </View>

                            <View>
                                <View style={styles.card}>
                                    <Skeleton
                                        height={96}
                                        width={96}
                                        colorMode="light"
                                        radius={'round'}
                                    />
                                    <View style={styles.cardContent}>
                                        <Skeleton
                                            height={24}
                                            width={180}
                                            colorMode="light"
                                        />
                                        <View style={styles.cardDetails}>
                                            <Skeleton
                                                height={24}
                                                width={200}
                                                colorMode="light"
                                            />
                                        </View>
                                        <View>
                                            <Skeleton
                                                height={24}
                                                width={100}
                                                colorMode="light"
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.separator}></View>
                                </View>
                            </View>

                            <View>
                                <View style={styles.card}>
                                    <Skeleton
                                        height={96}
                                        width={96}
                                        colorMode="light"
                                        radius={'round'}
                                    />
                                    <View style={styles.cardContent}>
                                        <Skeleton
                                            height={24}
                                            width={180}
                                            colorMode="light"
                                        />
                                        <View style={styles.cardDetails}>
                                            <Skeleton
                                                height={24}
                                                width={200}
                                                colorMode="light"
                                            />
                                        </View>
                                        <Skeleton
                                            height={24}
                                            width={100}
                                            colorMode="light"
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </MotiView>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#D8D8D8',
        paddingTop: 30,
    },
    headerContainer: {
        paddingVertical: 15,
        height: 70,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    cardContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    card: {
        flexDirection: 'row',
        position: 'relative',
    },
    cardContent: {
        paddingHorizontal: 16,
        justifyContent: 'center',
        flex: 1,
        gap: 8
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4
    },
    separator: {
        position: 'absolute',
        width: 4,
        height: 30,
        backgroundColor: '#B2B2B2',
        left: 46,
        bottom: -30,
    },
});