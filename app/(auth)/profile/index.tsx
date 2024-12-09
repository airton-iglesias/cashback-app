import React, { useEffect, useState } from 'react';
import {
    Image, KeyboardAvoidingView, ScrollView,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet,
    Modal,
    ActivityIndicator
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import Input from '@/components/input';
import Switch from '@/components/switch';
import * as Clipboard from 'expo-clipboard';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import SelectLanguage from '@/components/selectLanguage';
import { Skeleton } from 'moti/skeleton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProfileValidationData, ProfileValidationSchema } from '@/schemas/profileSchemas';

export default function Profile() {

    const [image, setImage] = useState<any>(null);
    const [country, setCountry] = useState<string>('Selecione o país');
    const [currency, setCurrency] = useState<string>('Selecione a moeda');
    const [location, setLocation] = useState(false);
    const [accountID, setAccountID] = useState<string | null>(null);

    const { t } = useLocale();
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [isPermissionModalVisible, setIsPermissionModalVisible] = useState(false);
    const [savedSuccess, setSavedSuccess] = useState(false);
    const [requestLoading, setRequestLoading] = useState(false);

    const countryOptions = [
        { id: 1, text: 'Portugal' },
        { id: 2, text: 'Brasil' },
        { id: 3, text: 'Estados Unidos' },
    ];

    const currencyOptions = [
        { id: 1, text: 'EUR' },
        { id: 2, text: 'BRL' },
        { id: 3, text: 'USD' },
    ];

    // React Hook Form setup
    const profileSchema = React.useMemo(() => ProfileValidationSchema(t), [t]);
    const { control, handleSubmit, formState: { errors }, reset, } = useForm<ProfileValidationData>({
        resolver: zodResolver(profileSchema), mode: "onChange",
        defaultValues: {
            name: '',
            email: '',
            telemovel: '',
        },
    });

    useEffect(() => {
        const loadProfileData = async () => {
            setLoadingProfile(true);
            try {
                const fetchedProfileData = {
                    accountID: 'O23I4U5',
                    name: 'Name Example',
                    email: 'example@example.com',
                    telemovel: '9999999999',
                    country: 'Portugal',
                    currency: 'EUR',
                    location: false
                };

                reset({
                    name: fetchedProfileData.name,
                    email: fetchedProfileData.email,
                    telemovel: fetchedProfileData.telemovel,
                });

                setAccountID(fetchedProfileData.accountID);
                setCountry(fetchedProfileData.country);
                setCurrency(fetchedProfileData.currency);
                setLocation(fetchedProfileData.location);
            } catch (error) {
                console.error("Erro ao carregar o perfil", error);
            } finally {
                setTimeout(() => setLoadingProfile(false), 2000)
            }
        };

        loadProfileData();
    }, []);

    const handleImagePick = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            setIsPermissionModalVisible(true);
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

    const copyToClipboard = (item: string) => {
        Clipboard.setStringAsync(item);
    };

    const onSubmit = (data: any) => {
        setRequestLoading(true);
        console.log(data.name, data.email, data.telemovel);

        setTimeout(() => {
            setRequestLoading(false);
            setSavedSuccess(true);
        }, 2000);
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white' }}>
            <KeyboardAvoidingView>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={20} color="black" />
                        <Text style={styles.backButtonText}>{t("profile.headerBackLabel")}</Text>
                    </TouchableOpacity>

                    {requestLoading ? (
                        <ActivityIndicator size={40} color="#0D6EFD" />
                    ) : (
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={handleSubmit(onSubmit)}
                        >
                            <Text style={styles.saveButtonText}>{t("profile.headerSaveLabel")}</Text>
                            <Feather name="check" size={24} color="#0D6EFD" />
                        </TouchableOpacity>
                    )}
                </View>

                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.container}>

                        <View style={styles.imageContainer}>
                            <TouchableWithoutFeedback onPress={handleImagePick} style={{ borderRadius: 8 }}>
                                {loadingProfile ?
                                    <Skeleton
                                        show
                                        radius={'round'}
                                        colorMode='light'
                                        height={128}
                                        width={128}
                                    />
                                    :
                                    image ? (
                                        <View>
                                            <Image source={{ uri: image }} style={styles.image} />
                                            <View style={styles.cameraIconContainer}>
                                                <Feather name="camera" size={20} color="black" />
                                            </View>
                                        </View>
                                    ) : (
                                        <View>
                                            <Image source={require("@/assets/icons/user-icon.png")} style={styles.image} />
                                            <View style={styles.cameraIconContainer}>
                                                <Feather name="camera" size={20} color="black" />
                                            </View>
                                        </View>
                                    )
                                }
                            </TouchableWithoutFeedback>
                        </View>

                        {loadingProfile ?
                            <Skeleton
                                height={50}
                                width={150}
                                colorMode='light'
                            />
                            :
                            <View style={styles.formGroupID}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    style={styles.couponInput}
                                    value={'ID: ' + accountID}
                                    placeholderTextColor={'#ADB5BD'}
                                    editable={false}
                                    textAlign='center'
                                />
                                <TouchableOpacity style={styles.copyIconContainer} onPress={() => copyToClipboard(accountID || '')}>
                                    <Ionicons name="copy-outline" size={18} color="#495057" />
                                </TouchableOpacity>
                            </View>
                        }

                        <View style={styles.formGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <Controller
                                    control={control}
                                    name="name"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label={t("profile.nameLabel")}
                                            onChange={(text) => {
                                                // Permitir letras, espaços e acentos
                                                const sanitizedValue = text.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
                                                onChange(sanitizedValue);
                                            }}
                                            value={value}
                                            error={errors.name?.message}
                                        />
                                    )}
                                />
                            }
                        </View>

                        <View style={styles.formGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <Controller
                                    control={control}
                                    name="email"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label={t("profile.emailLabel")}
                                            type={'email'}
                                            value={value}
                                            onChange={onChange}
                                            error={errors.email?.message}
                                        />
                                    )}
                                />
                            }
                        </View>

                        <View style={styles.formGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <Controller
                                    control={control}
                                    name="telemovel"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <Input
                                            label={t("profile.phoneLabel")}
                                            value={value}
                                            onChange={onChange}
                                            keyboardType={'numeric'}
                                            error={errors.telemovel?.message}
                                        />
                                    )}
                                />
                            }
                        </View>

                        <View style={styles.selectGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <View style={{ gap: 4 }}>
                                    <Text style={styles.label}>{t("profile.countryLabel")}</Text>
                                    <Select
                                        options={countryOptions}
                                        onChangeSelect={(item: any) => setCountry(item.name)}
                                        text={country}
                                        SelectOption={SelectOption}
                                    />
                                </View>
                            }
                        </View>

                        <View style={styles.selectGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <View style={{ gap: 4 }}>
                                    <Text style={styles.label}>{t("profile.currencyLabel")}</Text>
                                    <Select
                                        options={currencyOptions}
                                        onChangeSelect={(item: any) => setCurrency(item.name)}
                                        text={currency}
                                        SelectOption={SelectOption}
                                    />
                                </View>
                            }
                        </View>

                        <View style={styles.selectGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <View style={{ gap: 4 }}>
                                    <Text style={styles.label}>{t("profile.languageLabel")}</Text>
                                    <SelectLanguage
                                        SelectOption={SelectOption}
                                    />
                                </View>
                            }
                        </View>

                        <View style={styles.switchGroup}>
                            {loadingProfile ?
                                <Skeleton
                                    width={'100%'}
                                    height={48}
                                    colorMode='light'
                                />
                                :
                                <View style={styles.optionRow}>
                                    <Text style={styles.label}>{t("profile.locationLabel")}</Text>
                                    <Switch onChange={(mode: boolean) => setLocation(mode)} />
                                </View>
                            }

                            <View style={styles.optionRow}>
                                {loadingProfile ?
                                    <Skeleton
                                        width={'100%'}
                                        height={48}
                                        colorMode='light'
                                    />
                                    :
                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => router.push("/resetPin")}
                                    >
                                        <Text style={styles.optionText}>{t("profile.changePin")}</Text>
                                        <Entypo name="chevron-right" size={24} color="black" />
                                    </TouchableOpacity>
                                }
                            </View>

                            <View style={styles.optionRow}>
                                {loadingProfile ?
                                    <Skeleton
                                        width={'100%'}
                                        height={48}
                                        colorMode='light'
                                    />
                                    :
                                    <TouchableOpacity
                                        style={styles.optionButton}
                                        onPress={() => router.push("/resetPassword/verificationCodeSent")}
                                    >
                                        <Text style={styles.optionText}>{t("profile.changePassword")}</Text>
                                        <Entypo name="chevron-right" size={24} color="black" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={isPermissionModalVisible}
                        onRequestClose={() => setIsPermissionModalVisible(!isPermissionModalVisible)}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalView}>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <View style={styles.iconContainer}>
                                        <Feather name="alert-triangle" size={24} color="#664D03" />
                                    </View>
                                </View>

                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Text style={styles.modalText}>{t("profile.noPermissionGallery")}</Text>
                                </View>

                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={() => setIsPermissionModalVisible(!isPermissionModalVisible)}
                                    style={styles.modalSaveButton}
                                >
                                    <View style={styles.modalButtonSaveContent}>
                                        <Feather name="check" size={24} color="black" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </ScrollView>
            </KeyboardAvoidingView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={savedSuccess}
                onRequestClose={() => {
                    setSavedSuccess(false);
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <View style={[styles.iconContainer, { backgroundColor: '#000', width: 60, height: 60 }]}>
                            <Feather name="check-circle" size={60} color="#4ade80" />
                        </View>
                        <View>
                            <Text style={styles.modalText}>{t("profile.savedSuccess")}</Text>
                        </View>
                        <View style={styles.buttonContainer}>

                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => setSavedSuccess(false)}
                                style={styles.modalSaveButton}
                            >
                                <View style={styles.modalButtonSaveContent}>
                                    <Feather name="check" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView >
    );
}


