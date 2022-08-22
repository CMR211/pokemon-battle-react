import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import usePokemonColors from "../../utilities/usePokemonColors"

import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"
import IconLoader from "../../icons/IconLoader"

import { COLORS } from "../../utilities/COLORS"
import padZero from "../../utilities/padZero"
import capitalize from "../../utilities/capitalize"
import IconNo from "../../icons/IconNo"

export default function Pokedex() {
    const [pokemons, setPokemons] = useState([])
    const [pokemonColors, setPokemonColors] = useState(null)
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [input, setInput] = useState("")

    // Fetch function for InfiniteScroll
    const fetchPokemonList = async (url) => {
        const { data } = await axios.get(url)
        const pokemonList = data.results.map((pokemon) => {
            // https://pokeapi.co/api/v2/pokemon/6/
            const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")
            return {
                id: id,
                name: pokemon.name.slice(0, 15),
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
        <div className="pokedex">
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
                    {filteredPokemons.map((pokemon) => {
                        const bgColor = pokemonColors.find((color) => color.id === pokemon.id).color
                        return (
                            <div
                                onClick={() => goToPokemon(pokemon.id)}
                                key={pokemon.id}
                                className="pokedex__pokemon"
                                style={{ "--bg-color": `rgba(${COLORS[bgColor].replace("rgb(", "").slice(0, -1)},1)` }}>
                                <div className="pokedex__pokemon__img-c">
                                    <img className="pokedex__pokemon__img-i" alt={pokemon.name} src={pokemon.img} />
                                </div>
                                <p className="pokedex__pokemon__name" style={bgColor === "white" ? { color: "inherit" } : {}}>
                                    {capitalize(pokemon.name)}
                                </p>
                                <p className="pokedex__pokemon__id" style={bgColor === "white" ? { color: "inherit" } : {}}>
                                    {padZero(pokemon.id)}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
