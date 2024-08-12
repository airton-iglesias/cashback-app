import { useEffect, useState } from "react";
import {
    Image, SafeAreaView, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback,
    View, KeyboardAvoidingView, ScrollView, StyleSheet, Dimensions
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from '../types/navigationTypes';
import { Feather } from '@expo/vector-icons';
import CheckBox from "../components/checkbox";
import { useLocale } from "../contexts/TranslationContext";
import LanguageModal from "@/components/languageModal";
import Input from "@/components/input";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const windowHeight = Dimensions.get('window').height;

export default function SigninScreen() {

    const { t } = useLocale();

    const authNavigation = useNavigation<AuthNavigationProp>();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecked, setChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setModalVisible(true)
        }, 300)

    }, [])

    const handleCheck = () => {
        setChecked(!isChecked);
    };

    const handleSubmit = () => {
        authNavigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: 'pinValidate' }],
            })
        );
    };

    const handleCloseModal = () => {
        setModalVisible(false);
    };

    return (
        <SafeAreaView style={styles.safeareaview}>
            <LanguageModal
                modalVisible={modalVisible}
                handleCloseModal={handleCloseModal}
            />
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.container}>
                        <View style={styles.logoContainer}>
                            <View style={styles.logo}>
                                <Text style={styles.logoText}>LOGO</Text>
                            </View>
                        </View>

                        <View style={styles.header}>
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
                                label="Esse é um checkbox"
                                labelStyle={{ color: '#fff000', fontSize: 16 }}
                                iconColor="#fff"
                                checkColor="#fff600"
                                value={isChecked}
                                onChange={handleCheck}
                            />
                            <Text style={styles.checkboxLabel}>{t('signin.keepLogged')}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableHighlight onPress={handleSubmit}
                                underlayColor="#e5e7eb"
                                activeOpacity={0.6}
                                style={styles.buttonWrapper}
                            >
                                <View style={styles.submitButton}>
                                    <Feather name="arrow-right" size={24} color={'white'} />
                                </View>
                            </TouchableHighlight>

                            <TouchableHighlight
                                underlayColor="#e5e7eb"
                                activeOpacity={0.6}
                                style={styles.buttonWrapper}
                            >
                                <View style={styles.googleButton}>
                                    <Image source={require("../assets/icons/google-icon.png")} style={styles.googleIcon} />
                                </View>
                            </TouchableHighlight>

                            <View style={styles.linkWrapper}>
                                <TouchableWithoutFeedback onPress={() => authNavigation.navigate('signup')}>
                                    <Text style={styles.link}>{t('signin.createAccount')}</Text>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => authNavigation.navigate('recoveryDatas')}>
                                    <Text style={styles.link}>{t('signin.forgotPassword')}</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeareaview: {
        backgroundColor: 'white',
        height: '100%'
    },
    container: {
        flex: 1,
        height: windowHeight,
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        backgroundColor: 'white',
        paddingBottom: 30
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
    header: {
        width: '100%',
        padding: 5,
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 4
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        width: '100%',
        height: 60,
    },
    checkboxLabel: {
        fontSize: 20,
        marginBottom: 2,
        marginLeft: 5
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
        justifyContent: 'flex-end'
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
        fontSize: 20,
        color: '#1E40AF',
    },
});
