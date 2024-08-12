import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import RadioCommerce from '../radioCommerce';
import RadioCommerceType from '../radioCommerceType';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather } from '@expo/vector-icons';
import { CommerceStackParamList } from '../../../types/navigationTypes';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList>;

export default function New_Commerce_step_0() {
    
    const [CashbackType, setCashbackType] = useState<string>('Permanente');
    const [PlaceType, setPlaceType] = useState<string>('Físico');

    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [selectedType, setSelectedType] = useState<number>(0);
    const [selectedPlace, setSelectedPlace] = useState<number>(0);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => commerceNavigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'home' }],
                            }))
                        }
                    >
                        <Octicons name="chevron-left" size={32} color="black" />

                    </TouchableOpacity>
                    <Text style={styles.headerText}>Novo</Text>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => commerceNavigation.navigate("home")}
                    >
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Escolha um tipo</Text>
                    <RadioCommerceType
                        selected={selectedType}
                        options={['Permanente', 'Evento', 'Promoção']}
                        onChangeSelect={(opt, i) => { setSelectedType(i); setCashbackType(opt) }}
                    />
                </View>

                <View style={styles.section}>
                    <Text style={[styles.sectionTitle, { marginTop: 10, marginBottom: 35 }]}>Físico ou online?</Text>
                    <RadioCommerce
                        selected={selectedPlace}
                        options={['Físico', 'Web']}
                        onChangeSelect={(opt, i) => { setSelectedPlace(i); setPlaceType(opt) }}
                    />
                </View>
            </ScrollView>
            <View style={styles.footer}>
                <View style={styles.stepperLayoutContainer}>
                    <Text style={styles.stepperLayoutText}>1 de 6</Text>
                    <View style={styles.stepperLayoutSelected}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                    <View style={styles.stepperLayout}></View>
                </View>
                <View
                    style={styles.nextButton}
                >
                    <TouchableOpacity style={styles.nextButtonContent}
                        onPress={() => commerceNavigation.navigate("new_commerce_step_1", { CashbackType, PlaceType })}
                        activeOpacity={0.6}
                    >
                        <Feather name="arrow-right" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
    section: {
        width: '100%',
        paddingHorizontal: 15,
        marginTop: 18,
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 120
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
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
        fontSize: 20,
        fontWeight: 'normal',
    },
    nextButton: {
        borderRadius: 8,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
        flex: 1
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 78,
        height: 78,
        borderRadius: 999,
        paddingHorizontal: 16,
    },
});
