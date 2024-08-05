import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import StoreIcon from '../../assets/icons/storeIcon';
import CalendarIconRadio from '../../assets/icons/calendarIconRadio';
import PricingIcon from '@/assets/icons/pricingIcon';

interface RadioCommerceTypeProps {
    options: string[];
    onChangeSelect: (option: string, index: number) => void;
    selected: number;
}

export default function Radio_Commerce_Type({
    options = [],
    onChangeSelect,
    selected
}: RadioCommerceTypeProps) {

    return (
        <View style={styles.container}>

            {options.map((opt, index) => (
                <View key={index} style={styles.optionWrapper}>
                    {selected === index && <View style={styles.selectedBackground} />}
                    <TouchableOpacity
                        onPress={() => onChangeSelect(opt, index)}
                        style={[
                            styles.optContainer,
                            selected === index && styles.selectedOptContainer
                        ]}
                    >
                        {index === 0 ? <StoreIcon /> : null}
                        {index === 1 ? <CalendarIconRadio /> : null}
                        {index === 2 ? <PricingIcon /> : null}
                        <Text style={styles.optionText}>
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
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
    },
    //mudar a margin do optionWrapper pra 5
    optionWrapper: {
        flex: 1,
        position: 'relative',
        marginHorizontal: 4,
    },
    selectedBackground: {
        position: 'absolute',
        width: '100%',
        height: 200,
        borderWidth: 2,
        borderColor: '#E3E3E3',
        borderRadius: 11,
        opacity: 0.2,
        backgroundColor: 'white',
        zIndex: 10,
    },
    optContainer: {
        width: '100%',
        height: 200,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 25,
        padding: 8,
        backgroundColor: '#FAFAFA',
    },
    selectedOptContainer: {
        backgroundColor: '#F8F9FA',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
        borderWidth: 1,
        borderColor: '#6C757D'
    },
    optionText: {
        fontSize: 18,
        fontWeight: '600',
    },
    outlineCircle: {
        width: 20,
        height: 20,
        borderRadius: 999,
        borderWidth: 1,
        borderColor: '#ABB5BE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 4,
    },
    innerCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
});
