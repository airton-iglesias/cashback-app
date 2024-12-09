import PaintBrushIcon from "@/assets/icons/paintBrushIcon";
import { TouchableOpacity, StyleSheet, View } from "react-native";

import { Feather, FontAwesome6 } from '@expo/vector-icons';
import UnderlineIcon from "@/assets/icons/underlineIcon";
import { actions, RichToolbar } from "@/components/react-native-pell-rich-editor";

export default function TextEditorToolBar({ handleInsertLink, richText, textColorSelected, isColorPickerVisible, setIsColorPickerVisible }: any) {
    return (
        <View>
            <RichToolbar
                editor={richText}
                style={styles.formattingBar}
                selectedIconTint="blue"
                iconTint="black"
                unselectedButtonStyle={styles.unselectedButton}
                flatContainerStyle={styles.flatStyle}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    'setForeColor',
                    actions.insertBulletsList,
                    actions.insertLink,
                ]}
                iconMap={{
                    [actions.setBold]: () => <Feather style={styles.icon} name="bold" size={30} color={'black'} />,
                    [actions.setItalic]: () => <Feather style={styles.icon} name="italic" size={30} color={'black'} />,
                    [actions.setUnderline]: () => <UnderlineIcon style={styles.icon} size={30} color={'black'} />,
                    ['setForeColor']: () => (
                        <TouchableOpacity
                            style={styles.pencilButton}
                            onPress={() => setIsColorPickerVisible(!isColorPickerVisible)}
                        >
                            <PaintBrushIcon style={styles.icon} size={30} color={textColorSelected} />
                        </TouchableOpacity>
                    ),
                    [actions.insertBulletsList]: () => <FontAwesome6 style={styles.icon} name={"list"} size={30} color="black" />,
                    [actions.insertLink]: () => <Feather name="link" style={styles.icon} size={30} color="black" onPress={handleInsertLink} />,
                }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    formattingBar: {
        flexDirection: 'row',
        backgroundColor: '#F1F1F1',
        height: 54,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20,
        position: 'relative',
    },
    flatStyle: {
        margin: 'auto',
        gap: 20,
    },
    icon: {
        textAlign: 'center',
    },
    unselectedButton: {
        opacity: 0.6,
    },
    pencilButton: {
        height: 30,
        width: 30,
        borderRadius: 999
    },
})