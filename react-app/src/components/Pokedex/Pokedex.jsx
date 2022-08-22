import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { AnimatePresence, motion } from "framer-motion"

import usePokemonColors from "../../utilities/usePokemonColors"
import PokedexCard from "./PokedexCard"

import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"
import IconLoader from "../../icons/IconLoader"
import IconNo from "../../icons/IconNo"

export default function Pokedex({ favoritedPokemons, setFavoritedPokemons }) {
    const [pokemons, setPokemons] = useState([])
    const [pokemonColors, setPokemonColors] = useState(null)
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [input, setInput] = useState("")

    const fetchPokemonList = async (url) => {
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

    useEffect(() => async () => fetchPokemonList("https://pokeapi.co/api/v2/pokemon?limit=649"), [])

    // Fetching pokemon colors for the backgrounds
    usePokemonColors(setPokemonColors)

    useEffect(() => {
        setFilteredPokemons(pokemons)
    }, [pokemons])

    const filterPokemons = (e) => {
        const searchphrase = e.target.value.toLowerCase()
        setInput(searchphrase)
        const filteredPokemons = pokemons.filter(
            (pokemon) => pokemon.id.includes(searchphrase) || pokemon.name.includes(searchphrase)
        )
        setFilteredPokemons(filteredPokemons)
    }

    const clearInput = () => {
        setInput("")
        setFilteredPokemons(pokemons)
    }

    const navigate = useNavigate()
    const goToPokemon = (inputId) => {
        navigate(`/pokemon/${inputId}`)
    }

    if (pokemonColors === null) return <IconLoader />
    return (
        <AnimatePresence>
            <motion.div
                className="pokedex"
                key="pokedex"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}>
                <div className="pokedex__nav">
                    <button className="pokedex__nav__button--return pokedex__nav__button">
                        <IconReturn />
                    </button>
                    <button className="pokedex__nav__button--home pokedex__nav__button" onClick={() => {}}>
                        <IconHome />
                    </button>
                </div>
                <div className="pokedex__hero">
                    <h1>Pokedex</h1>
                    <div className="pokedex__her__search">
                        <p>Search by name or ID</p>
                        <input name="nameOrId" type="text" onInput={filterPokemons} value={input} />
                        <button onClick={clearInput}>
                            <IconNo />
                        </button>
                    </div>
                </div>
                <div className="bar"></div>
                <div className="pokedex__list">
                    <div>
                        {filteredPokemons.map((pokemon) => (
                            <PokedexCard
                                pokemon={pokemon}
                                pokemonColors={pokemonColors}
                                goToPokemon={goToPokemon}
                                favoritedPokemons={favoritedPokemons}
                                setFavoritedPokemons={setFavoritedPokemons}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
