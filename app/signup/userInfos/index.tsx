import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { Skeleton } from 'moti/skeleton';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import { useLocale } from '@/contexts/TranslationContext';
import Input from '@/components/input';
import { fontSize } from '@/constants/fonts';
import PermissionGalleryModal from '@/components/permissionGalleryModal';
import { getSignUpStep1Schema, SignUpStep1Data } from '@/schemas/authSchemas';

export default function UserInfos() {
    // Variables for form inputs
    const [image, setImage] = useState<string | null>(null);
    const { email, password } = useLocalSearchParams();

    // State variables for UI states
    const [keyboardIsVisible, setKeyboardIsVisible] = useState<boolean>(false);
    const [isPermissionModalVisible, setIsPermissionModalVisible] = useState<boolean>(false);
    const [countryOptions, setCountryOptions] = useState<Array<string>>([]);
    const [currencyOptions, setCurrencyOptions] = useState<Array<string>>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [selectLoading, setSelectLoading] = useState<boolean>(true);

    // Translation function
    const { t } = useLocale();

    // React Hook Form setup
    const signUpSchema = React.useMemo(() => getSignUpStep1Schema(t), [t]);
    const { control, handleSubmit, formState: { errors } } = useForm<SignUpStep1Data>({
        resolver: zodResolver(signUpSchema),
        mode: 'onChange',
    });

    // Effect to fetch select options data
    useEffect(() => {
        const fetchSelectData = async () => {
            // Make the request to the API here

            // Temporary hardcoded data
            const selectDataResponse: any = {
                country: [
                    { id: 1, text: 'Portugal', flag: 'PT' },
                    { id: 2, text: 'Brasil', flag: 'BR' },
                    { id: 3, text: 'Estados Unidos', flag: 'US' },
                ],
                currency: [
                    { id: 1, text: 'EUR', flag: 'EU' },
                    { id: 2, text: 'BRL', flag: 'BR' },
                    { id: 3, text: 'USD', flag: 'US' },
                ],
            };

            // Simulate an API call delay, you can remove it when making the API call
            setTimeout(() => {
                setCountryOptions(selectDataResponse.country);
                setCurrencyOptions(selectDataResponse.currency);
                setSelectLoading(false);
            }, 2000);
        };

        fetchSelectData();
    }, []);

    const onSubmit = async (data: SignUpStep1Data) => {
        setLoading(true);
        // make the request to the API here

        //parameters:
        console.log(email, password, data.country, data.currency, image, data.codeBonus);

        setTimeout(() => {
            setLoading(false);
            router.replace('/signup/verificationCodeSent');
        }, 2000);

    };

    // Effect to handle keyboard visibility
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

    // Function to handle image picking
    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            setIsPermissionModalVisible(!isPermissionModalVisible);
            return;
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
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
            <PermissionGalleryModal
                isVisible={isPermissionModalVisible}
                onClose={() => setIsPermissionModalVisible(!isPermissionModalVisible)}
            />

            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <View style={styles.contentWrapper}>

                    {/* Image input field */}
                    {!keyboardIsVisible && (
                        <View style={styles.imageContainer}>
                            <TouchableWithoutFeedback onPress={handleImagePick}>
                                <View>
                                    <Image
                                        source={
                                            image
                                                ? { uri: image }
                                                : require('@/assets/icons/user-icon.png')
                                        }
                                        style={styles.image}
                                    />
                                    <View style={styles.cameraIconContainer}>
                                        <Feather name="camera" size={20} color="black" />
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                    {/* End of component */}

                    {/* Name input field */}
                    <View style={styles.inputGroup}>
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    label={t('signup.userInfos.name')}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    error={errors.name?.message}
                                />
                            )}
                        />
                    </View>
                    {/* End of component */}

                    {/* Country input field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('signup.userInfos.country')}</Text>
                        <Skeleton
                            show={selectLoading}
                            colorMode="light"
                            width="100%"
                            height={48}
                        >
                            {selectLoading ? null : (
                                <Controller
                                    control={control}
                                    name="country"
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={countryOptions}
                                            onChangeSelect={(item: any) => onChange(item.text)}
                                            text={value || t("signup.userInfos.select_country")}
                                            SelectOption={SelectOption}
                                            error={errors.country?.message}
                                        />
                                    )}
                                />
                            )}
                        </Skeleton>
                    </View>
                    {/* End of component */}

                    {/* Currency input field */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>{t('signup.userInfos.currency')}</Text>
                        <Skeleton
                            show={selectLoading}
                            colorMode="light"
                            width="100%"
                            height={48}
                        >
                            {selectLoading ? null : (
                                <Controller
                                    control={control}
                                    name="currency"
                                    render={({ field: { onChange, value } }) => (
                                        <Select
                                            options={currencyOptions}
                                            onChangeSelect={(item: any) => onChange(item.text)}
                                            text={value || t("signup.userInfos.select_currency")}
                                            SelectOption={SelectOption}
                                            error={errors.currency?.message}
                                        />
                                    )}
                                />
                            )}
                        </Skeleton>
                    </View>
                    {/* End of component */}

                    {/* CodeBonus input field */}
                    <View>
                        <View style={styles.bonusCodeLabelWrapper}>
                            <Text style={styles.label}>{t('signup.userInfos.bonus_code')}</Text>
                            <Text style={styles.optionalLabel}>{t('signup.userInfos.optional')}</Text>
                        </View>
                        <Controller
                            control={control}
                            name="codeBonus"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <Input
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value || ''}
                                />
                            )}
                        />
                    </View>
                    {/* End of component */}
                </View>

                {/* Buttons wrapper */}
                <View style={styles.buttonContainer}>
                    {/* Submit button */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        onPress={handleSubmit(onSubmit)}
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
                    {/* End of component */}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 70,
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    contentWrapper: {
        flexGrow: 1,
        gap: 10,
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
    inputGroup: {
        width: '100%',
        marginTop: 1,
    },
    label: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4,
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
        marginBottom: 4,
    },
    optionalLabel: {
        fontSize: fontSize.labels.mini,
        backgroundColor: '#E5E7EB',
        color: '#6B7280',
        paddingHorizontal: 6,
        paddingVertical: 4,
        fontWeight: '600',
        borderRadius: 8,
    },
});
