import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { Octicons, AntDesign, } from '@expo/vector-icons';
import { fontSize } from "@/constants/fonts";

export default function CommerceHeader({ Title, SubTitle, ScreenGoback, ScreenClose }: any) {
    return (
        <View style={[styles.headerContainer, ScreenGoback ? {paddingHorizontal: 20}:null]}>
            {ScreenGoback ?
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.backButton}
                    onPress={ScreenGoback}
                >
                    <Octicons name="chevron-left" size={32} color="black" />
                </TouchableOpacity>
                : null
            }
            <View style={styles.headerTextContainer}>
                <Text style={[styles.headerTitle, ScreenGoback ? {marginLeft: 24}:null]} >{Title}</Text>
                {SubTitle ? <Text style={styles.headerSubtitle}>{SubTitle}</Text> : null}
            </View>
            {ScreenClose ?
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={styles.closeButton}
                    onPress={ScreenClose}
                >
                    <AntDesign name="close" size={28} color="black" />
                </TouchableOpacity>
                : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 80,
        borderBottomWidth: 1,
        borderColor: '#DADADA',
        marginTop: 30

    },
    backButton: {
        position: 'absolute',
        left: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTextContainer: {
        flex: 1,
        justifyContent: 'center',
        left: 20
    },
    headerTitle: {
        fontSize: fontSize.titles.mini,
        fontWeight: '700',
    },
    headerSubtitle: {
        fontSize: fontSize.titles.extramini,
        marginLeft: 24,
        color: '#635C5C',
        fontWeight: '400',
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})