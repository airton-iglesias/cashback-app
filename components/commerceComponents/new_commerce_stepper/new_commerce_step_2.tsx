import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import Input from '@/components/input';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function New_Commerce_step_2({ route }: any) {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const {
        CashbackType, 
        PlaceType, 
        referenceUser, 
        association, 
        title, 
        userPoints } = route.params || {};

    const [webSite, setWebsite] = useState<string>('');
    const [startDate, setStartDate] = useState<string>('');
    const [endDate, setEndDate] = useState<string>('');
    const [startHour, setStartHour] = useState<string>('');
    const [endHour, setEndHour] = useState<string>('');

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => commerceNavigation.goBack()}
                        >
                            <Octicons name="chevron-left" size={32} color="black" />

                        </TouchableOpacity>
                        <Text style={styles.headerText}>Local e horário</Text>
                        <TouchableOpacity style={styles.closeButton}
                            onPress={() => commerceNavigation.navigate("home")}
                        >
                            <AntDesign name="close" size={28} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.longInputWrapper}>
                        <Input
                            label={'Web Site'}
                            placeholder={'https://www.website.com'}
                            type={'url'}
                            onChange={(text: string) => setWebsite(text)}
                        />
                    </View>

                    <View style={styles.dateTimeSection}>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={"Data de início"}
                                maxLength={10}
                                type={'date'}
                                onChange={(text: string) => setStartDate(text)}
                            />
                        </View>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={"Data de fim"}
                                maxLength={10}
                                type={'date'}
                                onChange={(text: string) => setEndDate(text)}
                            />
                        </View>
                    </View>

                    <View style={styles.dateTimeSection}>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={"Hora de início"}
                                type={'time'}
                                maxLength={8}
                                onChange={(text: string) => setStartHour(text)}
                            />
                        </View>
                        <View style={styles.dateTimeBlock}>
                            <Input
                                label={"Hora de fim"}
                                type={'time'}
                                maxLength={8}
                                onChange={(text: string) => setStartHour(text)}
                            />
                        </View>
                    </View>

                    {PlaceType && PlaceType === "Físico" ?
                        <View>
                            <View style={styles.longInputWrapper}>
                                <Input
                                    label={"Local do estabelecimento"}
                                    placeholder={"Complexo Desportivo municipal do..."}
                                    onChange={(text: string) => setEndHour(text)}
                                />
                            </View>
                            <View style={styles.mapContainer}>
                                <View style={styles.mapPlaceholder}>
                                    <Text style={styles.mapText}>Maps</Text>
                                </View>
                            </View>
                        </View>
                        :
                        null
                    }

                    <View style={[styles.footer, {paddingTop: PlaceType === "Físico" ? 30: 150}]}>
                        <View style={styles.stepperLayoutContainer}>
                            <Text style={styles.stepperLayoutText}>3 de 6</Text>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayoutSelected}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                        </View>

                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_step_3",
                                {
                                    CashbackType, PlaceType, referenceUser, 
                                    association, title, userPoints, webSite, startDate, 
                                    endDate, startHour, endHour
                                }
                            )}
                            underlayColor="#e5e7eb"
                            activeOpacity={0.6}
                            style={styles.nextButton}
                        >
                            <View style={styles.nextButtonContent}>
                                <Feather name="arrow-right" size={24} color="white" />
                            </View>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingTop: 30
    },
    backButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        paddingBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    headerButtonLeft: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    inputSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    inputLabel: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 4
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

    longInputWrapper: {
        paddingHorizontal: 15,
        marginTop: 20,
    },
    dateTimeSection: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 15,
        gap: 15
    },
    dateTimeBlock: {
        flex: 1,
        width: '100%',
        marginTop: 20,
    },
    mapContainer: {
        width: '100%',
        height: 205,
        paddingHorizontal: 16,
        marginTop: 24,
    },
    mapPlaceholder: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapText: {
        fontSize: 24,
        color: '#6C757D',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 24,
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    stepperLayout: {
        height: 6,
        width: 14,
        backgroundColor: '#121212',
        borderRadius: 22,
        opacity: 0.5,
        marginTop: 2
    },
    stepperLayoutSelected: {
        opacity: 1,
        width: 31,
        backgroundColor: '#121212',
        borderRadius: 22,
        height: 6,
        marginTop: 2
    },
    stepperLayoutText: {
        fontSize: 18,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 64,
        height: 64,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
});
