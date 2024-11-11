import React, { useState } from 'react';
import { Text, TouchableHighlight, View, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { router  } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Pin() {
    const [pin, setPin] = useState<string>('');

    // State variables for UI states
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pressedButton, setPressedButton] = useState<number | null>(null);

    // Translation function
    const { t } = useLocale();

    // Navigate to the next step passing the pin as a parameter
    const onSubmit = () => {
        if (pin.length === 6) {
            router.push({
                pathname: '/resetPin/confirmPin',
                params: {
                    pin: pin
                },
            });
        }
    }

    //Renders a numeric button for the number pad
    const renderButton = (value: number) => (
        <TouchableHighlight
            key={value}
            onPress={() =>
                setPin((prev) => (prev.length < 6 ? prev + value.toString() : prev))
            }
            underlayColor="#000000"
            onPressIn={() => setPressedButton(value)}
            onPressOut={() => setPressedButton(null)}
            style={[styles.button, pressedButton === value && styles.buttonPressed]}
        >
            <View style={styles.buttonContent}>
                <Text
                    style={[
                        styles.buttonText,
                        pressedButton === value && styles.buttonTextPressed,
                    ]}
                >
                    {value}
                </Text>
            </View>
        </TouchableHighlight>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                {/* Title */}
                <Text style={styles.title}>{t('signup.newPIN.title')}</Text>
                {/* End of Component */}

                {/* PIN Display */}
                <View style={styles.pinContainer}>
                    <View style={styles.pinRow}>
                        {Array.from({ length: 6 }, (_, index) => (
                            <Text key={index} style={styles.pinText}>
                                {pin[index] ? (
                                    <Text style={styles.pinDotMarked}>{pin[index]}</Text>
                                ) : (
                                    <Text style={styles.pinDot}>•</Text>
                                )}
                            </Text>
                        ))}
                    </View>
                </View>
                {/* End of PIN Display */}

                {/* Number Pad */}
                <View style={styles.buttonGrid}>
                    {/* 1-9 Buttons */}
                    {buttons.map(renderButton)}
                    {/* End of 1-9 Buttons */}

                    {/* Placeholder for alignment */}
                    <View style={styles.buttonPlaceholder} />
                    {/* End of Placeholder */}

                    {/* 0 Button */}
                    {renderButton(0)}
                    {/* End of 0 Button */}


                    {/* Delete Button */}
                    <TouchableHighlight
                        onPress={() => setPin((prev) => prev.slice(0, -1))}
                        underlayColor="#000000"
                        onPressIn={() => setPressedButton(-1)}
                        onPressOut={() => setPressedButton(null)}
                        style={[
                            styles.button,
                            pressedButton === -1 && styles.buttonPressed,
                        ]}
                    >
                        <View style={styles.buttonContent}>
                            <MaterialCommunityIcons
                                name="backspace-outline"
                                size={32}
                                color={pressedButton === -1 ? '#ffffff' : '#000000'}
                            />
                        </View>
                    </TouchableHighlight>
                    {/* End of delete button */}
                </View>

                {/* Buttons wrapper */}
                <View style={styles.buttonContainer}>
                    {/* Submit button */}
                    <TouchableOpacity
                        activeOpacity={0.7}
                        style={styles.buttonWrapper}
                        onPress={onSubmit}
                    >
                        <View style={styles.submitButton}>
                            <Feather name="arrow-right" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    {/* End of submit button */}
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
    content: {
        flex: 1,
        alignItems: 'center',
        marginTop: 67,
        gap: 20,
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
        backgroundColor: '#D6D6D6',
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
        width: 80,
        height: 80,
    },
    buttonContainer: {
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 15,
        flex: 1,
        paddingBottom: 18,
        justifyContent: 'flex-end',
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
});