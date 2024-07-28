import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function New_Commerce_step_6() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const [inputPasswordIsFocus, setInputPasswordIsFocus] = useState(false);
    const [inputPasswordError, setInputPasswordError] = useState(false);
    const [password, setPassword] = useState('');


    const validatePassword = (password: string) => {
        return password.length >= 6;
    };

    const handlePasswordChange = (text: string) => {
        setPassword(text);
        if (text.trim() === '') {
            setInputPasswordError(false);
        } else {
            setInputPasswordError(!validatePassword(text));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => commerceNavigation.goBack()}
                        >
                            <Octicons name="chevron-left" size={32} color="black" />

                        </TouchableOpacity>
                        <Text style={styles.headerText}>Mais informações</Text>
                        <TouchableOpacity style={styles.closeButton}
                            onPress={() => commerceNavigation.navigate("home")}
                        >
                            <AntDesign name="close" size={28} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Email para a nossa equipa o contatar
                        </Text>
                        <View style={styles.inputWrapper}>
                            <View
                                style={[
                                    styles.inputHighlight,
                                    inputPasswordIsFocus && styles.inputHighlightVisible,
                                    inputPasswordError && styles.inputErrorHighlight
                                ]}
                            ></View>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                onFocus={() => setInputPasswordIsFocus(true)}
                                onBlur={() => setInputPasswordIsFocus(false)}
                                onChangeText={handlePasswordChange}
                                value={password}
                                secureTextEntry={true}
                                placeholder='10%'
                                style={[
                                    styles.textInput,
                                    inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                    inputPasswordError && styles.inputError
                                ]}
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

                    <TouchableHighlight
                        onPress={() => commerceNavigation.navigate("new_commerce_step_7")}
                        underlayColor="#e5e7eb"
                        activeOpacity={0.6}
                        style={styles.nextButton}
                    >
                        <View style={styles.nextButtonContent}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableHighlight>
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
        paddingTop: 30
    },
    backButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        paddingBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    headerButtonLeft: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
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
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 20
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
        fontSize: 18,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 64,
        height: 64,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
});
