import { fontSize } from '@/constants/fonts';
import { useLocale } from '@/contexts/TranslationContext';
import { Feather, Entypo } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function searchTopbar({handleFilterChange, activeFilter, setSearchInput, searchInput, showResults}: any) {
    const { t } = useLocale();
    
    return (
        <View style={styles.header}>
            <View style={styles.headerWrapper}>

                <TouchableOpacity
                    style={styles.headerBackIcon}
                    activeOpacity={0.7}
                    onPress={() => showResults()}
                >
                    <Entypo name="chevron-left" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.inputWrapper}>
                    <TextInput
                        cursorColor={'#ADB5BD'}
                        onChangeText={(text) => setSearchInput(text)}
                        value={searchInput}
                        placeholder={t("dashboardSearchResults.topbar.search")}
                        placeholderTextColor={'gray'}
                        style={styles.input}
                    />
                    <View style={styles.searchIcon}>
                        <Feather name="search" size={28} color="#828282" />
                    </View>
                </View>
            </View>

            <View style={styles.cashbackTypeWrapper}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.cashbackTypeButton,
                        activeFilter === 'Comercios' && styles.cashbackTypeButtonAtive
                    ]}
                    onPress={() => handleFilterChange('Comercios')}
                >
                    <Text style={activeFilter === 'Comercios' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>{t("dashboardSearchResults.topbar.commerce")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[styles.cashbackTypeButton, styles.cashbackTypeButtonMiddle, activeFilter === 'Eventos' && styles.cashbackTypeButtonAtive,]}
                    onPress={() => handleFilterChange('Eventos')}
                >
                    <Text style={activeFilter === 'Eventos' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>{t("dashboardSearchResults.topbar.events")}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                        styles.cashbackTypeButton,
                        activeFilter === 'Promoções' && styles.cashbackTypeButtonAtive
                    ]}
                    onPress={() => handleFilterChange('Promoções')}
                >
                    <Text style={activeFilter === 'Promoções' ? styles.cashbackTypeTextActive : styles.cashbackTypeText}>{t("dashboardSearchResults.topbar.promotions")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 145,
        width: '100%',
        backgroundColor: '#212121',
        paddingHorizontal: 15,
        gap: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerWrapper: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        gap: 20
    },
    headerBackIcon: {
        height: 48,
        width: 48,
        borderRadius: 999,
        backgroundColor: '#303030',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cashbackTypeWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    cashbackTypeButton: {
        width: 125,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cashbackTypeButtonAtive: {
        width: 110,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    cashbackTypeButtonMiddle: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: 'white'
    },
    cashbackTypeText: {
        color: '#fff'
    },
    cashbackTypeTextActive: {
        color: 'black'
    },
    searchIcon: {
        position: 'absolute',
        left: 15,
    },
    inputWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        width: '100%',
        height: 48,
        fontSize: fontSize.labels.medium,
        color: '#FFF',
        borderColor: '#434343',
        paddingLeft: 50,
        backgroundColor: '#2D2D2D'
    },
});