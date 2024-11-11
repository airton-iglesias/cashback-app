import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import { fontSize } from '@/constants/fonts';

interface InputProps {
    label?: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'date' | 'time' | 'url' | 'numeric';
    onChange: (text: string) => void;
    onBlur?: () => void;
    value?: string;
    error?: string;
    keyboardType?: any;
    maxLength?: number;
    customPaddingLeft?: number;
    customColor?: string;
    customBackground?: string;
    customLabelColor?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    placeholder,
    type,
    onChange,
    onBlur,
    value,
    error,
    keyboardType,
    maxLength,
    customPaddingLeft,
    customColor,
    customBackground,
    customLabelColor,
    ...rest
}) => {
    const [isInputFocus, setIsInputFocus] = React.useState(false);
    const [secureEntry, setSecureEntry] = React.useState(type === 'password');

    const handleInputChange = (text: string) => {
        if (type === 'numeric') {
            const numericText = text.replace(/[^0-9]/g, '');
            onChange(numericText);
        } else {
            onChange(text);
        }
    };

    return (
        <View style={styles.inputSection}>
            {label ? (
                <Text style={[styles.inputLabel, customLabelColor ? { color: customLabelColor } : null]}>
                    {label}
                </Text>
            ) : null}
            <View style={styles.inputWrapper}>
                {isInputFocus ? (
                    <View
                        style={[
                            styles.inputHighlight,
                            isInputFocus && styles.inputHighlightVisible,
                            !!error && styles.inputErrorHighlight,
                        ]}
                    ></View>
                ) : null}
                <TextInput
                    cursorColor={'#212529'}
                    onFocus={() => setIsInputFocus(true)}
                    onBlur={() => {
                        setIsInputFocus(false);
                        onBlur ? onBlur() : null;
                    }}
                    onChangeText={handleInputChange}
                    value={value}
                    {...rest}
                    placeholder={placeholder}
                    secureTextEntry={secureEntry}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    maxLength={maxLength ? maxLength : 500}
                    style={[
                        styles.textInput,
                        isInputFocus && (error ? styles.inputError : styles.inputFocused),
                        customPaddingLeft ? { paddingLeft: customPaddingLeft } : null,
                        customColor ? { color: customColor } : { color: '#212529' },
                        customBackground ? { backgroundColor: customBackground } : null,
                    ]}
                />
                {type === 'password' && (
                    <TouchableOpacity
                        style={styles.iconWrapper}
                        onPress={() => setSecureEntry(!secureEntry)}
                    >
                        <Feather
                            name={secureEntry ? 'eye' : 'eye-off'}
                            size={24}
                            color="#6C757D"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    inputSection: {
        width: '100%',
    },
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4,
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
    },
    iconWrapper: {
        position: 'absolute',
        right: 10,
        height: '100%',
        justifyContent: 'center',
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 5,
        width: '102.5%',
        left: -4.5,
        height: 55,
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
        opacity: 0.2,
        borderColor: '#DC3545',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: fontSize.labels.mini,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
    },
    errorText: {
        color: '#DC3545',
        fontSize: fontSize.labels.medium,
        marginTop: 5,
    },
});

export default Input;
