import axios from "axios"
import { useEffect } from "react"

async function fetchPokemonList(url, setPokemons) {
    const { data } = await axios.get(url)
    const pokemonList = data.results.map((pokemon) => {
        // Get pokemon id by slicing the target url
        const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")
        // Return an object for each pokemon
        return {
            id: id,
            name: pokemon.name.slice(0, 15), // Few pokemons have too long name to display correctly
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
        }
    })
    setPokemons(pokemonList)
}

export default function usePokemonList(setPokemons) {
    useEffect(() => {
        fetchPokemonList("https://pokeapi.co/api/v2/pokemon?limit=649", setPokemons)
    }, [])
}
