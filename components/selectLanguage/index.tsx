import React, { useState, useEffect } from 'react';
import { View, TouchableWithoutFeedback, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import { Feather } from '@expo/vector-icons';
import { fontSize } from '@/constants/fonts';
import { useLocale } from '@/contexts/TranslationContext';
import SelectOptionLanguage from '../selectOptionLanguage';

const SelectLanguage = ({ SelectOption }: any) => {
    const [selected, setSelected] = useState<any>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const { currentLanguage, changeLanguage } = useLocale();

    const languages = [
        { code: 'pt', name: 'Português' },
    ];

    const getLanguageName = (code: string) => {
        const language = languages.find(lang => lang.code === code);
        return language ? language.name : code;
    };

    useEffect(() => {
        const languageName = getLanguageName(currentLanguage);
        setText(languageName);
        setSelected(languages.find(lang => lang.code === currentLanguage));
    }, [currentLanguage]);

    const [text, setText] = useState(getLanguageName(currentLanguage));

    const handleSelect = (item: any) => {
        setSelected(item);
        setText(item.name);
        changeLanguage(item.code);
        setModalVisible(false);
    };

    const renderOption = ({ item }: any) => {
        return (
            <SelectOptionLanguage
                item={item}
                isSelected={selected?.code === item.code}
                onSelect={() => handleSelect(item)}
            />
        );
    };

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
                <View style={styles.buttonWrapper}>
                    <View style={styles.buttonOption}>
                        {selected && selected.flag ? <CountryFlag isoCode={selected.flag} size={20} /> : null}
                        <Text style={{ fontSize: fontSize.labels.medium }}>{text}</Text>
                    </View>
                    <Entypo name="chevron-thin-down" size={20} color="#9ca3af" />
                </View>
            </TouchableWithoutFeedback>

            <Modal
                animationType="slide"
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalWrapper}>
                    <TouchableOpacity style={styles.backButton} onPress={() => setModalVisible(false)}>
                        <Feather name="arrow-left" size={30} style={{ color: 'black' }} />
                        <Text style={{ fontSize: fontSize.titles.mini, fontWeight: 'bold' }}>
                            {text}
                        </Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={languages}
                    keyExtractor={item => String(item.code)}
                    renderItem={renderOption}
                />
            </Modal>
        </View>
    );
}

export default SelectLanguage;

const styles = StyleSheet.create({
    buttonWrapper: {
        borderWidth: 1,
        borderRadius: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 48,
        borderColor: '#ADB5BD',
        paddingHorizontal: 10,
        color: '#6B7280',
        flexDirection: 'row',
    },
    buttonOption: {
        flexDirection: 'row',
        gap: 10
    },
    modalWrapper: {
        position: 'relative',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'flex-start',
        height: 48,
        marginTop: 20
    },
    backButton: {
        left: 15,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'center',
    }
});
