import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import StoreIcon from "../../assets/icons/storeIcon";
import CloudIcon from "../../assets/icons/cloudIcon";

export default function RadioCommerce({
    options = [],
    onChangeSelect,
    selected
}: any) {

    return (
        <View className="flex-row gap-8">
            {options.map((opt: any, index: any) => (
                <View key={index}>
                    <View style={{width: 123,height: 123}} className={`${selected === index ? '' : 'hidden'} absolute border-2 rounded-xl border border-gray-400 opacity-20' rounded-lg z-10`}></View>
                    <TouchableOpacity
                        onPress={() => onChangeSelect(opt, index)}
                        style={[
                            styles.optContainer,
                            selected === index && styles.selectedOptContainer
                        ]}
                    >
                        {index === 0 ? <StoreIcon /> : <CloudIcon />}
                        <Text className="text-xl font-semibold">
                            {opt}
                        </Text>
                        <View style={[styles.outlineCircle, { backgroundColor: selected === index ? 'black' : 'white' }]}>
                            {selected === index && <View style={styles.innerCircle} />}
                        </View>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    optContainer: {
        width: 123,
        height: 123,
        borderWidth: 1,
        borderRadius: 11,
        borderColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: '#FAFAFA'
    },
    selectedOptContainer: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    outlineCircle: {
        width: 16,
        height: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#ABB5BE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    innerCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 9999,
        backgroundColor: 'white',
    },
});
