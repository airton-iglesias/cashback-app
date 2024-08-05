import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { AuthStackParamList } from '@/types/navigationTypes';

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ResetPasswordSucess() {
    const authNavigation = useNavigation<AuthNavigationProp>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            authNavigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'signin' }],
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [authNavigation]);

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
