import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { CommerceStackParamList } from '@/types/navigationTypes';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_Step_7() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            commerceNavigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'home' }],
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [commerceNavigation]);

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
