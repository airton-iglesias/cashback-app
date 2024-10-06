import React, { useEffect, useState } from 'react';
import { Link, useLocalSearchParams } from 'expo-router';
import {
    Dimensions, Image, Keyboard, KeyboardAvoidingView, SafeAreaView,
    StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import { useLocale } from '@/contexts/TranslationContext';
import Input from '@/components/input';
import { fontSize } from '@/constants/fonts';


const windowHeight = Dimensions.get('window').height;

export default function SigninScreen() {
    const { email, password } = useLocalSearchParams();
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');
    const [keyboardIsVisible, setKeyboardIsVisible] = useState(false);
    const { t } = useLocale();

    const countryOptions = [
        { id: 1, text: 'Portugal', flag: 'PT' },
        { id: 2, text: 'Brasil', flag: 'BR' },
        { id: 3, text: 'Estados Unidos', flag: 'US' },
    ];

    const currencyOptions = [
        { id: 1, text: 'EUR', flag: 'EU' },
        { id: 2, text: 'BRL', flag: 'BR' },
        { id: 3, text: 'USD', flag: 'US' },
    ];

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

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setImage(pickerResult.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <View style={styles.contentWrapper}>

                    {keyboardIsVisible ?
                        null
                        :
                        <View style={styles.imageContainer}>
                            <TouchableWithoutFeedback onPress={handleImagePick} style={{ borderRadius: 8 }}>
                                {image ? (
                                    <View>
                                        <Image source={{ uri: image }} style={styles.image} />
                                        <View style={styles.cameraIconContainer}>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                ) : (
                                    <View>
                                        <Image
                                            source={require("../../assets/icons/user-icon.png")}
                                            style={styles.image}
                                        />
                                        <View style={styles.cameraIconContainer}>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        </View>
                    }

                    <View style={styles.inputGroup}>
                        <Input
                            label={t('signup.signup_step_1.name')}
                            onChange={(text: string) => setName(text)}
                            type={'email'}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('signup.signup_step_1.country')}</Text>
                        <Select
                            options={countryOptions}
                            onChangeSelect={(item: any) => setCountry(`${item.text}`)}
                            text={t("signup.signup_step_1.select_country")}
                            SelectOption={SelectOption}
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('signup.signup_step_1.currency')}</Text>
                        <Select
                            options={currencyOptions}
                            onChangeSelect={(item: any) => setCurrency(`${item.text}`)}
                            text={t("signup.signup_step_1.select_currency")}
                            SelectOption={SelectOption}
                        />
                    </View>
                    <View>
                        <View style={styles.bonusCodeLabelWrapper}>
                            <Text style={styles.label}>{t("signup.signup_step_1.bonus_code")}</Text>
                            <Text style={styles.optionalLabel}>{t("signup.signup_step_1.optional")}</Text>
                        </View>
                        <Input
                            onChange={(text: string) => setCodeBonus(text)}
                        />
                    </View>
                </View>

                <View style={styles.buttonContainer}>
                    <Link href={{
                        pathname: '/signup/step3', params: {
                            email: email, password: password, image: image,
                            name: name, codeBonus: codeBonus, country: country,
                            currency: currency
                        }
                    }} asChild>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.buttonWrapper}
                        >
                            <View style={styles.submitButton}>
                                <Feather name="arrow-right" size={24} color={'white'} />
                            </View>
                        </TouchableOpacity>
                    </Link>
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
        paddingBottom: 10,
        paddingTop: 70
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    imageContainer: {
        height: 150,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 128,
        width: 128,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: '#E5E7EB',
        padding: 52,
        borderRadius: 64,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: -16,
        right: -8,
        width: 48,
        height: 48,
        backgroundColor: '#E5E7EB',
        borderWidth: 4,
        borderColor: '#F8F9FA',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentWrapper: {
        flexGrow: 1,
        gap: 7
    },
    header: {
        width: '100%',
        marginBottom: 15,
    },
    headerText: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
    },
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    label: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4
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

    bonusCodeLabelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    optionalLabel: {
        bottom: 1,
        fontSize: fontSize.labels.mini,
        backgroundColor: '#E5E7EB',
        color: '#6B7280',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontWeight: '600',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