const styles = StyleSheet.create({
    scrollView: {
        paddingBottom: 140
    },
    container: {
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 15,
        height: 60
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    backButtonText: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: 'normal',
        marginLeft: 5
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    saveButtonText: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: 'normal',
        color: '#3b82f6',
        marginRight: 4
    },
    imageContainer: {
        height: 128,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
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
    formGroup: {
        width: '100%',
        gap: 8,
        marginTop: 16
    },
    label: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
    },
    selectGroup: {
        width: '100%',
        gap: 8,
        marginTop: 16
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    switchGroup: {
        width: '100%',
        marginTop: 10
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingBottom: 8,
    },
    optionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#D2D2D2',
        paddingVertical: 16,
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },
    optionText: {
        fontSize: fontSize.labels.medium,
        color: '#3b82f6',
    },
    formGroupID: {
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 70,
        flexDirection: 'row'
    },
    couponInput: {
        borderColor: '#ADB5BD',
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        paddingHorizontal: 20,
        fontSize: fontSize.labels.medium,
        backgroundColor: '#FFF',
        width: '78%',
        height: 48,
        color: '#000'
    },
    copyIconContainer: {
        height: 48,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: '#F3F4F6',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        borderColor: '#E9ECEF',
        borderWidth: 1,
        zIndex: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        zIndex: 10
    },
    modalContent: {
        width: '100%',
        padding: 25,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginVertical: 20,
        color: '#fff',
        textAlign: 'center'
    },
    iconContainer: {
        height: 56,
        width: 56,
        borderRadius: 28,
        backgroundColor: '#FFF3CD',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: '#000',
        paddingHorizontal: 20,
        paddingVertical: 30,
        alignItems: 'center',
        shadowRadius: 4,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        gap: 20,
        width: '100%'
    },
    modalSaveButton: {
        width: '100%',
        borderRadius: 8,
    },
    modalButtonSaveContent: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
    buttonContainer: {
        gap: 10,
        justifyContent: 'space-between',
        width: '100%',
    },

});

