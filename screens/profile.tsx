import React, { useState } from 'react';
import {
    Image, KeyboardAvoidingView, SafeAreaView, ScrollView,
    Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { Feather, Ionicons, Entypo } from '@expo/vector-icons';
import Select from '@/components/select';
import SelectOption from '@/components/selectOption';
import { AuthStackParamList, RootStackParamList } from '@/types/navigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from "@react-navigation/native";
import Input from '@/components/input';
import Switch from '@/components/switch';
import * as Clipboard from 'expo-clipboard';

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function Profile() {

    const rootNavigation = useNavigation<RootNavigationProp>();

    const datas = [{
        accountID: 'O23I4U5',
        bonusCode: '2435IJ3'
    }]

    const [image, setImage] = useState<any>(null);
    const [name, setName] = useState<string>('Name Example');
    const [email, setEmail] = useState<string>('example@example.com');
    const [telemovel, setTelemovel] = useState<string>('9999999999');
    const [country, setCountry] = useState<string>('Selecione o país');
    const [currency, setCurrency] = useState<string>('Selecione a moeda');
    const [location, setLocation] = useState(false);

    const countryOptions = [
        { id: 1, text: 'Portugal', flag: 'PT' },
        { id: 2, text: 'Brasil', flag: 'BR' },
        { id: 3, text: 'Estados Unidos', flag: 'US' },
    ];

    const currencyOptions = [
        { id: 1, text: 'EUR'},
        { id: 2, text: 'BRL'},
        { id: 3, text: 'USD'},
    ];

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
    const copyToClipboard = (item: string) => {
        Clipboard.setStringAsync(item);
    };

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

                        <View style={styles.formGroupID}>
                            <TextInput
                                cursorColor={'#ADB5BD'}
                                style={styles.couponInput}
                                value={'ID: ' + datas[0].accountID}
                                placeholderTextColor={'#ADB5BD'}
                                editable={false}
                                textAlign='center'
                            />
                            <TouchableOpacity style={styles.copyIconContainer} onPress={() => copyToClipboard(datas[0].accountID)}>
                                <Ionicons name="copy-outline" size={18} color="#495057" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.formGroup}>
                            <Input
                                label={'Nome'}
                                onChange={(text: string) => setName(text)}
                                value={name}
                            />
                        </View>


                        <View style={styles.formGroup}>
                            <Input
                                label={'Email'}
                                type={'email'}
                                value={email}
                                onChange={(text: string) => setEmail(text)}
                            />
                        </View>


                        <View style={styles.formGroup}>
                            <Input
                                label={'Telemovel'}
                                value={telemovel}
                                onChange={(text: string) => setTelemovel(text)}
                            />
                        </View>

                        <View style={styles.selectGroup}>
                            <Text style={styles.label}>País</Text>
                            <Select
                                options={countryOptions}
                                onChangeSelect={(item: any) => setCountry(item.name)}
                                text={country}
                                SelectOption={SelectOption}
                            />
                        </View>

                        <View style={styles.selectGroup}>
                            <Text style={styles.label}>Moeda</Text>
                            <Select
                                options={currencyOptions}
                                onChangeSelect={(item: any) => setCurrency(item.name)}
                                text={currency}
                                SelectOption={SelectOption}
                            />
                        </View>

                        <View style={[styles.formGroup]}>
                            <Text style={styles.label}>Bonus Code</Text>
                            <View style={{flexDirection: 'row', width: '100%'}}>
                                <TextInput
                                    cursorColor={'#ADB5BD'}
                                    style={styles.bonusCodeInput}
                                    value={datas[0].bonusCode}
                                    placeholderTextColor={'#ADB5BD'}
                                    editable={false}
                                />
                                <TouchableOpacity style={styles.copyIconContainer} onPress={() => copyToClipboard(datas[0].accountID)}>
                                    <Ionicons name="copy-outline" size={18} color="#495057" />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.switchGroup}>
                            <View style={styles.optionRow}>
                                <Text style={styles.label}>Localização</Text>
                                <Switch onChange={(mode: boolean) => setLocation(mode)} />
                            </View>

                            <View style={styles.optionRow}>
                                <TouchableOpacity
                                    onPress={() => rootNavigation.navigate('recoveryDatas', { type: 'pin' })}
                                    style={styles.optionButton}
                                >
                                    <Text style={styles.optionText}>Alterar Pin</Text>
                                    <Entypo name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.optionRow}>
                                <TouchableOpacity
                                    onPress={() => rootNavigation.navigate('recoveryDatas', { type: 'password' })}
                                    style={styles.optionButton}
                                >
                                    <Text style={styles.optionText}>Alterar Password</Text>
                                    <Entypo name="chevron-right" size={24} color="black" />
                                </TouchableOpacity>
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
        paddingBottom: 30
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
        marginTop: 16
    },
    label: {
        fontSize: 20,
        fontWeight: 'normal',
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 20,
        color: '#3b82f6',
    },
    formGroupID: {
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 70,
        flexDirection: 'row'
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
    bonusCodeInput:{
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        width: '100%',
        height: 48,
        fontSize: 18,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
        flex: 1,
        color: '#000'
    },
    couponInput: {
        borderColor: '#ADB5BD',
        borderWidth: 1,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
        paddingHorizontal: 20,
        fontSize: 18,
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
});
