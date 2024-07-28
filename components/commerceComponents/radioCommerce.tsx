import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import StoreIcon from '../../assets/icons/storeIcon';
import CloudIcon from '../../assets/icons/cloudIcon';

interface RadioCommerceProps {
    options: string[];
    onChangeSelect: (option: string, index: number) => void;
    selected: number;
}

export default function RadioCommerce({
    options = [],
    onChangeSelect,
    selected
}: RadioCommerceProps) {

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
                        {index === 0 ? <StoreIcon /> : <CloudIcon />}
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
        gap: 30,
    },
    optionWrapper: {
        position: 'relative',
    },
    selectedBackground: {
        position: 'absolute',
        width: 150,
        height: 150,
        borderWidth: 2,
        borderColor: '#E3E3E3',
        borderRadius: 11,
        opacity: 0.2,
        backgroundColor: 'white',
        zIndex: 10,
    },
    optContainer: {
        width: 150,
        height: 150,
        borderWidth: 1,
        borderRadius: 11,
        borderColor: '#E3E3E3',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
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
        borderRadius: 999,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
});
