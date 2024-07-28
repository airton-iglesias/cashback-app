import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TouchableHighlight, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_4() {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [isChecked, setChecked] = useState(false);

    const handleCheck = () => {
        setChecked(!isChecked);
    }

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
                        <Text style={styles.headerText}>Imagens e vídeos</Text>
                        <TouchableOpacity style={styles.closeButton}
                            onPress={() => commerceNavigation.navigate("home")}
                        >
                            <AntDesign name="close" size={28} color="black" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Logomarca</Text>
                        <View style={styles.uploadContainer}>
                            <Feather name="upload" size={24} color="black" />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Cartaz</Text>
                        <View style={styles.uploadContainer}>
                            <Feather name="upload" size={24} color="black" />
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.imagesHeader}>
                            <Text style={styles.sectionTitle}>Imagens de descrição</Text>
                            <Text style={styles.imageCount}>0/10</Text>
                        </View>
                        <ScrollView horizontal contentContainerStyle={styles.horizontalScrollView}>
                            {[...Array(3)].map((_, index) => (
                                <View key={index} style={styles.uploadContainer}>
                                    <Feather name="upload" size={24} color="black" />
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.stepperLayoutContainer}>
                            <Text style={styles.stepperLayoutText}>5 de 6</Text>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayout}></View>
                            <View style={styles.stepperLayoutSelected}></View>
                            <View style={styles.stepperLayout}></View>
                        </View>

                        <TouchableHighlight
                            onPress={() => commerceNavigation.navigate("new_commerce_step_5")}
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
    section: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 30
    },
    uploadContainer: {
        width: 96,
        height: 96,
        backgroundColor: '#D9D9D956',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    imageCount: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 15
    },
    horizontalScrollView: {
        flexDirection: 'row',
        gap: 16,
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
