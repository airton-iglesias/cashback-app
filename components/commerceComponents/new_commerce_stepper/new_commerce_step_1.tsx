import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather } from '@expo/vector-icons';
import Select from '../../select';
import SelectOption from '../../selectOption';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import Input from '@/components/input';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_1({ route }: any) {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const { CashbackType, PlaceType } = route.params;

    const [referenceUser, setReferenceUser] = useState<string>('');
    const [association, setAssiation] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [userPoints, setUserPoints] = useState<string>('');


    const AssociationOptions = [
        { id: 1, text: 'Promoção' },
        { id: 2, text: 'Evento' },
    ];

    const userPointsOptions = [
        { id: 1, text: 'Airton' },
        { id: 2, text: 'Luis' },
        { id: 3, text: 'Bruno' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => commerceNavigation.goBack()}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />

                    </TouchableOpacity>
                    <Text style={styles.headerText}>Dados básicos</Text>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => commerceNavigation.navigate("home")}
                    >
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.longInputWrapper}>
                    <Input
                        label={"Título"}
                        placeholder=""
                        onChange={(text: string) => setTitle(text)}
                        type={'text'}
                    />
                </View>

                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>Associar</Text>
                    <Select
                        options={AssociationOptions}
                        onChangeSelect={(item: any) => setAssiation(item.text)}
                        text={''}
                        SelectOption={SelectOption}
                    />
                </View>

                <View style={styles.selectSection}>
                    <Text style={styles.inputLabel}>Creditar pontos no usuário</Text>
                    <Select
                        options={userPointsOptions}
                        onChangeSelect={(item: any) => setUserPoints(item.text)}
                        text={''}
                        SelectOption={SelectOption}
                    />
                </View>

                <View style={styles.longInputWrapper}>
                    <Input
                        label={"Referido por"}
                        placeholder=""
                        onChange={(text: string) => setReferenceUser(text)}
                        type={'text'}
                    />
                </View>
                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>2 de 6</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                    </View>

                    <TouchableHighlight
                        onPress={() => commerceNavigation.navigate("new_commerce_step_2",
                            { CashbackType, PlaceType, referenceUser, association, title, userPoints }
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
        </SafeAreaView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
    inputLabel: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 4
    },
    longInputWrapper: {
        paddingHorizontal: 15,
        marginTop: 24,
    },
    selectSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 24,
        paddingTop: 90
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