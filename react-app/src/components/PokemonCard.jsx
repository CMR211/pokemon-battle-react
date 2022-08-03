import React from "react"

import usePokemonEndpoint from "../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../utilities/usePokemonSpeciesEndpoint"

import pokemonHeight from "../utilities/pokemonHeight"
import pokemonWeight from "../utilities/pokemonWeight"
import capitalize from "../utilities/capitalize"
import padZero from "../utilities/padZero"

const COLORS = {
    green: "rgb(79, 193, 166)",
    red: "rgb(247, 120, 107)",
    blue: "rgb(88, 170, 246)",
    yellow: "rgb(255, 206, 75)",
    purple: "rgb(124, 83, 140)",
    brown: "rgb(177, 115, 108)",
    gray: "rgb(160, 160, 160)",
    white: "rgb(240, 240, 240)",
    pink: "rgb(248, 144, 200)"
}

export default function PokemonCard({ idOrName }) {
    const [contentCard, setContentCard] = React.useState(0)
    const [pokemonData, setPokemonData] = React.useState(null)
    const [pokemonSpeciesData, setPokemonSpeciesData] = React.useState(null)

    usePokemonEndpoint(idOrName, setPokemonData)
    usePokemonSpeciesEndpoint(idOrName, setPokemonSpeciesData)

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

    if (pokemonData === null || pokemonSpeciesData === null) return <p className="asd">Loading</p>
    return (
        <div className="pokemon-card" style={{ "--bg-color": COLORS[pokemonSpeciesData.color.name] }}>
            <div className="pokemon-card__nav">
                <button className="pokemon-card__nav__button--return pokemon-card__nav__button">Return</button>
                <button className="pokemon-card__nav__button--like pokemon-card__nav__button">Like</button>
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

            <div className="pokemon-card__body">
                <div className="pokemon-card__body__nav">
                    <button className="pokemon-card__body__nav-i">About</button>
                    <button className="pokemon-card__body__nav-i">Base stats</button>
                    <button className="pokemon-card__body__nav-i">Evolution</button>
                    <button className="pokemon-card__body__nav-i">Moves</button>
                </div>
                <div className="pokemon-card__body__content">{contentCard === 0 ? <ContentCardAbout /> : ""}</div>
            </div>
        </div>
    )
}
