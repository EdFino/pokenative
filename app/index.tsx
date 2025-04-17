import { useThemeColors } from "@/hooks/UseThemeColors";
import { ThemedText } from "../components/ThemedText";
import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card } from "@/components/Card";

export default function Index() {
    const colors= useThemeColors ();
    return (
        <SafeAreaView
            style={[styles.container, {backgroundColor: colors.tint}]}
        >
            <Card>
                <ThemedText variant="headline" color="grayDark">Pokédex</ThemedText>
            </Card>

        </SafeAreaView>
);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})