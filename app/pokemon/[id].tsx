import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { UseFetchQuery } from "@/hooks/UseFetchQuery";
import { useThemeColors } from "@/hooks/UseThemeColors";
import { useLocalSearchParams, router } from "expo-router";
import { Text, StyleSheet, Image, Pressable, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { formatSize, formatWeight, getPokemonArtwork } from "../functions/pokemon";
import { Card } from "@/components/Card";
import { PokemonType } from "@/components/PokemonType";
import { PokemonSpecs } from "@/components/PokemonSpecs";
import { PokemonStat } from "@/components/PokemonStat";
import { basePokemonStats } from "../functions/pokemon";
import { Audio } from "expo-av";

export default function pokemon () {

    const params = useLocalSearchParams () as {id: string}
    const colors = useThemeColors()
    const { data: pokemon } = UseFetchQuery("/pokemon/[id]", {id: params.id})
    const { data: species } = UseFetchQuery("/pokemon-species/[id]", {id: params.id})
    const mainType = pokemon?.types?.[0].type.name
    const colorType = mainType ? Colors.type[mainType] : colors.grayLight
    const types = pokemon?.types ?? []
    const bio = species?.flavor_text_entries?.find(({language}) => language.name === 'en')?.flavor_text.replaceAll(/\r?\n/g, " ");
    const onImagePress = async () => {
        const cry = pokemon?.cries.latest
        if (!cry) {
            return;
        } else {
            const {sound} = await Audio.Sound.createAsync({
                uri: cry
            }, {shouldPlay: true})
            sound.playAsync()
        }
    }
    const stats = pokemon?.stats ?? basePokemonStats

    return (

    <RootView backgroundColor={colorType}>
        <View>
            <Image
                source={require("@/assets/images/pokeball-translucid.png")}
                style={[styles.pokeball, {width:208, height:208}]}  />
            <Row style={styles.header}>
                <Pressable onPress={router.back}>
                    <Row gap={8}>
                        <Image source={require("@/assets/images/back.png")} style={{width:32, height:32}}/>
                        <ThemedText color="grayWhite" variant="headline" style={{ textTransform: 'capitalize'}}>{pokemon?.name}</ThemedText>
                    </Row>
                </Pressable>
                <ThemedText color="grayWhite" variant="subtitle 2">
                    #{params.id.padStart(3, '0')}
                </ThemedText>
            </Row>
            <View style={styles.body}>
                <Row style={styles.imageRow}>
                    <Pressable>
                        <Image
                            source={require("@/assets/images/white_left_chevron.png")}
                            width={24}
                            height={24}
                        />
                    </Pressable>
                    <Pressable onPress={onImagePress}>
                        <Image style={styles.artwork}
                            source={{uri: getPokemonArtwork(params.id)}}
                            height={200}
                            width={200}
                        />
                    </Pressable>
                </Row>
            </View>
            <Card style={styles.card}>
                <Row gap={16} style= {{height: 20}}>
                    {types.map(type => <PokemonType key={type.type.name} name={type.type.name}/>)}
                </Row>
                <ThemedText variant="subtitle 1" style={{color: colorType}}>
                    About
                </ThemedText>
                <Row>
                    <PokemonSpecs 
                        style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}}
                        title={formatWeight(pokemon?.weight)}
                        description="Weight"
                        image={require("@/assets/images/weight.png")}>
                    </PokemonSpecs>
                    <PokemonSpecs 
                        style={{borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight}}
                        title={formatSize(pokemon?.height)}
                        description="Size"
                        image={require("@/assets/images/straighten.png")}>
                    </PokemonSpecs>
                    <PokemonSpecs 
                        title={pokemon?.moves
                            .slice(0, 2)
                            .map ((m) => m.move.name)
                            .join("\n")}
                        description="Moves"
                    />
                </Row>
                <ThemedText>{bio}</ThemedText>
                <ThemedText variant="subtitle 1" style={{color: colorType}}>
                    Base stats
                </ThemedText>
                <View style={{alignSelf: 'stretch'}}>
                    {pokemon?.stats.map(stat => <PokemonStat key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={colorType}/>
)}
                </View>
            </Card>
        </View>
    </RootView>

    )

}

const styles = StyleSheet.create ({

    header: {
        margin: 20,
        justifyContent: 'space-between'
    },
    pokeball: {
        position: 'absolute',
        right: 8,
        top: 8
    },
    artwork: {
        alignSelf: "center",
        zIndex: 2
    },
    body: {
        marginTop: 144
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
        alignItems: 'center',
        paddingBottom: 20
    },
    imageRow: {
        position: 'absolute',
        top: -140,
        zIndex: 2
    }

})