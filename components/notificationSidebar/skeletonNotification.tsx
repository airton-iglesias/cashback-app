import { Skeleton } from "moti/skeleton";
import { View } from "react-native";

export default function SkeletonNotification() {
    return (
        <View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <Skeleton
                    show
                    width={100}
                    height={100}
                    colorMode="dark"
                />
                <View style={{ gap: 10 }}>
                    <Skeleton
                        show
                        width={180}
                        height={25}
                        colorMode="dark"
                    />
                    <Skeleton
                        show
                        width={130}
                        height={25}
                        colorMode="dark"
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <Skeleton
                    show
                    width={100}
                    height={100}
                    colorMode="dark"
                />
                <View style={{ gap: 10 }}>
                    <Skeleton
                        show
                        width={180}
                        height={25}
                        colorMode="dark"
                    />
                    <Skeleton
                        show
                        width={130}
                        height={25}
                        colorMode="dark"
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                <Skeleton
                    show
                    width={100}
                    height={100}
                    colorMode="dark"
                />
                <View style={{ gap: 10 }}>
                    <Skeleton
                        show
                        width={180}
                        height={25}
                        colorMode="dark"
                    />
                    <Skeleton
                        show
                        width={130}
                        height={25}
                        colorMode="dark"
                    />
                </View>
            </View>
        </View>
    );
}