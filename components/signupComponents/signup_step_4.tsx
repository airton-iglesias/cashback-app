import React, { useEffect } from "react";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { SafeAreaView, View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SignupStackParamList } from "../../types/navigationTypes";
import { useLocale } from "@/contexts/TranslationContext";

type SignupStep4NavigationProp = NativeStackNavigationProp<SignupStackParamList>;

export default function Signup_Step_4({ route }: any) {
    const signupNavigation = useNavigation<SignupStep4NavigationProp>();

    const { email, password, image, name, country, currency, codeBonus, pin } = route.params;

    const { t } = useLocale();

    useEffect(() => {
        const timeout = setTimeout(() => {
            // fazer a requisição aqui

            signupNavigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [{ name: 'signup_step_5' }],
                })
            );
        }, 3000);

        return () => clearTimeout(timeout);
    }, [signupNavigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color="#000" />
                <Text style={styles.label}>Processando cadastro...</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 20,
        marginTop: 20
    }
});
