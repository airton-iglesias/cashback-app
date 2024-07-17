import {
    FlatList,
    Image,
    View,
    Dimensions,
    NativeScrollEvent,
    NativeSyntheticEvent,
    TouchableWithoutFeedback
} from "react-native";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface CarouselItem {
    id: string;
    image: any;
}

export default function Carousel() {
    const flatlistRef = useRef<FlatList<CarouselItem>>(null);
    const screenWidth = Dimensions.get("window").width;
    const [activeIndex, setActiveIndex] = useState(0);
    const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const carouselData: CarouselItem[] = [
        {
            id: "01",
            image: require("../../assets/images/faxada1.png"),
        },
        {
            id: "02",
            image: require("../../assets/images/faxada2.png"),
        },
        {
            id: "03",
            image: require("../../assets/images/faxada3.png"),
        },
    ];

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
            <TouchableWithoutFeedback onPressIn={() => setIsAutoScrollEnabled(false)} onPressOut={() => setIsAutoScrollEnabled(true)}>
                <View>
                    <Image
                        source={item.image}
                        style={{ height: 200, width: screenWidth }}
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
        }, 50); // delay of 50ms for debounce
    }, [activeIndex]);

    const renderDotIndicators = () => {
        return carouselData.map((dot, index) => (
            <View
                key={dot.id}
                className={`h-2.5 w-2.5 rounded-full mx-1.5 ${activeIndex === index ? "bg-black" : "bg-black opacity-20"}`}
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

            <View className="flex-row justify-center mt-4">
                {renderDotIndicators()}
            </View>
        </View>
    );
}
