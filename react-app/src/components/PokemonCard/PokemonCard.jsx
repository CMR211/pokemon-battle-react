import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

// Fetching scripts
import usePokemonEndpoint from "../../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../../utilities/usePokemonSpeciesEndpoint"

// Colors database for background and stats
import { COLORS } from "../../utilities/COLORS"

// Utility functions
import capitalize from "../../utilities/capitalize"
import padZero from "../../utilities/padZero"

// Content Cards
import ContentCardAbout from "./ContentCardAbout"
import ContentCardBaseStats from "./ContentCardBaseStats"
import ContentCardEvolution from "./ContentCardEvolution"
import ContentCardGames from "./ContentCardGames"

// SVG icons
import IconLiked from "../../icons/IconLiked"
import IconNotLiked from "../../icons/IconNotLiked"
import IconReturn from "../../icons/IconReturn"
import IconLoader from "../../icons/IconLoader"

export default function PokemonCard({ favoritedPokemons, setFavoritedPokemons }) {
    // Get pokemon id from current url parameter
    let { id } = useParams()
    const [idOrName, setIdOrName] = useState(id)

    // Current body content displayed
    // 0 - About, 1 - Stats, 2 - Evolutions, 3 - Generations
    const [contentCard, setContentCard] = useState(2)

    // States for fetched PokemonAPI data
    const [pokemonData, setPokemonData] = useState(null)
    const [pokemonSpeciesData, setPokemonSpeciesData] = useState(null)
    const [pokemonEvolutionData, setPokemonEvolutionData] = useState(null)

    // On window location change (after user input or redirect) rerender the card with proper pokemon data
    const location = useLocation()
    useEffect(() => {
        setIdOrName(id)
    }, [location.pathname, id, idOrName])

    // UseEffect fetching
    usePokemonEndpoint(idOrName, setPokemonData)
    usePokemonSpeciesEndpoint(idOrName, setPokemonSpeciesData, setPokemonEvolutionData)

    // Used to show current body content tab
    const shortcuts = {
        underlineVisible: "solid 3px currentColor",
        underlineHidden: "solid 3px transparent",
    }

    // Toggles current pokemon "liked" status.
    // Liked pokemons id stored in <App /> state and in LocalStorage.
    const toggleFavorite = () => {
        if (favoritedPokemons.findIndex((i) => i === idOrName) === -1) {
            const added = [idOrName, ...favoritedPokemons]
            window.localStorage.setItem("favoritedPokemons", JSON.stringify(added))
            setFavoritedPokemons(added)
        } else {
            const filtered = favoritedPokemons.filter((i) => i !== idOrName)
            window.localStorage.setItem("favoritedPokemons", JSON.stringify(filtered))
            setFavoritedPokemons([...filtered])
        }
    }

    // Function to navigate to another pokemon (used mainly in evolution tab)
    const navigate = useNavigate()
    const goToPokemon = (inputId) => {
        navigate(`/pokemon/${inputId}`)
        setIdOrName(inputId)
    }
    const goToPokedex = () => {
        navigate(`/pokedex`)
    }

    // Check if data has been fetched otherwise show the loader icon
    if (pokemonData === null || pokemonSpeciesData === null || pokemonEvolutionData === null) return <IconLoader />
    return (
        <AnimatePresence>
            <motion.div
                key={{ idOrName }}
                className="pokemon-card"
                style={{ "--bg-color": COLORS[pokemonSpeciesData.color.name] }}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}>
                <div className="pokemon-card__nav">
                    <button className="pokemon-card__nav__button--return pokemon-card__nav__button" onClick={goToPokedex}>
                        <IconReturn />
                    </button>
                    <button
                        className="pokemon-card__nav__button--like pokemon-card__nav__button"
                        onClick={() => toggleFavorite()}>
                        {favoritedPokemons.findIndex((i) => i === idOrName) === -1 ? <IconNotLiked /> : <IconLiked />}
                    </button>
                </div>

                <div className="pokemon-card__hero">
                    <h1 className="pokemon-card__hero__pokemon-name">{capitalize(pokemonData.name)}</h1>
                    <p className="pokemon-card__hero__pokemon-id">{padZero(pokemonData.id)}</p>
                    <div className="pokemon-card__hero__pokemon-types-c">
                        {pokemonData.types.map((item) => {
                            return (
                                <div key={Math.random()} className="pokemon-card__hero__pokemon-types-i" id={item.type.name}>
                                    {item.type.name}
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="pokemon-card__image-c">
                    <img
                        src={pokemonData.sprites.other["official-artwork"].front_default}
                        alt={`${pokemonData.name} official artwork`}
                        className="pokemon-card__image-i"
                    />
                </div>

                <div
                    className="pokemon-card__body"
                    style={{
                        "--font-size": pokemonSpeciesData.flavor_text_entries[1].flavor_text.length > 120 ? "0.8rem" : "0.9rem",
                    }}>
                    <div className="pokemon-card__body__nav">
                        <button
                            onClick={() => setContentCard(0)}
                            style={{
                                "--underline": contentCard === 0 ? shortcuts.underlineVisible : shortcuts.underlineHidden,
                            }}
                            className="pokemon-card__body__nav-i">
                            About
                        </button>
                        <button
                            onClick={() => setContentCard(1)}
                            style={{
                                "--underline": contentCard === 1 ? shortcuts.underlineVisible : shortcuts.underlineHidden,
                            }}
                            className="pokemon-card__body__nav-i">
                            Base stats
                        </button>
                        <button
                            onClick={() => setContentCard(2)}
                            style={{
                                "--underline": contentCard === 2 ? shortcuts.underlineVisible : shortcuts.underlineHidden,
                            }}
                            className="pokemon-card__body__nav-i">
                            Evolution
                        </button>
                        <button
                            onClick={() => setContentCard(3)}
                            style={{
                                "--underline": contentCard === 3 ? shortcuts.underlineVisible : shortcuts.underlineHidden,
                            }}
                            className="pokemon-card__body__nav-i">
                            Generations
                        </button>
                    </div>

                    <div className="pokemon-card__body__content">
                        {contentCard === 0 ? (
                            <ContentCardAbout
                                contentCard={contentCard}
                                pokemonData={pokemonData}
                                pokemonSpeciesData={pokemonSpeciesData}
                            />
                        ) : (
                            ""
                        )}
                        {contentCard === 1 ? <ContentCardBaseStats contentCard={contentCard} pokemonData={pokemonData} /> : ""}
                        {contentCard === 2 ? (
                            <ContentCardEvolution
                                contentCard={contentCard}
                                pokemonEvolutionData={pokemonEvolutionData}
                                goToPokemon={goToPokemon}
                            />
                        ) : (
                            ""
                        )}
                        {contentCard === 3 ? <ContentCardGames contentCard={contentCard} pokemonData={pokemonData} /> : ""}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
