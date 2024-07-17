import React from 'react';
import { View } from 'react-native';
import CommerceStackNavigation from '../navigation/CommerceStackNavigation';

export default function CommerceScreen() {

    return (
        <View style={{ flex: 1 }}>
            <CommerceStackNavigation/>
        </View>
    );
}
