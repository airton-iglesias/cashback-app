import { useEffect, useState } from "react";
import {
    Image, SafeAreaView, Text, TouchableWithoutFeedback,
    View, KeyboardAvoidingView, StyleSheet,
    TouchableOpacity,
    Keyboard,
    ActivityIndicator
} from "react-native";
import { Feather } from '@expo/vector-icons';
import CheckBox from "@/components/checkbox";
import { useLocale } from "@/contexts/TranslationContext";
import LanguageModal from "@/components/languageModal";
import Input from "@/components/input";
import { Link, router } from "expo-router";
import { fontSize } from "@/constants/fonts";

export default function SigninScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);

    const { t } = useLocale();
    const [modalVisible, setModalVisible] = useState(false);
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);

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
    }, []);

    const handleSubmit = async () => {
        setLoading(true);
        /* make the request to the API here
        //Example: 
        const loginResponse = await
            fetch('domain of application here', {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
            })
            .catch((error) => {
                console.log(error)
            });

            //...Other things
        */
        setTimeout(() => {
            setLoading(false);
            router.replace("/pin");
        }, 1000);
    }

    const handleCheck = () => {
        setChecked(!isChecked);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={[styles.container, keyboardIsVisible && ({ paddingTop: 70 })]}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <LanguageModal
                    modalVisible={modalVisible}
                    handleCloseModal={handleCloseModal}
                />

                {!keyboardIsVisible && (
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Image
                                source={require("@/assets/images/logo-light.png")}
                                resizeMode="contain"
                                style={styles.logoImage}
                            />
                        </View>
                    </View>
                )}

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
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        <View style={styles.submitButton}>
                            {loading ? 
                                <ActivityIndicator size={24} color="#fff" />
                                :
                                <Feather name="arrow-right" size={24} color={'white'} />
                            }
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        disabled={loading}
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
    logoImage: {
        flex: 1, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'white'
    }
});
