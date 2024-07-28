import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import UnderlineIcon from '@/assets/icons/underlineIcon';
import PaintBrushIcon from '@/assets/icons/paintBrushIcon';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_3({ route }: any) {
    const commerceNavigation = useNavigation<CommerceNavigationProp>();

    const {
        CashbackType, PlaceType, referenceUser,
        association, title, userPoints, webSite, startDate,
        endDate, startHour, endHour
    } = route.params || {}

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
                    <Text style={styles.headerText}>Descrição</Text>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => commerceNavigation.navigate("home")}
                    >
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <View style={styles.descriptionSection}>
                    <Text style={styles.descriptionLabel}>Descreva o evento</Text>
                    <View style={styles.formattingBar}>
                        <TouchableOpacity>
                            <Feather name="bold" size={30} color="black" />
                        </TouchableOpacity>
                        
                        <TouchableOpacity>
                            <Feather name="italic" size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <UnderlineIcon size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <PaintBrushIcon size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesome6 name="list-ol" size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <FontAwesome6 name="list" size={30} color="black" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Feather name="link" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textInputContainer}>
                        <TextInput
                            cursorColor={'#ADB5BD'}
                            style={styles.textInput}
                            multiline
                            editable
                            numberOfLines={15}
                        />
                    </View>
                </View>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>4 de 6</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                    </View>

                    <TouchableHighlight
                        onPress={() => commerceNavigation.navigate("new_commerce_step_4")}
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
    descriptionSection: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 10,
    },
    descriptionLabel: {
        fontSize: 18,
        fontWeight: 'normal',
        marginBottom: 15
    },
    formattingBar: {
        flexDirection: 'row',
        gap: 8,
        backgroundColor: '#F1F1F1',
        height: 56,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    textInputContainer: {
        marginTop: 20,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 8,
        height: 430,
        paddingHorizontal: 15,
        fontSize: 18,
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
