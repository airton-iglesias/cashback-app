import { Skeleton } from "moti/skeleton";
import { View, StyleSheet } from "react-native";

export default function ExtractSkeleton() {
    return (
        <View>
            <View style={styles.item}>
                <View style={{ justifyContent: 'space-around', height: '100%' }}>
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={150}
                    />
                </View>
                <View>
                    <Skeleton
                        colorMode="light"
                        height={40}
                        width={80}
                    />
                </View>
            </View>
            <View style={styles.item}>
                <View style={{ justifyContent: 'space-around', height: '100%' }}>
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={150}
                    />
                </View>
                <View>
                    <Skeleton
                        colorMode="light"
                        height={40}
                        width={80}
                    />
                </View>
            </View>
            <View style={styles.item}>
                <View style={{ justifyContent: 'space-around', height: '100%' }}>
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={120}
                    />
                    <Skeleton
                        colorMode="light"
                        height={18}
                        width={150}
                    />
                </View>
                <View>
                    <Skeleton
                        colorMode="light"
                        height={40}
                        width={80}
                    />
                </View>
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
    }
});
