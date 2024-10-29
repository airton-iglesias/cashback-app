import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

export default function SortMenu({sortCriteria, handleSortChange}: any) {
    const { t } = useLocale();
    
    return (
        <View style={styles.sortMenuContainer}>
            <View style={styles.sortMenuWrapper}>
                <Text style={styles.sortMenuLabel}>{t("dashboardSearchResults.filter.showBy")}</Text>
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={sortCriteria === 'discount' ? styles.sortMenuSelected : styles.sortMenuButton}
                    onPress={() => handleSortChange('discount')}
                >
                    <Text style={sortCriteria === 'discount' ? styles.sortMenuTextSelected : styles.sortMenuText}>{t("dashboardSearchResults.filter.bigDiscount")}</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.7}
                    style={sortCriteria === 'distance' ? styles.sortMenuSelected : styles.sortMenuButton}
                    onPress={() => handleSortChange('distance')}
                >
                    <Text style={sortCriteria === 'distance' ? styles.sortMenuTextSelected : styles.sortMenuText}>{t("dashboardSearchResults.filter.nearByPlaces")}</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.7}
                    style={sortCriteria === 'today' ? styles.sortMenuSelected : styles.sortMenuButton}
                    onPress={() => handleSortChange('today')}
                >
                    <Text style={sortCriteria === 'today' ? styles.sortMenuTextSelected : styles.sortMenuText}>{t("dashboardSearchResults.filter.happeningToday")}</Text>
                </TouchableOpacity>


                <TouchableOpacity
                    activeOpacity={0.7}
                    style={sortCriteria === 'date' ? styles.sortMenuSelected : styles.sortMenuButton}
                    onPress={() => handleSortChange('date')}
                >
                    <Text style={sortCriteria === 'date' ? styles.sortMenuTextSelected : styles.sortMenuText}>{t("dashboardSearchResults.filter.byDate")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    sortMenuContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        height: '100%',
        width: '100%',
        position: 'absolute',
        zIndex: 10,
        marginTop: 245,
        alignItems: 'flex-end',
    },
    sortMenuWrapper: {
        backgroundColor: 'white',
        width: 200,
        height: 195,
        borderRadius: 15,
        right: 20,
        borderWidth: 1,
        borderColor: '#B8B8B8',
        paddingVertical: 15,
    },
    sortMenuLabel: {
        color: '#ABB5BE',
        fontWeight: '500',
        fontSize: fontSize.labels.mini,
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuButton: {
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuSelected: {
        backgroundColor: '#000',
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    sortMenuText: {
        fontSize: fontSize.labels.large
    },
    sortMenuTextSelected: {
        fontSize: fontSize.labels.large,
        color: '#fff'
    }
});