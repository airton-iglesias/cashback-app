import { RootStackParamList } from "@/types/navigationTypes";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { View, StyleSheet } from "react-native";
import CommerceHeader from "../commerceComponents/commerceHeader";
import MapView, { PROVIDER_GOOGLE }  from "react-native-maps";

type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function MapLocation() {
    const rootNavigation = useNavigation<RootNavigationProp>();

    const INITIAL_REGION = {
        latitude: 38.7266085,
        longitude: -9.1503216,
        latitudeDelta: 2,
        longitudeDelta: 2,
    };

    return (
        <View>
            <CommerceHeader
                Title={"Voltar"}
                ScreenGoback={() => rootNavigation.goBack()}
                ScreenClose={() => rootNavigation.goBack()}
            />
            <View>
                <MapView
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    showsUserLocation={true}
                    initialRegion={INITIAL_REGION}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});