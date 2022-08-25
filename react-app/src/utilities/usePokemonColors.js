import { useEffect } from "react"
import axios from "axios"

export default function usePokemonColors(setPokemonColors) {
    console.log("Fetching pokemon colors...")
    useEffect(
        () => async () => {
            const arr = new Array(10).fill(1).map((item, index) => index + 1)
            const requests = arr.map((i) => axios.get(`https://pokeapi.co/api/v2/pokemon-color/${i}`))
            const responses = await Promise.all(requests)
            const data = responses.map((res) => {
                return res.data
            })
            console.log(data)
            const pc = []
            data.forEach((color) => {
                color.pokemon_species.forEach((pokemon) => {
                    pc.push({
                        name: pokemon.name,
                        id: pokemon.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ""),
                        color: color.name,
                    })
                })
            })
            pc.sort((a, b) => a.id - b.id)
            setPokemonColors(pc)
        },
        []
    )
}
