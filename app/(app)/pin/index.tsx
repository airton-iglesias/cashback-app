import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableHighlight, View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { router } from 'expo-router';
import { fontSize } from "@/constants/fonts";

export default function Signup_Step_3() {
    const [pin, setPin] = useState<string>('');

    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pressedButton, setPressedButton] = useState<number | null>(null);
    const [validateError, setValidateError] = useState(false);
    const { t } = useLocale();

    useEffect(() => {
        if (pin.length === 6) {
            /* make the request to the API here
            Example: 
            
            const pinReponse = await
                fetch('domain of application here', {
                    method: 'POST',
                    body: JSON.stringify({
                        pin: pin,
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Something went wrong');
                    setValidateError(true);
                })
                .catch((error) => {
                    console.log(error);
                    setValidateError(true);
                });
            */
            router.replace("/dashboard");
            return;
        };
    }, [pin, router]);

    const handlePressIn = (value: number) => {
        setPressedButton(value);
    };

    const handlePressOut = () => {
        setPressedButton(null);
    };

    const handleDelete = () => {
        setPin((prev) => prev.slice(0, -1));
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.content, validateError ? { gap: 30 } : { gap: 60 }]}>
                {validateError ? <Text style={styles.errorLabel}>{t('signup.signup_step_3.pin_error')}</Text> : null}

                <View style={styles.pinContainer}>
                    <View style={styles.pinRow}>
                        {Array(6).fill(0).map((_, index) => (
                            <Text key={index} style={styles.pinText}>
                                {pin[index] ? <Text style={styles.pinDotMarked}>•</Text> : <Text style={styles.pinDot}>•</Text>}
                            </Text>
                        ))}
                    </View>
                </View>

                <View style={styles.buttonGrid}>
                    {buttons.map((value) => (
                        <TouchableHighlight
                            key={value}
                            onPress={() => setPin((prev) => prev.length < 6 ? prev + value.toString() : prev)}
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
                        onPress={() => setPin((prev) => prev.length < 6 ? prev + '0' : prev)}
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

                    {
                        validateError && (
                            <TouchableOpacity
                                activeOpacity={0.7}
                                onPress={() => router.navigate("/recover_datas")}
                            >
                                <Text style={styles.recoverLabel}>Recuperar Pin</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 80
    },
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 67,
    },
    title: {
        fontSize: fontSize.titles.large,
        fontWeight: 'bold',
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
        fontSize: fontSize.titles.superlarge,
        fontWeight: '900',
        marginHorizontal: 12,
    },
    pinDot: {
        color: '#d1d5db',
    },
    pinDotMarked: {
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
        fontSize: fontSize.titles.large,
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
    errorLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: '400',
        color: '#B02A37'
    },
    recoverLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: '400',
        color: '#0D6EFD',
        marginTop: 40
    }
});