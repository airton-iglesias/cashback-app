import React, { useEffect } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigationTypes";
import { Feather } from '@expo/vector-icons';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Signup_Step_4() {
    const rootNavigation = useNavigation<RootNavigationProp>();

    useEffect(() => {
        const timeout = setTimeout(() => {
            rootNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'Root' }],
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [rootNavigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
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
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
