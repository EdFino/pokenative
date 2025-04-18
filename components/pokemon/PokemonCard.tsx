import { Image, type ViewStyle, StyleSheet, View } from "react-native"
import { ThemedText } from "../ThemedText"
import { Card } from "../Card"
import { useThemeColors } from "@/hooks/UseThemeColors"

type Props = {
    style?: ViewStyle,
    id: number,
    name: string
}

export function PokemonCard ({style, id, name}: Props) {
    const colors = useThemeColors()

    return (
        <Card style={[style, styles.card]}>
            <View style={[styles.shadow, {backgroundColor: colors.grayBackground}]}/>
            <ThemedText style={styles.id} variant="caption" color="grayMedium">
                #{id.toString().padStart(3, '0')}
            </ThemedText>
            <Image
                source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}}
                height={72}
                width={72}
            />
            <ThemedText>{name}</ThemedText>
        </Card>
    )
}

const styles = StyleSheet.create ({
    card: {
        position: 'relative',
        alignItems: "center",
        padding: 4
    },
    id: {
        alignSelf: "flex-end"
    },
    shadow: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 44,
        borderRadius: 7
    }
})