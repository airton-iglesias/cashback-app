import { Modal, Text, ScrollView, View, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { StorageService } from "../../services/storageService";

export default function LanguageModal({ modalVisible, handleCloseModal }: any) {
    const languages = [
        { code: 'pt', name: 'Português' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'Français' },
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
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Text style={styles.logoText}>LOGO</Text>
                    </View>
                </View>
                <Text style={styles.title}>{t("language.header")}</Text>
                <View style={styles.languageContainer}>
                    <ScrollView>
                        <View style={styles.languageOptionsWrapper}>
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
                                    {currentLanguage === language.code ? <Feather name="check" size={24} color="white" /> : null}
                                </TouchableOpacity>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>

            <View style={styles.buttonWrapper}>
                <TouchableOpacity style={styles.button} onPress={handleCloseModal}>
                    <Feather name="arrow-right" size={24} color={'black'} />
                </TouchableOpacity>
            </View>
        </Modal>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 50
    },
    logoContainer: {
        width: '100%',
        height: 150,
        padding: 5,
        marginTop: 15,
        paddingHorizontal: 15,
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
        marginVertical: 30,
        fontSize: 35,
        fontWeight: 'bold',
        paddingHorizontal: 15,
    },
    languageOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#6C757D'
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
        color: '#fff',
        fontSize: 18,
        flex: 1,
    },
    button: {
        backgroundColor: 'white',
        height: 52,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15,
        marginVertical: 20,
    },
    buttonText: {
        fontSize: 18,
    },
    languageOptionsWrapper: {
        gap: 12,
        paddingHorizontal: 15,
        paddingVertical: 30,
        width: '100%',
        alignItems: 'center',
    },
    languageContainer: {
        backgroundColor: 'black',
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        height: '100%',
        flex: 1
    },
    buttonWrapper: {
        backgroundColor: 'black',

    }
});