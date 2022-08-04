import React from "react"

import usePokemonEndpoint from "../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../utilities/usePokemonSpeciesEndpoint"

import { COLORS } from "../utilities/COLORS"

import pokemonHeight from "../utilities/pokemonHeight"
import pokemonWeight from "../utilities/pokemonWeight"
import capitalize from "../utilities/capitalize"
import padZero from "../utilities/padZero"
import { useParams } from "react-router-dom"

export default function PokemonCard({ favoritedPokemons, setFavoritedPokemons }) {
    let { id } = useParams()
    const idOrName = id || 1

    const [contentCard, setContentCard] = React.useState(1)
    const [pokemonData, setPokemonData] = React.useState(null)
    const [pokemonSpeciesData, setPokemonSpeciesData] = React.useState(null)

    usePokemonEndpoint(idOrName, setPokemonData)
    usePokemonSpeciesEndpoint(idOrName, setPokemonSpeciesData)

    const shortcuts = {
        underlineVisible: "solid 3px currentColor",
        underlineHidden: "solid 3px transparent",
    }

    const toggleFavorite = () => {
        if (favoritedPokemons.findIndex(i => i === idOrName) === -1) {
            const added = [idOrName, ...favoritedPokemons]
            window.localStorage.setItem("favoritedPokemons", JSON.stringify(added))
            setFavoritedPokemons(added)
        } else {
            const filtered = favoritedPokemons.filter(i => i !== idOrName)
            window.localStorage.setItem("favoritedPokemons", JSON.stringify(filtered))
            setFavoritedPokemons([...filtered])
        }
    }

    const ContentCardAbout = () => {
        return (
            <>
                <p className="pokemon-card__body__content">{pokemonSpeciesData["flavor_text_entries"][1]["flavor_text"].replace("\f", " ")}</p>
                <div className="pokemon-card__body__weight">
                    <div className="pokemon-card__body__weight-i">
                        <p>Height:</p>
                        <p>{pokemonHeight(pokemonData.height)}</p>
                    </div>
                    <div className="pokemon-card__body__weight-i">
                        <p>Weight:</p>
                        <p> {pokemonWeight(pokemonData.weight)}</p>
                    </div>
                </div>
            </>
        )
    }

    const ContentCardBaseStats = () => {
        return (
            <div className="pokemon-card__body__stats">
                {pokemonData.stats.map((stat, index) => {
                    const colorStr = COLORS[Object.keys(COLORS)[index]]
                    return (
                        <div className="pokemon-card__body__stat" style={{ "--bg-color": `rgba(${colorStr.slice(4, colorStr.length - 1)}, 0.3)` }}>
                            <p>{capitalize(stat.stat.name.replaceAll("-", " ").replaceAll("special", "sp.").replace("hp", "HP"))}</p>
                            <p>{stat.base_stat}</p>
                        </div>
                    )
                })}
                <p className="pokemon-card__body__stat--total">Total: {pokemonData.stats.reduce((p, c) => p + c.base_stat, 0)}</p>
            </div>
        )
    }

    if (pokemonData === null || pokemonSpeciesData === null) return <p className="asd">Loading</p>
    return (
        <div className="pokemon-card" style={{ "--bg-color": COLORS[pokemonSpeciesData.color.name] }}>
            <div className="pokemon-card__nav">
                <button className="pokemon-card__nav__button--return pokemon-card__nav__button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path stroke="currentColor" fill="currentColor" d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
                    </svg>
                </button>
                <button className="pokemon-card__nav__button--like pokemon-card__nav__button" onClick={() => toggleFavorite()}>
                    {favoritedPokemons.findIndex(i => i === idOrName) === -1 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path stroke="currentColor" fill="currentColor" d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                            <path fill="none" d="M0 0H24V24H0z" />
                            <path fill="currentColor" d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="pokemon-card__hero">
                <h1 className="pokemon-card__hero__pokemon-name">{capitalize(pokemonData.name)}</h1>
                <p className="pokemon-card__hero__pokemon-id">{padZero(pokemonData.id)}</p>
                <div className="pokemon-card__hero__pokemon-types-c">
                    {pokemonData.types.map(item => {
                        return (
                            <div className="pokemon-card__hero__pokemon-types-i" id={item.type.name}>
                                {item.type.name}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="pokemon-card__image-c">
                <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={`${pokemonData.name} official artwork`} className="pokemon-card__image-i" />
            </div>

            <div className="pokemon-card__body" style={{ "--font-size": pokemonSpeciesData.flavor_text_entries[1].flavor_text.length > 120 ? "0.8rem" : "0.9rem" }}>
                <div className="pokemon-card__body__nav">
                    <button onClick={() => setContentCard(0)} style={{ "--underline": contentCard === 0 ? shortcuts.underlineVisible : shortcuts.underlineHidden }} className="pokemon-card__body__nav-i">
                        About
                    </button>
                    <button onClick={() => setContentCard(1)} style={{ "--underline": contentCard === 1 ? shortcuts.underlineVisible : shortcuts.underlineHidden }} className="pokemon-card__body__nav-i">
                        Base stats
                    </button>
                    <button onClick={() => setContentCard(2)} style={{ "--underline": contentCard === 2 ? shortcuts.underlineVisible : shortcuts.underlineHidden }} className="pokemon-card__body__nav-i">
                        Evolution
                    </button>
                    <button onClick={() => setContentCard(3)} style={{ "--underline": contentCard === 3 ? shortcuts.underlineVisible : shortcuts.underlineHidden }} className="pokemon-card__body__nav-i">
                        Moves
                    </button>
                </div>
                <div className="pokemon-card__body__content">{contentCard === 0 ? <ContentCardAbout /> : ""}</div>
                <div className="pokemon-card__body__content">{contentCard === 1 ? <ContentCardBaseStats /> : ""}</div>
            </div>
        </div>
    )
}
