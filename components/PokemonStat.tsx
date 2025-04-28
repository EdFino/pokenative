import { StyleSheet, View, ViewProps } from "react-native"
import { Row } from "./Row"
import { ThemedText } from "./ThemedText"
import { useThemeColors } from "@/hooks/UseThemeColors"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
import { useEffect } from "react"

type Props = ViewProps & {
    name: string,
    value: number,
    color: string,
}

function statShortName (name: string): string {
    return (
        name
        .replaceAll("special", 'S')
        .replaceAll("-", "")
        .replaceAll("attack", "ATK")
        .replaceAll ('defense', 'DEF')
        .replaceAll('speed', 'SPD')
        .toUpperCase()
    )
}

export function PokemonStat({ style, color, name, value, ...rest }: Props) {
    const colors = useThemeColors();
    const sharedValue = useSharedValue(0); // Initialisez à 0 pour l'animation

    const barInnerStyle = useAnimatedStyle(() => {
        return {
            width: `${(sharedValue.value / 255) * 100}%`, // Largeur en pourcentage
        };
    });

    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            width: `${((255 - sharedValue.value) / 255) * 100}%`, // Largeur restante
        };
    });

    useEffect(() => {
        sharedValue.value = withSpring(value, { damping: 10, stiffness: 100 });
    }, [value]);

    return (
        <Row gap={8} style={[style, styles.root]}>
            <View style={[styles.name, { borderColor: colors.grayLight }]}>
                <ThemedText variant="subtitle 3" style={{ color: color }}>
                    {statShortName(name)}
                </ThemedText>
            </View>
            <View style={styles.number}>
                <ThemedText>{value.toString().padStart(3, '0')}</ThemedText>
            </View>
            <Row style={styles.bar}>
                <Animated.View style={[styles.barInner, { backgroundColor: color }, barInnerStyle]} />
                <Animated.View style={[styles.barBackground, { backgroundColor: color }, barBackgroundStyle]} />
            </Row>
        </Row>
    );
}

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderStyle: 'solid',
        borderRightWidth: 1,
    },
    number: {
        width: 23,
    },
    bar: {
        flex: 1,
        borderRadius: 20,
        height: 8, // Augmentez la hauteur pour une meilleure visibilité
        overflow: 'hidden',
        flexDirection: 'row', // Assurez-vous que les barres sont alignées horizontalement
    },
    barInner: {
        height: '100%',
    },
    barBackground: {
        height: '100%',
        opacity: 0.24,
    },
});