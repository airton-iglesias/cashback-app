import { Modal, Text, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";

export default function LanguageModal({modalVisible, handleCloseModal}: any) {
    const languages = [
        { code: 'pt', name: 'Português', flag: 'PT' },
        { code: 'en', name: 'English', flag: 'GB' },
        { code: 'fr', name: 'Français', flag: 'FR' },
    ];


    const { t } = useLocale();
    const { currentLanguage, changeLanguage } = useLocale();
    
    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
            onRequestClose={handleCloseModal}
        >
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.logoContainer}>
                        <View style={styles.logo}>
                            <Text style={styles.logoText}>LOGO</Text>
                        </View>
                    </View>
                    <Text style={styles.title}>{t("language.header")}</Text>

                    <View style={{ gap: 12 }}>
                        {languages.map((language, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.languageOption,
                                    currentLanguage === language.code && styles.languageOptionSelected
                                ]}
                                onPress={() => changeLanguage(language.code)}
                            >

                                <Text style={currentLanguage === language.code ? styles.selectedlanguageText : styles.languageText}>{language.name}</Text>
                                <Feather name="check" size={24} color="white" />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
                    <Feather name="arrow-right" size={24} color={'white'} />
                </TouchableOpacity>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 50
    },
    logoContainer: {
        width: '100%',
        height: 150,
        padding: 5,
        marginTop: 15
    },
    logo: {
        width: '100%',
        height: '100%',
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
    },
    logoText: {
        fontSize: 60,
        fontWeight: 'bold',
    },
    title: {
        color: '#000',
        marginVertical: 40,
        fontSize: 35,
        fontWeight: 'bold',
    },
    scrollView: {
        marginBottom: 20,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E3E3E3'
    },
    languageOptionSelected: {
        backgroundColor: '#0F0F0F',
        borderWidth: 1,
        borderColor: '#525252',

    },
    selectedlanguageText: {
        color: '#fff',
        fontSize: 18,
        flex: 1,
    },
    languageText: {
        color: '#000',
        fontSize: 18,
        flex: 1,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
    },
});