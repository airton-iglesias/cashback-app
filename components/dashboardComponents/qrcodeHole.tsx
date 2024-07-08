import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Defs, Rect, Mask } from "react-native-svg";

const QRCodeHole = () => {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    const holeWidth = 290;
    const holeHeight = 290;
    const holeX = (screenWidth - holeWidth) / 2;
    const holeY = (screenHeight - holeHeight) / 2;

    return (
        <View style={styles.container}>
            <Svg height="100%" width="100%">
                <Defs>
                    <Mask id="mask" x="0" y="0" height="100%" width="100%">
                        <Rect height="100%" width="100%" fill="#fff" />
                        <Rect x={holeX} y={holeY} width={holeWidth} height={holeHeight} fill={"black"} rx={30} ry={30} />
                        <Rect x={holeX} y={holeY} width={holeWidth} height={holeHeight} stroke={"black"} strokeWidth={5} fill={"none"} rx={30} ry={30} />
                    </Mask>
                </Defs>
                <Rect height="100%" width="100%" fill="rgba(0, 0, 0, 0.8)" mask="url(#mask)" />
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 10, // Ajuste o zIndex conforme necessário para garantir que fique acima da câmera
    },
});

export default QRCodeHole;
