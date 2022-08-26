import { useEffect } from "react"
import axios from "axios"
import capitalize from "./capitalize"

async function fetchData(setBerries) {
    const FIRST_BERRY_ITEM_INDEX = 126
    const LAST_BERRY_ITEM_INDEX = 189

    const berries = new Array(64).fill({})
    const berriesItemIds = new Array(LAST_BERRY_ITEM_INDEX - FIRST_BERRY_ITEM_INDEX + 1)
        .fill(0)
        .map((item, index) => index + FIRST_BERRY_ITEM_INDEX)
    const berriesIds = new Array(64).fill(0).map((item, index) => index + 1)

    // console.log("berriesIds", berriesIds)
    // console.log("berriesItemIds", berriesItemIds)
    const res1 = await Promise.all(
        berriesIds.map(async (id, index) => {
            const { data } = await axios.get("https://pokeapi.co/api/v2/berry/" + id)
            berries[index] = {
                ...berries[index],
                flavors: [
                    { name: "spicy", potency: data.flavors[0].potency },
                    { name: "dry", potency: data.flavors[1].potency },
                    { name: "sweet", potency: data.flavors[2].potency },
                    { name: "bitter", potency: data.flavors[3].potency },
                    { name: "sour", potency: data.flavors[4].potency },
                ],
                firmness: data.firmness.name,
            }
        })
    )
    const res2 = await Promise.all(
        berriesItemIds.map(async (id, index) => {
            const { data } = await axios.get("https://pokeapi.co/api/v2/item/" + id)
            berries[index] = {
                ...berries[index],
                name: capitalize(data.name).replace("-berry", " Berry"),
                flavor_text: data.effect_entries[0].effect.replaceAll("\n:", ":"),
                sprite: data.sprites.default,
            }
        })
    )
    setBerries(berries)
}

export default function useBerries(setBerries) {
    useEffect(() => {
        fetchData(setBerries)
    }, [])
}
