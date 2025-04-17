import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function pokemon () {

    const params = useLocalSearchParams ()

    return (

    <View>
        <Text>Pokemon {params.id}</Text>
    </View>

    )

}