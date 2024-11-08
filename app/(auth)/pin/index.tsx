import React, { useState } from 'react';
import {
    Text,
    TouchableHighlight,
    View,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useLocale } from '@/contexts/TranslationContext';
import { router } from 'expo-router';
import { fontSize } from '@/constants/fonts';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignupStep3() {
    const [pin, setPin] = useState<string>('');

    // State variables for UI states
    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [pressedButton, setPressedButton] = useState<number | null>(null);
    const [pinError, setPinError] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    // Translation function
    const { t } = useLocale();

    // Submit pin function
    const onSubmit = () => {
        setLoading(true);

        if (pin.length === 6) {
            // Make the request to the API here
            router.replace("/dashboard");
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
            <View style={[styles.content, pinError ? { gap: 10, marginTop: 60 } : { gap: 20, marginTop: 80 }]}>
                {/* End of Component */}

                {/* Error Message */}
                {pinError && (
                    <View style={styles.errorMessageContainer}>
                        <View style={styles.errorMessageWrapper}>
                            <Text style={styles.errorMessage}>{t('pin.pinError')}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={styles.errorMessage}>{t('pin.pinError2')}</Text>
                                <TouchableOpacity
                                    onPress={() => router.navigate('/resetPin')}
                                >
                                    <Text style={[styles.errorMessage, { textDecorationLine: 'underline' }]}>
                                        {t('pin.pressHere')}
                                    </Text>
                                </TouchableOpacity>
                                <Text style={styles.errorMessage}>{t('pin.pinError3')}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* PIN Display */}
                <View style={styles.pinContainer}>
                    <View style={styles.pinRow}>
                        {Array.from({ length: 6 }, (_, index) => (
                            <Text key={index} style={styles.pinText}>
                                {pin[index] ? (
                                    <Text style={styles.pinDotMarked}>•</Text>
                                ) : (
                                    <Text style={styles.pinDot}>•</Text>
                                )}
                            </Text>
                        ))}
                    </View>
                </View>
                {/* End of Component */}

                {/* Number Pad */}
                <View style={styles.buttonGrid}>
                    {buttons.map(renderButton)}

                    {/* Placeholder for alignment */}
                    <View style={styles.buttonPlaceholder} />

                    {renderButton(0)}

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
                    {/* End of Component */}
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
                            {loading ? (
                                <ActivityIndicator size={24} color="#fff" />
                            ) : (
                                <Feather name="arrow-right" size={24} color="white" />
                            )}
                        </View>
                    </TouchableOpacity>
                    {/* End of component */}
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
    errorMessageContainer: {
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 10,
        marginTop: 20
    },
    errorMessageWrapper: {
        borderRadius: 10,
        backgroundColor: '#F8D7DA',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorMessage: {
        textAlign: 'center',
        color: '#B02A37',
    }
});
