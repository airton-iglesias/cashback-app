import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function New_Commerce_Step_7() {

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.replace("/commerce")
        }, 3000);

        return () => clearTimeout(timeout);
    }, [router]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Feather name="check-circle" size={85} color="#4ade80" />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});