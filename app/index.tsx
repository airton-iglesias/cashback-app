import { useEffect, useState } from "react";
import {
    Image, SafeAreaView, Text, TouchableWithoutFeedback,
    View, KeyboardAvoidingView, StyleSheet,
    TouchableOpacity,
    Keyboard
} from "react-native";
import { Feather } from '@expo/vector-icons';
import CheckBox from "@/components/checkbox";
import { useLocale } from "@/contexts/TranslationContext";
import LanguageModal from "@/components/languageModal";
import Input from "@/components/input";
import { Link } from "expo-router";
import { fontSize } from "@/constants/fonts";

export default function SigninScreen() {

    const { t } = useLocale();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardIsVisible(true);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardIsVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setModalVisible(true)
        }, 300)

    }, [])

    const handleCheck = () => {
        setChecked(!isChecked);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, keyboardIsVisible ? { paddingTop: 70 } : null]}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <LanguageModal
                    modalVisible={modalVisible}
                    handleCloseModal={handleCloseModal}
                />

                {keyboardIsVisible ?
                    null
                    :
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>LOGO</Text>
                        </View>
                    </View>
                }

                <View style={styles.contentWrapper}>

                    <View style={[styles.header, keyboardIsVisible ? null : { marginTop: 20 }]}>
                        <Text style={styles.headerText}>{t('signin.header')}</Text>
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signin.email')}
                            onChange={(text: string) => setEmail(text)}
                            type={'email'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signin.password')}
                            onChange={(text: string) => setPassword(text)}
                            type={'password'}
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            label=" "
                            labelStyle={{ color: '#fff000', fontSize: 16 }}
                            iconColor="#fff"
                            checkColor="#fff600"
                            value={isChecked}
                            onChange={handleCheck}
                        />
                        <Text style={styles.checkboxLabel}>{t('signin.keepLogged')}</Text>
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Link replace href={"/pin"} asChild>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.submitButton}>
                                <Feather name="arrow-right" size={24} color={'white'} />
                            </View>
                        </TouchableOpacity>
                    </Link>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                    >
                        <View style={styles.googleButton}>
                            <Image source={require("@/assets/icons/google-icon.png")} style={styles.googleIcon} />
                        </View>
                    </TouchableOpacity>

                    <View style={styles.linkWrapper}>
                        <Link href={"/signup"} asChild>
                            <TouchableWithoutFeedback>
                                <Text style={styles.link}>{t('signin.createAccount')}</Text>
                            </TouchableWithoutFeedback>
                        </Link>

                        <Link href={{
                            pathname: '/recover_datas',
                            params: { type: 'password' },
                        }} asChild>
                            <TouchableWithoutFeedback>
                                <Text style={styles.link}>{t('signin.forgotPassword')}</Text>
                            </TouchableWithoutFeedback>
                        </Link>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 35
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    contentWrapper: {
        flexGrow: 1,
        gap: 10
    },
    header: {
        width: '100%',
        marginBottom: 10
    },
    headerText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        width: '100%',
        height: 40,
        marginBottom: 5
    },
    checkboxLabel: {
        fontSize: fontSize.labels.medium,
        marginBottom: 2,
        marginLeft: 5
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    googleButton: {
        flexDirection: 'row',
        gap: 2,
        backgroundColor: '#E5E7EB',
        height: 52,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    googleIcon: {
        width: 32,
        height: 32,
    },
    linkWrapper: {
        gap: 15,
        height: 56,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
        marginTop: 15
    },
    link: {
        fontSize: fontSize.labels.medium,
        color: '#1E40AF',
    },
    logoContainer: {
        width: '100%',
        height: 150,
        padding: 5,
        marginTop: 60
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    logoText: {
        fontSize: 60,
        fontWeight: 'bold',
    },
});
