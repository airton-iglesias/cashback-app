import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import Input from '@/components/input';
import CommerceHeader from '../CommerceHeader';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function New_Commerce_step_6({ route }: any) {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const [email, setEmail] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>

                    <CommerceHeader
                        Title={'Mais informações'}
                        ScreenGoback={() => commerceNavigation.goBack()}
                        ScreenClose={() => commerceNavigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'home' }],
                            })
                        )}
                    />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Email para a nossa equipa o contatar
                        </Text>
                        <View style={styles.inputWrapper}>
                            <Input
                                onChange={(text: string) => setEmail(email)}
                                type={'email'}
                            />
                        </View>
                    </View>

                    <View style={styles.noticeContainer}>
                        <View style={styles.noticeBox}>
                            <View style={styles.noticeTextContainer}>
                                <Text style={styles.noticeText}>
                                    Vamos contata-lo por email, para encontrar a melhor forma de os nossos clientes se tonarem vossos clientes.
                                </Text>
                                <Text style={[styles.noticeText, styles.noticeTextMargin]}>
                                    Indique um email seguro, com retorno rápido.
                                </Text>
                            </View>
                            <View style={styles.noticeIconContainer}>
                                <Ionicons name="alert-circle-outline" size={30} color="#a16207" />
                            </View>
                        </View>
                    </View>

                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>6 de 6</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            onPress={() => commerceNavigation.navigate("new_commerce_step_7")}
                            activeOpacity={0.7}
                            style={styles.nextButtonContent}
                        >
                            <Feather name="check" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    section: {
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 15
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    inputHighlightVisible: {
        opacity: 0.15,
        borderColor: '#6610F2',
    },
    inputFocused: {
        borderColor: '#000000',
    },
    inputError: {
        borderColor: '#DC3545',
    },
    inputErrorHighlight: {
        opacity: 0.20,
        borderColor: '#DC3545',
    },
    noticeContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 32,
    },
    noticeBox: {
        flexDirection: 'row',
        height: 200,
        backgroundColor: '#FEF3C7',
        borderWidth: 1,
        borderColor: '#FDE68A',
        borderRadius: 12,
        padding: 24,
        alignItems: 'center',
    },
    noticeTextContainer: {
        flex: 1,
    },
    noticeText: {
        fontSize: 18,
        color: '#F59E0B',
    },
    noticeTextMargin: {
        marginTop: 16,
    },
    noticeIconContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 16,
    },

    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 120
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    stepperLayout: {
        height: 6,
        width: 14,
        backgroundColor: '#121212',
        borderRadius: 22,
        opacity: 0.5,
        marginTop: 2
    },
    stepperLayoutSelected: {
        opacity: 1,
        width: 31,
        backgroundColor: '#121212',
        borderRadius: 22,
        height: 6,
        marginTop: 2
    },
    stepperLayoutText: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 78,
        height: 78,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
});
