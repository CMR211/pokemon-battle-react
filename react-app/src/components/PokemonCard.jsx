import React from "react"

import usePokemonEndpoint from "../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../utilities/usePokemonSpeciesEndpoint"

import capitalize from "../utilities/capitalize"
import padZero from "../utilities/padZero"

const samplePokemon = {
    name: "pikachu",
    id: 1,
    types: [
        {
            slot: 1,
            type: {
                name: "bug",
            },
        },
        {
            slot: 2,
            type: {
                name: "electric",
            },
        },
    ],
    sprites: {
        other: {
            "official-artwork": {
                front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
            },
        },
    },
}

export default function PokemonCard({ idOrName }) {
    const [contentCard, setContentCard] = React.useState(0)
    const [pokemonData, setPokemonData] = React.useState(null)
    const [pokemonSpeciesData, setPokemonSpeciesData] = React.useState(null)

    usePokemonEndpoint(idOrName, setPokemonData)
    usePokemonSpeciesEndpoint(idOrName, setPokemonSpeciesData)

    const ContentCardAbout = () => {
        return <p className="pokemon-card__body__content">{pokemonSpeciesData["flavor_text_entries"][0]["flavor_text"].replace("\f", "")}</p>
    }
    if (pokemonData === null || pokemonSpeciesData === null) return <p className="asd">Loading</p>
    return (
        <div className="pokemon-card">
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
                            <div className="pokemon-card__her__pokemon-types-i" id={item.type.name}>
                                {item.type.name}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="pokemon-card__image-c">
                <img src={pokemonData.sprites.other["official-artwork"].front_default} alt={`${samplePokemon.name} official artwork`} className="pokemon-card__image-i" />
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
