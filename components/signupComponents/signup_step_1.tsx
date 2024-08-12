import React, { useState } from 'react';
import { useNavigation } from "@react-navigation/native";
import {
    Dimensions, Image, KeyboardAvoidingView, SafeAreaView, ScrollView,
    StyleSheet, Text, TouchableHighlight, TouchableWithoutFeedback, View
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SignupStackParamList } from '@/types/navigationTypes';
import { Feather } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import { useLocale } from '@/contexts/TranslationContext';
import Input from '@/components/input';

type SignupStep2NavigationProp = NativeStackNavigationProp<SignupStackParamList>;

export default function Signup_Step_1({ route }: any) {

    const { email, password } = route.params;
    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('');
    const [codeBonus, setCodeBonus] = useState<string>('');
    const [country, setCountry] = useState<string>('');
    const [currency, setCurrency] = useState<string>('');

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

    const { t } = useLocale();
    const signupNavigation = useNavigation<SignupStep2NavigationProp>();

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

    const handleNextStep = () => {
        signupNavigation.navigate('signup_step_2', { email, password, image, name, country, currency, codeBonus });
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
                            <View style={{ gap: 10 }}>
                                <View style={styles.inputContainer}>
                                    <Input
                                        label={t('signup.signup_step_1.name')}
                                        onChange={(text: string) => setName(text)}
                                    />
                                </View>

                                <View style={styles.selectContainer}>
                                    <View>
                                        <Text style={styles.label}>{t('signup.signup_step_1.country')}</Text>
                                        <Select
                                            options={countryOptions}
                                            onChangeSelect={(item: any) => setCountry(`${item.text}`)}
                                            text={t("signup.signup_step_1.select_country")}
                                            SelectOption={SelectOption}
                                        />
                                    </View>

                                    <View>
                                        <Text style={styles.label}>{t('signup.signup_step_1.currency')}</Text>
                                        <Select
                                            options={currencyOptions}
                                            onChangeSelect={(item: any) => setCurrency(`${item.text}`)}
                                            text={t("signup.signup_step_1.select_currency")}
                                            SelectOption={SelectOption}
                                        />
                                    </View>
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
                        </View>

                        <View style={[styles.nextButtonContainer]}>
                            <View>
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
};

const windowHeight = Dimensions.get('window').height;

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
    selectContainer: {
        width: '100%',
        gap: 10
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
    icon: {
        color: 'white',
        padding: 11,
    },
});
