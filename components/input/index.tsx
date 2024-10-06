import { fontSize } from '@/constants/fonts';
import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, placeholder, type, onChange, 
    keyboardType, maxLength, customPaddingLeft, customColor, customBackground, value, customLabelColor }: any) {
    
    const [inputValue, setInputValue] = useState(value ? value:'');

    const [isInputFocus, setIsInputFocus] = useState(false);
    const [isInputError, setIsInputError] = useState(false);
    const [secureEntry, setSecureEntry] = useState(type === 'password');

    const handleInputChange = (text: string) => {
        validateInput(text);
        onChange(text);
    };

    const validateInput = (text: string) => {
        let error = false;
        let formattedText = text;

        if (type === 'email') {
            error = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
        } else if (type === 'password') {
            error = text.length < 8;
        } else if (type === 'date') {
            formattedText = text.replace(/\D/g, '');
            if (formattedText.length > 2) {
                formattedText = formattedText.slice(0, 2) + '/' + formattedText.slice(2);
            }
            if (formattedText.length > 5) {
                formattedText = formattedText.slice(0, 5) + '/' + formattedText.slice(5);
            }
            setInputValue(formattedText);
            error = !/^\d{2}\/\d{2}\/\d{4}$/.test(formattedText);
            if (!error) {
                const [day, month, year] = formattedText.split('/').map(Number);
                error = isNaN(day) || isNaN(month) || isNaN(year) || day > 31 || month > 12;
            }
        } else if (type === 'time') {
            formattedText = text.replace(/\D/g, '');
            if (formattedText.length > 2) {
                formattedText = formattedText.slice(0, 2) + ':' + formattedText.slice(2);
            }
            if (formattedText.length > 5) {
                formattedText = formattedText.slice(0, 5) + ':' + formattedText.slice(5);
            }
            setInputValue(formattedText);
            error = !/^\d{2}:\d{2}:\d{2}$/.test(formattedText);
            if (!error) {
                const [hours, minutes, seconds] = formattedText.split(':').map(Number);
                error = isNaN(hours) || isNaN(minutes) || isNaN(seconds) || hours > 23 || minutes > 59 || seconds > 59;
            }
        } else if (type === 'url') {
            error = !/https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/.test(text);
        }

        setInputValue(formattedText);
        setIsInputError(error);
    };

    return (
        <View style={styles.inputSection}>
            {label ? <Text style={[styles.inputLabel, customLabelColor ? {color: customLabelColor}: null]}>{label}</Text> : null}
            <View style={styles.inputWrapper}>
                {isInputFocus ?
                    <View
                        style={[
                            styles.inputHighlight,
                            isInputFocus && styles.inputHighlightVisible,
                            isInputError && styles.inputErrorHighlight
                        ]}
                    ></View>
                    : null
                }
                <TextInput
                    cursorColor={'#212529'}
                    onFocus={() => setIsInputFocus(true)}
                    onBlur={() => setIsInputFocus(false)}
                    onChangeText={handleInputChange}
                    value={inputValue}
                    placeholder={placeholder}
                    secureTextEntry={secureEntry}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                    maxLength={maxLength ? maxLength : 500}
                    style={[
                        styles.textInput,
                        isInputFocus && (isInputError ? styles.inputError : styles.inputFocused),
                        customPaddingLeft ? {paddingLeft: customPaddingLeft}: null,
                        customColor ? {color: customColor}:{color: '#212529'},
                        customBackground ? {backgroundColor: customBackground}:null
                    ]}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    inputSection: {
        width: '100%',
    },
    inputLabel: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
        marginBottom: 4
    },
    inputWrapper: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputHighlight: {
        position: 'absolute',
        borderWidth: 4,
        width: '101.5%',
        height: 53,
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
        opacity: 0.20,
        borderColor: '#DC3545',
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 6,
        width: '100%',
        height: 48,
        fontSize: fontSize.labels.mini,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10
    },
});
