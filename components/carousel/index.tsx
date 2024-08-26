import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
    FlatList,
    Image,
    View,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableWithoutFeedback,
    StyleSheet
} from 'react-native';

interface CarouselItem {
    id: string;
    image: string;
}

export default function Carousel({ carouselData }: { carouselData: CarouselItem[] }) {
    const flatlistRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get('window').width;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isAutoScrollEnabled) {
            interval = setInterval(() => {
                const nextIndex = (activeIndex + 1) % carouselData.length;
                flatlistRef.current?.scrollToIndex({ index: nextIndex, animated: true });
                setActiveIndex(nextIndex);
            }, 2000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [activeIndex, isAutoScrollEnabled, carouselData.length]);

    const getItemLayout = (_data: any, index: number) => ({
        length: screenWidth,
        offset: screenWidth * index,
        index,
    });

    const renderItem = ({ item }: { item: CarouselItem }) => {
        return (
            <TouchableWithoutFeedback
                onPressIn={() => setIsAutoScrollEnabled(false)}
                onPressOut={() => setIsAutoScrollEnabled(true)}
            >
                <View>
                    <Image
                        source={{ uri: item.image}}
                        style={styles.image}
                    />
                </View>
            </TouchableWithoutFeedback>
        );
    };

    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / screenWidth);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        scrollTimeoutRef.current = setTimeout(() => {
            if (index !== activeIndex) {
                setActiveIndex(index);
            }
        }, 50);
    }, [activeIndex]);

    const renderDotIndicators = () => {
        return carouselData.map((dot: CarouselItem, index: number) => (
            <View
                key={dot.id}
                style={[
                    styles.dot,
                    { backgroundColor: activeIndex === index ? 'black' : 'black', opacity: activeIndex === index ? 1 : 0.2 }
                ]}
            />
        ));
    };

    return (
        <View>
            <FlatList
                data={carouselData}
                ref={flatlistRef}
                getItemLayout={getItemLayout}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
            />

            <View style={styles.dotContainer}>
                {renderDotIndicators()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        height: 200,
        width: Dimensions.get('window').width,
    },
    dotContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 16,
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 6,
    },
});
