import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, SafeAreaView, ScrollView, Switch, Text, TextInput, TouchableHighlight, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import Select from '../components/select';
import SelectOption from '../components/selectOption';
import { RootStackParamList } from '../types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Profile() {

    const rootNavigation = useNavigation<RootNavigationProp>();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

    const [inputNameIsFocus, setInputNameIsFocus] = useState(false);
    const [inputNameError, setInputNameError] = useState(false);
    const [inputCodeBonusIsFocus, setInputCodeBonusIsFocus] = useState(false);
    const [inputCodeBonusError, setInputCodeBonusError] = useState(false);

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
        setCodeBonus(text);
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <TouchableOpacity
                                onPress={() => rootNavigation.goBack()}
                                style={styles.backButton}
                            >
                                <Ionicons name="chevron-back" size={20} color="black" />
                                <Text style={styles.backButtonText}> Voltar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.saveButton}
                            >
                                <Text style={styles.saveButtonText}>Salvar</Text>
                                <Feather name="check" size={24} color="#0D6EFD" />
                            </TouchableOpacity>
                        </View>
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
                                        <Image source={require("../assets/icons/user-icon.png")} style={styles.image} />
                                        <View style={styles.cameraIconContainer}>
                                            <Feather name="camera" size={20} color="black" />
                                        </View>
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={[styles.formGroup, styles.marginTop, {paddingHorizontal: 70}]}>
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
                                    style={[
                                        styles.textInput,
                                        inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                        inputPasswordError && styles.inputError
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nome</Text>
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
                                    style={[
                                        styles.textInput,
                                        inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                        inputPasswordError && styles.inputError
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={[styles.formGroup, styles.marginTop]}>
                            <View style={styles.headerRow}>
                                <Text style={styles.label}>Email</Text>

                            </View>
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
                                    style={[
                                        styles.textInput,
                                        inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                        inputPasswordError && styles.inputError
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={[styles.formGroup, styles.marginTop]}>
                            <View style={styles.headerRow}>
                                <Text style={styles.label}>Telemovel</Text>
                            </View>
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
                                    style={[
                                        styles.textInput,
                                        inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                        inputPasswordError && styles.inputError
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={[styles.selectGroup, styles.marginTop]}>
                            <Text style={styles.label}>País</Text>
                            <Select
                                options={countryOptions}
                                onChangeSelect={(id: number) => console.log(id)}
                                text={'Selecione o país'}
                                SelectOption={SelectOption}
                            />
                        </View>
                        <View style={[styles.selectGroup, styles.marginTop]}>
                            <Text style={styles.label}>Moeda</Text>
                            <Select
                                options={currencyOptions}
                                onChangeSelect={(id: number) => console.log(id)}
                                text={'Selecione a moeda'}
                                SelectOption={SelectOption}
                            />
                        </View>
                        <View style={[styles.formGroup, styles.marginTop]}>
                            <View style={styles.headerRow}>
                                <Text style={styles.label}>Código Bonus</Text>
                                <Text style={styles.optionalLabel}>Opcional</Text>
                            </View>
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
                                    style={[
                                        styles.textInput,
                                        inputPasswordIsFocus && (inputPasswordError ? styles.inputError : styles.inputFocused),
                                        inputPasswordError && styles.inputError
                                    ]}
                                />
                            </View>
                        </View>
                        <View style={[styles.switchGroup, styles.marginTop]}>
                            <View style={styles.switchRow}>
                                <Text style={styles.label}>Localização</Text>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>
                            <View style={styles.optionRow}>
                                <Text style={styles.optionText}>Alterar Pin</Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                            <View style={styles.optionRow}>
                                <Text style={styles.optionText}>Alterar Password</Text>
                                <Entypo name="chevron-right" size={24} color="black" />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollView: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 56,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    backButtonText: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 4,
    },
    saveButtonText: {
        fontSize: 20,
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
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
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
    selectGroup: {
        width: '100%',
        gap: 8,
    },
    marginTop: {
        marginTop: 16,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    optionalLabel: {
        fontSize: 14,
        backgroundColor: '#F3F4F6',
        color: '#6B7280',
        padding: 4,
        borderRadius: 8,
        fontWeight: '600',
    },
    switchGroup: {
        width: '100%',
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
    optionText: {
        fontSize: 20,
        color: '#3b82f6',
    },
});
