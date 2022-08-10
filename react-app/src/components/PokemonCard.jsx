import React from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"

// Fetching scripts
import usePokemonEndpoint from "../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../utilities/usePokemonSpeciesEndpoint"

// Colors database for background and stats
import { COLORS } from "../utilities/COLORS"

// Utility functions
import capitalize from "../utilities/capitalize"
import padZero from "../utilities/padZero"

// Data handling functions
import pokemonWeight from "../utilities/pokemonWeight"
import pokemonHeight from "../utilities/pokemonHeight"
import getEvolutions from "../utilities/getEvolutions"
import getGenderInfo from "../utilities/getGenderInfo"

// SCG icons
import IconArrow from "../icons/IconArrow"
import IconLiked from "../icons/IconLiked"
import IconNotLiked from "../icons/IconNotLiked"
import IconReturn from "../icons/IconReturn"
import IconRuler from "../icons/IconRuler"
import IconWeight from "../icons/IconWeight"
import IconFemale from "../icons/IconFemale"
import IconMale from "../icons/IconMale"

export default function PokemonCard({ favoritedPokemons, setFavoritedPokemons }) {
    // Get pokemon id from current url parameter
    let { id } = useParams()

    // Fallback on no id, legacy idOrName
    const [idOrName, setIdOrName] = React.useState(id)

    // Current body content displayed
    // 0 - About, 1 - Stats, 2 - Evolutions, 3 - Moves
    const [contentCard, setContentCard] = React.useState(2)

    // States for fetched PokemonAPI data
    const [pokemonData, setPokemonData] = React.useState(null)
    const [pokemonSpeciesData, setPokemonSpeciesData] = React.useState(null)
    const [pokemonEvolutionData, setPokemonEvolutionData] = React.useState(null)

    const location = useLocation()
    React.useEffect(() => {
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

    const navigate = useNavigate()
    const goToPokemon = (inputId) => {
        navigate(`/pokemon/${inputId}`)
        setIdOrName(inputId)
    }

    // Card 0
    const ContentCardAbout = () => {
        return (
            <>
                <p className="pokemon-card__body__content">
                    {pokemonSpeciesData["flavor_text_entries"][1]["flavor_text"].replace("\f", " ")}
                </p>
                <div className="pokemon-card__body__weight">
                    <IconRuler />
                    <div className="pokemon-card__body__weight-i">
                        <p>Height</p>
                        <p>{pokemonHeight(pokemonData.height)}</p>
                    </div>

                    <IconWeight />
                    <div className="pokemon-card__body__weight-i">
                        <p>Weight</p>
                        <p> {pokemonWeight(pokemonData.weight)}</p>
                    </div>
                </div>
                {/* <p className="pokemon-card__body__gender__title">Gender characteristics</p> */}
                <div className="pokemon-card__body__weight">
                    <IconMale color="currentColor" />
                    <div>
                        <p>Male chance</p>
                        {getGenderInfo(pokemonSpeciesData.gender_rate)[0]}
                    </div>
                    <IconFemale color="currentColor" />
                    <div>
                        <p>Female chance</p>
                        {getGenderInfo(pokemonSpeciesData.gender_rate)[1]}
                    </div>
                </div>
            </>
        )
    }

    // Card 1
    const ContentCardBaseStats = () => {
        if (pokemonEvolutionData === null) return ""
        return (
            <div className="pokemon-card__body__stats">
                {pokemonData.stats.map((stat, index) => {
                    const colorStr = COLORS[Object.keys(COLORS)[index]]
                    return (
                        <div
                            key={index}
                            className="pokemon-card__body__stat"
                            style={{
                                "--bg-color": `rgba(${colorStr.slice(
                                    4,
                                    colorStr.length - 1
                                )}, 0.3)`,
                            }}>
                            <p>
                                {capitalize(
                                    stat.stat.name
                                        .replaceAll("-", " ")
                                        .replaceAll("special", "sp.")
                                        .replace("hp", "HP")
                                )}
                            </p>
                            <p>{stat.base_stat}</p>
                        </div>
                    )
                })}
                <p className="pokemon-card__body__stat--total">
                    Total: {pokemonData.stats.reduce((p, c) => p + c.base_stat, 0)}
                </p>
            </div>
        )
    }

    // Card 2
    const ContentCardEvolution = () => {
        const evolutions = getEvolutions(pokemonEvolutionData)
        const mappedEvolutions = evolutions.map((evolution, index) => {
            if (evolution === "none") return ""
            return (
                <div key={index} className="pokemon-card__body__evolution">
                    <div
                        className="pokemon-card__body__evolution__pokemon"
                        onClick={() => goToPokemon(evolution.base.id)}>
                        <img src={evolution.base.url} alt={evolution.base.name} />
                        <p>{capitalize(evolution.base.name)}</p>
                    </div>
                    <div className="pokemon-card__body__evolution__arrow">
                        <p>{evolution.level > 0 ? "Lvl " + evolution.level : ""}</p>
                        <IconArrow />
                    </div>
                    <div
                        className="pokemon-card__body__evolution__pokemon"
                        onClick={() => goToPokemon(evolution.target.id)}>
                        <img src={evolution.target.url} alt={evolution.target.name} />
                        <p>{capitalize(evolution.target.name)}</p>
                    </div>
                </div>
            )
        })
        return <div className="pokemon-card__body__evolutions">{mappedEvolutions}</div>
    }

    const ContentCardGames = () => {
        const generations = [
            ["red", "green", "yellow", "blue"], //gen-1
            ["gold", "silver", "crystal"], //gen-2
            ["ruby", "sapphire", "emerald", "firered", "leafgreen"], //gen-3
            ["diamond", "pearl", "platinum", "heartgold", "soulsilver"], //gen-4
            ["black", "white", "black-2", "white-2"], //gen-5
        ]
        const presence = generations.map((generation, index) => {
            let present = false
            generation.forEach((version) => {
                if (
                    pokemonData.game_indices.some((game_indice) => {
                        return game_indice.version.name === version
                    })
                ) {
                    present = true
                }
            })
            if (present === true) return `Generation ${index + 1}`
            if (present === false) return `N/A`
        })
        return presence.map((generation, index) => {
            return (
                <div key={index} className="pokemon-card__body__game">
                    <p>{generation}</p>
                </div>
            )
        })
    }

    if (pokemonData === null || pokemonSpeciesData === null || pokemonEvolutionData === null)
        return <p className="asd">Loading</p>
    return (
        <div
            className="pokemon-card"
            style={{
                "--bg-color": COLORS[pokemonSpeciesData.color.name],
            }}>
            <div className="pokemon-card__nav">
                <button className="pokemon-card__nav__button--return pokemon-card__nav__button">
                    <IconReturn />
                </button>
                <button
                    className="pokemon-card__nav__button--like pokemon-card__nav__button"
                    onClick={() => toggleFavorite()}>
                    {favoritedPokemons.findIndex((i) => i === idOrName) === -1 ? (
                        <IconNotLiked />
                    ) : (
                        <IconLiked />
                    )}
                </button>
            </div>

            <div className="pokemon-card__hero">
                <h1 className="pokemon-card__hero__pokemon-name">{capitalize(pokemonData.name)}</h1>
                <p className="pokemon-card__hero__pokemon-id">{padZero(pokemonData.id)}</p>
                <div className="pokemon-card__hero__pokemon-types-c">
                    {pokemonData.types.map((item) => {
                        return (
                            <div
                                key={item.type.name}
                                className="pokemon-card__hero__pokemon-types-i"
                                id={item.type.name}>
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
                    "--font-size":
                        pokemonSpeciesData.flavor_text_entries[1].flavor_text.length > 120
                            ? "0.8rem"
                            : "0.9rem",
                }}>
                <div className="pokemon-card__body__nav">
                    <button
                        onClick={() => setContentCard(0)}
                        style={{
                            "--underline":
                                contentCard === 0
                                    ? shortcuts.underlineVisible
                                    : shortcuts.underlineHidden,
                        }}
                        className="pokemon-card__body__nav-i">
                        About
                    </button>
                    <button
                        onClick={() => setContentCard(1)}
                        style={{
                            "--underline":
                                contentCard === 1
                                    ? shortcuts.underlineVisible
                                    : shortcuts.underlineHidden,
                        }}
                        className="pokemon-card__body__nav-i">
                        Base stats
                    </button>
                    <button
                        onClick={() => setContentCard(2)}
                        style={{
                            "--underline":
                                contentCard === 2
                                    ? shortcuts.underlineVisible
                                    : shortcuts.underlineHidden,
                        }}
                        className="pokemon-card__body__nav-i">
                        Evolution
                    </button>
                    <button
                        onClick={() => setContentCard(3)}
                        style={{
                            "--underline":
                                contentCard === 3
                                    ? shortcuts.underlineVisible
                                    : shortcuts.underlineHidden,
                        }}
                        className="pokemon-card__body__nav-i">
                        Generations
                    </button>
                </div>
                <div className="pokemon-card__body__content">
                    {contentCard === 0 ? <ContentCardAbout /> : ""}
                    {contentCard === 1 ? <ContentCardBaseStats /> : ""}
                    {contentCard === 2 ? <ContentCardEvolution /> : ""}
                    {contentCard === 3 ? <ContentCardGames /> : ""}
                </div>
            </div>
        </div>
    )
}
