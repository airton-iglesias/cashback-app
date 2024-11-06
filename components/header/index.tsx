import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, StyleSheet, Pressable } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StoreIcon from "@/assets/icons/storeIcon";
import { Link, router } from "expo-router";
import { fontSize } from "@/constants/fonts";
import { useAppState } from "@/contexts/AppStateContext";

export default function Topbar({ openSidebar, openNotifications }: any) {
    const { isSwitchedAccount, switchAccount } = useAppState();
    const [value, setValue] = useState('');

    return (
        <>
            <View style={[styles.topBar]}>
                <View style={styles.iconContainer}>
                    <View style={styles.statusIndicator}></View>
                    <Link href={isSwitchedAccount ? "/dashboard" : "/commerce"} replace asChild>
                        <TouchableOpacity
                            style={styles.switchAccountButton}
                            activeOpacity={0.7}
                            onPress={switchAccount}
                        >
                            {isSwitchedAccount ?
                                <Feather name="users" size={24} color="white" />
                                :
                                <StoreIcon height={26} width={26} color={"white"} />
                            }
                        </TouchableOpacity>
                    </Link>
                </View>

                <View style={styles.textInputContainer}>
                    <Pressable
                        onPress={() => {
                            if(isSwitchedAccount){
                                router.navigate("/(app)/points")
                            }
                        }}
                    >
                        <TextInput
                            cursorColor={'white'}
                            placeholder="0"
                            onChangeText={(number) => setValue(number)}
                            placeholderTextColor="#4b5563"
                            textAlign={isSwitchedAccount ? "center" : "right"}
                            value={value}
                            readOnly={isSwitchedAccount}
                            style={[
                                styles.textInput,
                                {
                                    paddingRight: isSwitchedAccount ? 0 : 60,
                                    color: isSwitchedAccount ? '#28A745' : 'white'
                                }
                            ]}
                            keyboardType={"numeric"}
                        />
                    </Pressable>
                    {!isSwitchedAccount && (
                        <TouchableOpacity
                            activeOpacity={0.7}
                            style={styles.plusWrapper}
                            onPress={() => router.navigate("/(app)/dashboard/(tabs)/wallet")}
                        >
                            <Feather name="plus" size={20} color="#6FC768" />
                        </TouchableOpacity>
                    )}
                </View>

                <TouchableOpacity
                    onPress={openNotifications}
                    style={styles.iconContainer}
                    activeOpacity={0.7}
                >
                    <Feather name="bell" size={24} color="white" />
                </TouchableOpacity>

                <View style={styles.iconContainer && { backgroundColor: 'none' }}>
                    <TouchableOpacity
                        onPress={openSidebar}
                        style={styles.switchAccountButton}
                        activeOpacity={0.7}
                    >
                        <MaterialCommunityIcons name="dots-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    topBar: {
        height: 80,
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        width: '100%',
        zIndex: 10,
        top: 0,
        gap: 10,
        backgroundColor: '#212121'
    },
    iconContainer: {
        backgroundColor: '#303030',
        borderRadius: 89,
        height: 50,
        width: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statusIndicator: {
        position: 'absolute',
        top: 0,
        right: 4,
        height: 12,
        width: 12,
        backgroundColor: '#3F31E1',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'white',
    },
    switchAccountButton: {
        width: '100%',
        height: '100%',
        borderRadius: 999,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textInputContainer: {
        position: 'relative',
        flex: 1,
        marginHorizontal: 16,
    },
    addButton: {
        position: 'absolute',
        right: 0,
        height: 50,
        paddingHorizontal: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
        zIndex: 10,
        backgroundColor: '#2A2C2D',
    },
    textInput: {
        width: '100%',
        height: 50,
        borderRadius: 16,
        backgroundColor: '#343434',
        fontWeight: '900',
        fontSize: fontSize.titles.mini,
    },
    plusWrapper: {
        position: 'absolute',
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: '#2A2C2D',
        borderBottomRightRadius: 16,
        borderTopRightRadius: 16,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
