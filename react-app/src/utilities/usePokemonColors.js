import { useEffect } from "react"
import axios from "axios"

async function fetchData(setPokemonColors) {
    const arr = new Array(10).fill(1).map((item, index) => index + 1)
    const requests = arr.map((i) => axios.get(`https://pokeapi.co/api/v2/pokemon-color/${i}`))
    const responses = await Promise.all(requests)
    const data = responses.map((res) => {
        return res.data
    })
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
}

export default function usePokemonColors(setPokemonColors) {
    useEffect(() => {
        fetchData(setPokemonColors)
    }, [])
}
