import { SafeAreaView, TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Feather } from '@expo/vector-icons';
import { CommonActions, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/types/navigationTypes";
import Input from "../input";

type AuthNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

export default function ResetPassword() {
    const authNavigation = useNavigation<AuthNavigationProp>();
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.infoWrapper}>
                    <Text style={styles.infoText}>Crie uma nova senha</Text>
                    <Text style={styles.infolabel}>Com 8 caracteres ou mais, sendo alfanúmerico.</Text>
                    <View style={{width: '100%', paddingHorizontal: 15, marginTop: 20}}>
                        <Input
                            label={'Password'}
                        />
                    </View>
                    <View style={{width: '100%', paddingHorizontal: 15, marginTop: 20}}>
                        <Input
                            label={'Confirmar Password'}
                        />
                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        style={styles.buttonWrapper}
                        onPress={() => authNavigation.navigate('resetSucess')}
                    >
                        <View style={styles.submitButton}>
                            <Feather name="check" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingTop: 30,
        justifyContent: 'space-between',
        height: '100%'
    },
    infoText:{
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 25
    },
    infolabel:{
        fontSize: 18,
        fontWeight: '400',
        marginTop: 10,
        width: 300,
        textAlign: 'center'
    },
    backButton: {
        position: 'absolute',
        left: 15,
        width: 40,
        height: 40,
        paddingTop: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButton: {
        position: 'absolute',
        right: 15,
        width: 40,
        height: 40,
        paddingBottom: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginBottom: 10
    },
    headerText: {
        fontSize: 24,
        fontWeight: '700',
        left: 40
    },
    headerButtonLeft: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerButtonRight: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputWrapper: {
        paddingHorizontal: 15,
        marginTop: 15
    },
    infoWrapper:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40  
    },
    buttonContainer: {
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        gap: 20,
        paddingBottom: 8,
        justifyContent: 'flex-end',
        paddingHorizontal: 15,
        marginBottom: 15
    },
    buttonWrapper: {
        borderRadius: 8,
    },
    submitButton: {
        flexDirection: 'row',
        backgroundColor: '#000000',
        width: '100%',
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        borderRadius: 10,
    },
});