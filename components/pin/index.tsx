import React, { useEffect, useState } from "react";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableHighlight, View, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList, RootStackParamList } from "../../types/navigationTypes";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;
type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function Pin() {
    const rootNavigation = useNavigation<RootNavigationProp>();
    const authNavigation = useNavigation<AuthNavigationProp>();
    const { t } = useLocale();

    const [ConfirmPin, setConfirmPin] = useState<string>('');
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pressedButton, setPressedButton] = useState<number | null>(null);
    const [validateError, setValidateError] = useState(false)

    const handleDelete = () => {
        setConfirmPin((prev) => prev.slice(0, -1));
    };

    useEffect(() => {
        if (ConfirmPin.length === 6) {
            rootNavigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Root' }],
                })
            );
        }
    }, [ConfirmPin, rootNavigation]);

    const handlePressIn = (value: number) => {
        setPressedButton(value);
    };

    const handlePressOut = () => {
        setPressedButton(null);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.content, validateError ? {marginTop: 80,}: {marginTop: 172,}]}>
                {validateError ? <Text style={styles.title}>{'Pin validate error'}</Text>: null}
                <View style={styles.pinContainer}>
                    <View style={styles.pinRow}>
                        {Array(6).fill(0).map((_, index) => (
                            <Text key={index} style={styles.pinText}>
                                {ConfirmPin[index] ? <Text style={styles.pinDotMarked}>•</Text> : <Text style={styles.pinDot}>•</Text>}
                            </Text>
                        ))}
                    </View>
                </View>
                <View style={styles.buttonGrid}>
                    {buttons.map((value) => (
                        <TouchableHighlight
                            key={value}
                            onPress={() => setConfirmPin((prev) => prev.length < 6 ? prev + value.toString() : prev)}
                            underlayColor="#000000"
                            onPressIn={() => handlePressIn(value)}
                            onPressOut={handlePressOut}
                            style={[styles.button, pressedButton === value && styles.buttonPressed]}
                        >
                            <View style={styles.buttonContent}>
                                <Text style={[styles.buttonText, pressedButton === value && styles.buttonTextPressed]}>{value}</Text>
                            </View>
                        </TouchableHighlight>
                    ))}
                    <View style={styles.buttonPlaceholder}></View>
                    <TouchableHighlight
                        onPress={() => setConfirmPin((prev) => prev.length < 6 ? prev + '0' : prev)}
                        underlayColor="#000000"
                        onPressIn={() => handlePressIn(0)}
                        onPressOut={handlePressOut}
                        style={[styles.button, pressedButton === 0 && styles.buttonPressed]}
                    >
                        <View style={styles.buttonContent}>
                            <Text style={[styles.buttonText, pressedButton === 0 && styles.buttonTextPressed]}>0</Text>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={handleDelete}
                        underlayColor="#000000"
                        onPressIn={() => handlePressIn(-1)}
                        onPressOut={handlePressOut}
                        style={[styles.button, pressedButton === -1 && styles.buttonPressed]}
                    >
                        <View style={styles.buttonContent}>
                            <MaterialCommunityIcons name="backspace-outline" size={32} color={pressedButton === -1 ? '#ffffff' : '#000000'} />
                        </View>
                    </TouchableHighlight>
                </View>

                <TouchableOpacity
                    onPress={() => authNavigation.navigate('recoveryDatas')}
                >
                    <Text style={styles.recoveryPinText}>Recuperar Pin</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        gap: 50
    },
    title: {
        fontSize: 24,
        fontWeight: '400',
        color: '#B02A37'
    },
    pinContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pinText: {
        fontSize: 50,
        fontWeight: '900',
        marginHorizontal: 12,
    },
    pinDot: {
        color: '#848484',
    },
    pinDotMarked:{
        color: '#000',
    },
    buttonGrid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#d1d5db',
        marginHorizontal: 16,
        marginVertical: 16,
        width: 80,
        height: 80,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#000000',
    },
    buttonContent: {
        margin: 4,
        borderRadius: 999,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 32,
        fontWeight: '900',
        color: '#000000',
    },
    buttonTextPressed: {
        color: '#ffffff',
    },
    buttonPlaceholder: {
        marginHorizontal: 16,
        marginVertical: 16,
        width: 70,
        height: 70,
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    recoveryPinText:{
        fontSize: 22,
        color: '#0D6EFD',
    }
});