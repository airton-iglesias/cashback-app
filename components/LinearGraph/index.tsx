import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GraphPoint, LineGraph } from 'react-native-graph';
import { AntDesign } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { fontSize } from '@/constants/fonts';

const getDayLabel = (date: Date) => {
    const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return daysOfWeek[date.getDay()];
};

const LinearGraph = () => {
    const points: GraphPoint[] = [
        { date: new Date(2024, 9, 1), value: 2700 },
        { date: new Date(2024, 9, 2), value: 2800 },
        { date: new Date(2024, 9, 3), value: 2900 },
        { date: new Date(2024, 9, 4), value: 3000 },
        { date: new Date(2024, 9, 5), value: 3050 },
        { date: new Date(2024, 9, 6), value: 370 },
        { date: new Date(2024, 9, 7), value: 2701 },
    ];

    const currentPoint = points[points.length - 1];
    const [selectedPoint, setSelectedPoint] = useState<GraphPoint>(currentPoint);
    const percentageChange = ((selectedPoint.value - points[0].value) /  points[0].value) * 100;
    const [gestureStarted, setGestureStarted] = useState(false);

    const onPointSelected = (point: GraphPoint) => {
        if (gestureStarted) {
            setSelectedPoint(point);
        }
    };

    const onGestureStart = () => {
        setGestureStarted(true);
    };

    const onGestureEnd = () => {
        setSelectedPoint(currentPoint);
        setGestureStarted(false);
    };

    const isLastPoint = selectedPoint?.date.getTime() === currentPoint.date.getTime();

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.currentValueContainer}>
                <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center' }}>
                    <Text style={styles.currentValueText}>
                        ${selectedPoint?.value.toFixed(2).replace(".", ",")}
                    </Text>
                    <View style={styles.percentageChangeText}>
                        {percentageChange >= 0 ? <AntDesign name="arrowup" size={12} color="#28A745" />
                            : <AntDesign name="arrowdown" size={12} color="#DC3545" />}
                        <Text
                            style={[
                                percentageChange >= 0 ? { color: '#28A745', } : { color: '#DC3545' },
                                styles.valorizationPercentLabel
                            ]}
                        >
                            {percentageChange.toFixed(2)}%
                        </Text>
                    </View>
                </View>

                <View style={styles.percentageChangeText}>
                    <Text>
                        {isLastPoint ? 'Hoje' : getDayLabel(selectedPoint?.date)}
                    </Text>
                </View>
            </View>

            <View style={styles.graphicPlaceholder}>
                <LineGraph
                    style={{ width: '100%', height: '100%' }}
                    points={points}
                    animated={true}
                    color="#017560"
                    gradientFillColors={['#0175605D', '#7476df00']}
                    enablePanGesture
                    onPointSelected={(p) => onPointSelected(p)}
                    onGestureStart={() => onGestureStart()}
                    onGestureEnd={() => onGestureEnd()}
                    enableIndicator
                    indicatorPulsating
                    enableFadeInMask
                />
            </View>

            <View style={styles.dayLabelsContainer}>
                {points.map((point, index) => (
                    <Text key={index} style={styles.dayLabel}>
                        {getDayLabel(point.date)}
                    </Text>
                ))}
            </View>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        height: '100%',
        width: '100%',
    },
    currentValueContainer: {
        marginBottom: 0,
    },
    currentValueText: {
        fontSize: fontSize.labels.extralarge,
        fontWeight: 'bold',
    },
    percentageChangeText: {
        color: '#4484B2',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        left: -2
    },
    selectedPointContainer: {
        marginBottom: 10,
    },
    selectedPointText: {
        fontSize: fontSize.labels.mini,
        color: '#666',
    },
    graphicPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dayLabelsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dayLabel: {
        color: '#666',
        fontSize: fontSize.labels.mini,
    },
    valorizationPercentLabel: {
        fontSize: fontSize.labels.medium,
    }
});

export default LinearGraph;
