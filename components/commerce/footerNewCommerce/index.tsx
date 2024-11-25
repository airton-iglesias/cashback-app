import { TouchableOpacity, View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { useLocale } from "@/contexts/TranslationContext";
import { fontSize } from "@/constants/fonts";

export default function FooterNewCommerce({backStep, nextStep, currentStep, disabled}: any) {
    const { t } = useLocale();

    return (
        <View style={styles.footer}>

            <View style={styles.nextButton}>
                <TouchableOpacity style={styles.backButtonContent}
                    onPress={backStep}
                    activeOpacity={0.7}
                    disabled={disabled ? disabled : false}
                >
                    <Feather name="arrow-left" size={24} color="white" />
                </TouchableOpacity>
            </View>

            <View style={styles.stepperLayoutContainer}>
                <Text style={styles.stepperLayoutText}>{currentStep} {t("commerce.new_commerce.currentStepper")} 6</Text>
                <View style={currentStep === 1 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
                <View style={currentStep === 2 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
                <View style={currentStep === 3 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
                <View style={currentStep === 4 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
                <View style={currentStep === 5 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
                <View style={currentStep === 6 ? styles.stepperLayoutSelected : styles.stepperLayout}></View>
            </View>

            <View style={styles.nextButton}> 
                <TouchableOpacity style={styles.nextButtonContent}
                    onPress={nextStep}
                    activeOpacity={0.7}
                    disabled={disabled ? disabled : false}
                >
                    { disabled ? <ActivityIndicator size={24} color="#fff" /> : <Feather name="arrow-right" size={24} color="white" />}
                </TouchableOpacity>
            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 100,
        justifyContent: 'space-between'
    },
    stepperLayoutContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },
    stepperLayout: {
        height: 6,
        width: 14,
        backgroundColor: '#121212',
        borderRadius: 22,
        opacity: 0.5,
        marginTop: 2
    },
    stepperLayoutSelected: {
        opacity: 1,
        width: 31,
        backgroundColor: '#121212',
        borderRadius: 22,
        height: 6,
        marginTop: 2
    },
    stepperLayoutText: {
        fontSize: fontSize.labels.medium,
        fontWeight: 'normal',
    },
    backButtonContent:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 50,
        height: 50,
        borderRadius: 999,

    },
    nextButton: {
        borderRadius: 8,
        height: '100%',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    nextButtonContent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        width: 65,
        height: 65,
        borderRadius: 999,
    },
});