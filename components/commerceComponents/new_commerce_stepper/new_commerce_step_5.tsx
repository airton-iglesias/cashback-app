import React, { useState, useRef } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, TextInput, TouchableHighlight, KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Octicons, AntDesign, FontAwesome6, Feather } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommerceStackParamList } from '../../../types/navigationTypes';
import Select from '../../select';
import SelectOption from '../../selectOption';
import Input from '@/components/input';

type CommerceNavigationProp = NativeStackNavigationProp<CommerceStackParamList, 'home'>;

export default function New_Commerce_step_5({ route }: any) {
    const {
        CashbackType, PlaceType, referenceUser,
        association, title, userPoints, webSite, startDate,
        endDate, startHour, endHour, mapAdress, description,
        logoImage, posterImage, descriptionImages
    } = route.params || {};

    const commerceNavigation = useNavigation<CommerceNavigationProp>();
    const [baseDiscount, setBaseDiscount] = useState<number>();
    const [cashbackForm, setCashbackForm] = useState<number>(0);
    const [sections, setSections] = useState<{ minValue: string, discount: string, type: string }[]>([]);

    const scrollViewRef = useRef<ScrollView>(null);

    const typesOptions = [
        { id: 1, text: 'Fidelização' },
    ];

    const addSection = () => {
        if (sections.length < 10) {
            setSections([...sections, { minValue: '', discount: '', type: '' }]);
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: true });
            }, 200);
        }
    };

    const removeSection = (index: number) => {
        const newSections = [...sections];
        newSections.splice(index, 1);
        setSections(newSections);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => commerceNavigation.goBack()}
                    >
                        <Octicons name="chevron-left" size={32} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Cashback</Text>
                    <TouchableOpacity style={styles.closeButton}
                        onPress={() => commerceNavigation.navigate("home")}
                    >
                        <AntDesign name="close" size={28} color="black" />
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    ref={scrollViewRef} 
                    contentContainerStyle={styles.scrollViewContent}
                >
                    <View style={styles.sectionContainer}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Desconto base em %</Text>
                            <View style={styles.inputWrapper}>
                                <Input
                                    placeholder={'10'}
                                    onChange={(number: number) => setBaseDiscount(number)}
                                    keyboardType={'numeric'}
                                />
                            </View>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Tipo de Cashback</Text>
                            <Select
                                options={typesOptions}
                                onChangeSelect={(item: any) => setCashbackForm(item.name)}
                                text={'Selecione'}
                                SelectOption={SelectOption}
                                selectedOption={0}
                            />
                        </View>
                        {sections.length > 0 ?
                            null 
                            :
                            <TouchableOpacity style={styles.addButtonContainer} onPress={addSection}>
                                <FontAwesome6 name="plus" size={16} color="black" />
                            </TouchableOpacity>
                        }
                    </View>

                    {sections.map((section, index) => (
                        <View key={index} style={styles.sectionContainer}>
                            <View style={styles.rowContainer}>
                                <View style={styles.smallSection}>
                                    <Text style={styles.sectionTitle}>Valor mínimo</Text>
                                    <View style={styles.inputWrapper}>
                                        <Input
                                            placeholder={'50c'}
                                            keyboardType={'numeric'}
                                            onChange={(value: string) => {
                                                const newSections = [...sections];
                                                newSections[index].minValue = value;
                                                setSections(newSections);
                                            }}
                                            value={section.minValue}
                                        />
                                    </View>
                                </View>
                                <View style={styles.largeSection}>
                                    <Text style={styles.sectionTitle}>Desconto da etapa em %</Text>
                                    <View style={styles.inputWrapper}>
                                        <Input
                                            placeholder={'20'}
                                            keyboardType={'numeric'}
                                            onChange={(value: string) => {
                                                const newSections = [...sections];
                                                newSections[index].discount = value;
                                                setSections(newSections);
                                            }}
                                            value={section.discount}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Tipo de Cashback</Text>
                                <Select
                                    options={typesOptions}
                                    onChangeSelect={(item: any) => {
                                        const newSections = [...sections];
                                        newSections[index].type = item.name;
                                        setSections(newSections);
                                    }}
                                    text={'Selecione'}
                                    SelectOption={SelectOption}
                                    selectedOption={0}
                                />
                            </View>

                            {sections.length > 0 && (
                                <View style={styles.buttonsDiscount}>
                                    <TouchableOpacity
                                        style={styles.trashButtonContainer}
                                        onPress={() => removeSection(index)}
                                    >
                                        <Feather name="trash" size={16} color="black" />
                                    </TouchableOpacity>
                                    {index === sections.length - 1 && sections.length < 10 && (
                                        <TouchableOpacity
                                            style={styles.addButtonContainerBottom}
                                            onPress={addSection}
                                        >
                                            <FontAwesome6 name="plus" size={16} color="black" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.footer}>
                    <View style={styles.stepperLayoutContainer}>
                        <Text style={styles.stepperLayoutText}>6 de 6</Text>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayout}></View>
                        <View style={styles.stepperLayoutSelected}></View>
                    </View>

                    <View style={styles.nextButton}>
                        <TouchableOpacity
                            style={styles.nextButtonContent}
                            onPress={() => commerceNavigation.navigate("new_commerce_step_7")}
                            activeOpacity={0.6}
                        >
                            <Feather name="check" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    keyboardAvoidingView: {
        flex: 1,
        paddingTop: 30,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 30
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
    sectionContainer: {
        borderBottomWidth: 1,
        paddingTop: 20,
        paddingBottom: 40,
        borderColor: '#D1D5DB',
        gap: 20
    },
    section: {
        width: '100%',
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: 'normal',
        marginBottom: 15
    },
    inputLabel: {
        fontSize: 20,
        fontWeight: 'normal',
        marginBottom: 4
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        borderTopColor: '#E5E7EB',

    },
    buttonsDiscount: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        padding: 8,
        zIndex: 10
    },
    addButtonContainer: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        bottom: -17,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    addButtonContainerBottom: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 16,
        bottom: -19,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    trashButtonContainer: {
        position: 'absolute',
        width: 35,
        height: 35,
        justifyContent: 'center',
        alignItems: 'center',
        right: 64,
        bottom: -19,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 8,
        zIndex: 10
    },
    smallSection: {
        width: '43%',
        paddingTop: 16,
        paddingRight: 8,
    },
    largeSection: {
        width: '62%',
        paddingTop: 16,
        paddingLeft: 8,
        paddingRight: 16,
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
