import { fontSize } from "@/constants/fonts";
import { useLocale } from "@/contexts/TranslationContext";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';

export default function ExtractItem({ date, transactionId, amount, deleted, positive, delItem }: any) {
    const { t } = useLocale();
    return (

        <View style={styles.item}>
            {deleted ?
                null
                :
                <TouchableOpacity style={styles.trashIcon} activeOpacity={0.7} onPress={delItem}>
                    <Feather name="trash" size={16} color="#B02A37" />
                </TouchableOpacity>
            }
            <View style={{ justifyContent: 'space-around', height: '100%'}}>
                <Text style={[styles.date, deleted && styles.deletedText]}>{date}</Text>
                <Text style={[styles.transactionId, deleted && styles.deletedText]}>{t("commerce.credit_extract.id")}: {transactionId}</Text>
                {deleted && (<Text style={[styles.whoDeleted, deleted && styles.deletedText]}>{deleted ? t("commerce.credit_extract.eliminatedBy")+' '+transactionId : null} </Text>)}
            </View>
            <View>
                <Text style={[styles.amount, deleted && styles.deletedText, positive && styles.positive]}>{amount}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        position: 'relative',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#DBDBDB',
        marginVertical: 12,
        marginHorizontal: 15,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100
    },
    deletedText: {
        opacity: 0.4,
    },
    whoDeleted: {
        fontSize: fontSize.labels.medium,
    },
    trashIcon: {
        position: 'absolute',
        backgroundColor: '#F8D7DA',
        padding: 10,
        borderRadius: 999,
        top: -20,
        right: -10
    },
    date: {
        fontSize: fontSize.labels.extralarge,
        color: '#495057',
        fontWeight: '400'
    },
    transactionId: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: fontSize.titles.medium,
        fontWeight: 'bold',
        color: 'red',
    },
    positive: {
        color: 'green',
    },
});
