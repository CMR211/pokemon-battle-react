import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import usePokemonColors from "../../utilities/usePokemonColors"
import usePokemonList from "../../utilities/usePokemonList"
import PokedexCard from "./PokedexCard"

import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"
import IconLoader from "../../icons/IconLoader"
import IconNo from "../../icons/IconNo"

import { goToLocation } from "../../utilities/goToLocation"
import { returnToLocation } from "../../utilities/returnToLocation"

export default function Pokedex({ favoritedPokemons, setFavoritedPokemons, history, setHistory }) {
    console.log("%c Rendering <Pokedex>", "color: blue; font-weight: bold")

    const [pokemons, setPokemons] = useState(null)
    const [pokemonColors, setPokemonColors] = useState(null)
    const [filteredPokemons, setFilteredPokemons] = useState([])
    const [input, setInput] = useState("")
    const checkboxRef = useRef(null)

    // Fetching pokemon list
    usePokemonList(setPokemons)

    // Fetching pokemon colors for the backgrounds
    usePokemonColors(setPokemonColors)

    useEffect(() => {
        setFilteredPokemons(pokemons)
    }, [pokemons])

    const filterPokemons = (e) => {
        const searchphrase = e.target.value.toLowerCase()
        setInput(searchphrase)
        checkboxRef.current.checked = false
        const filteredPokemons = pokemons.filter(
            (pokemon) => pokemon.id.includes(searchphrase) || pokemon.name.includes(searchphrase)
        )
        setFilteredPokemons(filteredPokemons)
    }

    const clearInput = () => {
        setInput("")
        checkboxRef.current.checked = false
        setFilteredPokemons(pokemons)
    }

    const navigate = useNavigate()
    const goToPokemon = (inputId) => {
        goToLocation("/pokemon/" + inputId, "/pokedex", setHistory, navigate)
    }
    const goToHome = () => {
        goToLocation("/", "/pokedex", setHistory, navigate)
    }

    const toggleCheckbox = () => {
        if (checkboxRef.current.checked === true) {
            checkboxRef.current.checked = false
            setFilteredPokemons(pokemons)
            return
        }
        if (checkboxRef.current.checked === false) {
            checkboxRef.current.checked = true
            const likedPokemons = pokemons.filter((pokemon) => favoritedPokemons.includes(pokemon.id))
            setFilteredPokemons(likedPokemons)
            return
        }
    }

    if (pokemonColors === null || pokemons === null) return <IconLoader />
    return (
        <AnimatePresence>
            <motion.div
                className="pokedex"
                key="pokedex"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}>
                <div className="pokedex__nav">
                    <button
                        className="pokedex__nav__button--return pokedex__nav__button"
                        onClick={() => returnToLocation(navigate, history, setHistory)}>
                        <IconReturn />
                    </button>
                    <button className="pokedex__nav__button--home pokedex__nav__button" onClick={goToHome}>
                        <IconHome />
                    </button>
                </div>
                <div className="pokedex__hero">
                    <h1>Pokedex</h1>
                    <div className="pokedex__hero__search">
                        <div>
                            <p>Search by name or ID</p>
                            <input name="nameOrId" type="text" onInput={filterPokemons} value={input} />
                            <button onClick={clearInput}>
                                <IconNo />
                            </button>
                        </div>
                        <div className="fav-checkbox">
                            <label htmlFor="fav">Liked only</label>
                            <input type="checkbox" title="fav" ref={checkboxRef} />
                            <div className="toggle" onClick={toggleCheckbox}></div>
                        </div>
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
