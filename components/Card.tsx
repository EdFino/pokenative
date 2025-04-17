import { Shadow } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/UseThemeColors";
import { ViewProps, ViewStyle } from "react-native";
import { View } from "react-native";

type Props = ViewProps;

export function Card ({style, ...rest}: Props) {
    const colors= useThemeColors();

    return (
        <View style={[style, styles, {backgroundColor: colors.grayWhite} ]} {...rest} />    )

}

const styles = {
    borderRadius: 8,
    ...Shadow.dp2
} satisfies ViewStyle;