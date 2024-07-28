import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import { Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, TouchableWithoutFeedback, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignupStackParamList } from '../../types/navigationTypes';
import { Feather } from '@expo/vector-icons';
import Select from '../select';
import SelectOption from '../selectOption';
import { useLocale } from '../../contexts/TranslationContext';

type SignupStep2NavigationProp = NativeStackNavigationProp<SignupStackParamList>;

const windowHeight = Dimensions.get('window').height;

export default function Signup_Step_1({ route }: any) {

    const { t } = useLocale();

    const signupNavigation = useNavigation<SignupStep2NavigationProp>();
    const { email, password } = route.params;

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

    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');

    const [inputNameIsFocus, setInputNameIsFocus] = useState(false);
    const [inputNameError, setInputNameError] = useState(false);
    const [inputCodeBonusIsFocus, setInputCodeBonusIsFocus] = useState(false);
    const [inputCodeBonusError, setInputCodeBonusError] = useState(false);

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

    const handleNameChange = (text: string) => {
        setName(text);
    }

    const handleBonusCodeChange = (text: string) => {
        setCodeBonus(text)
    }

    const handleNextStep = () => {
        signupNavigation.navigate('signup_step_2', { email, password, country, currency, image });
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.innerContainer}>
                        <View style={styles.subInnerContainer}>

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
                                            <Image source={require("../../assets/icons/user-icon.png")} style={styles.image} />
                                            <View style={styles.cameraIconContainer}>
                                                <Feather name="camera" size={20} color="black" />
                                            </View>
                                        </View>
                                    )}
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{gap:10}}>
                                <View style={styles.inputContainer}>
                                    <Text style={styles.label}>{t('signup_step_1.name')}</Text>
                                    <View style={styles.inputWrapper}>
                                        <View style={[
                                            styles.inputFocus,
                                            {
                                                borderColor: inputNameIsFocus
                                                    ? inputNameError ? '#DC3545' : '#6610F2'
                                                    : 'transparent',
                                                opacity: inputNameIsFocus ? 0.15 : 0,
                                            },
                                        ]} />
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            onFocus={() => setInputNameIsFocus(true)}
                                            onBlur={() => setInputNameIsFocus(false)}
                                            onChangeText={handleNameChange}
                                            value={name}
                                            style={[
                                                styles.input,
                                                {
                                                    borderColor: inputNameIsFocus
                                                        ? inputNameError ? '#DC3545' : 'black'
                                                        : inputNameError ? '#DC3545' : 'gray',
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>

                                <View style={styles.selectContainer}>
                                    <View>
                                        <Text style={styles.label}>{t('signup_step_1.country')}</Text>
                                        <Select
                                            options={countryOptions}
                                            onChangeSelect={(item: any) => setCountry(`${item.text}`)}
                                            text={t("signup_step_1.select_country")}
                                            SelectOption={SelectOption}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.label}>{t('signup_step_1.currency')}</Text>
                                        <Select
                                            options={currencyOptions}
                                            onChangeSelect={(item: any) => setCurrency(`${item.text}`)}
                                            text={t("signup_step_1.select_currency")}
                                            SelectOption={SelectOption}
                                        />
                                    </View>
                                </View>

                                <View style={styles.bonusCodeContainer}>
                                    <View style={styles.bonusCodeLabelWrapper}>
                                        <Text style={styles.label}>{t("signup_step_1.bonus_code")}</Text>
                                        <Text style={styles.optionalLabel}>{t("signup_step_1.optional")}</Text>
                                    </View>
                                    <View style={styles.inputWrapper}>
                                        <View
                                            style={[
                                                styles.inputFocus,
                                                {
                                                    borderColor: inputCodeBonusIsFocus
                                                        ? inputCodeBonusError ? '#DC3545' : '#6610F2'
                                                        : 'transparent',
                                                    opacity: inputCodeBonusIsFocus ? 0.15 : 0,
                                                },
                                            ]}
                                        />
                                        <TextInput
                                            cursorColor={'#ADB5BD'}
                                            onFocus={() => setInputCodeBonusIsFocus(true)}
                                            onBlur={() => setInputCodeBonusIsFocus(false)}
                                            onChangeText={handleBonusCodeChange}
                                            value={codeBonus}
                                            style={[
                                                styles.input,
                                                {
                                                    borderColor: inputCodeBonusIsFocus
                                                        ? inputCodeBonusError ? '#DC3545' : 'black'
                                                        : inputCodeBonusError ? '#DC3545' : 'gray',
                                                },
                                            ]}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={[styles.nextButtonContainer]}>
                            <View style={styles.fullWidth}>
                                <TouchableHighlight onPress={handleNextStep}
                                    underlayColor="#e5e7eb"
                                    activeOpacity={0.6}
                                    style={styles.nextButtonWrapper}
                                >
                                    <View style={styles.nextButton}>
                                        <Feather name="arrow-right" size={24} style={styles.icon} />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight,
        backgroundColor: 'white'
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 56,
        justifyContent: 'space-between',
        height: windowHeight,
        paddingBottom: 30
    },
    subInnerContainer: {
        width: "100%",
    },
    imageContainer: {
        height: 200,
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
    inputContainer: {
        width: '100%',
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 4
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputFocus: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
        borderRadius: 10,
        opacity: 0,
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 48,
        fontSize: 20,
        color: '#ADB5BD',
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
    selectContainer: {
        width: '100%',
        gap: 10
    },
    bonusCodeContainer: {
        width: '100%',
    },
    bonusCodeLabelWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4
    },
    optionalLabel: {
        bottom: 1,
        fontSize: 14,
        backgroundColor: '#E5E7EB',
        color: '#6B7280',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontWeight: '600',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nextButtonContainer: {
        width: '100%',
    },
    nextButtonWrapper: {
        borderRadius: 8,
    },
    nextButtonHighlight: {
        borderRadius: 8,
        width: '100%'
    },
    nextButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    fullWidth: {
        width: '100%',
        justifyContent: 'flex-end'
    },
    icon: {
        color: 'white',
        padding: 11,
    },
});
