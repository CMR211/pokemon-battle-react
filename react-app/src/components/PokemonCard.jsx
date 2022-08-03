import React from "react"

import usePokemonEndpoint from "../utilities/usePokemonEndpoint"
import usePokemonSpeciesEndpoint from "../utilities/usePokemonSpeciesEndpoint"

import iconLike from "../icons/heart-line.svg"
import iconBack from "../icons/arrow-go-back-fill.svg"

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
    pink: "rgb(248, 144, 200)",
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
                <button className="pokemon-card__nav__button--return pokemon-card__nav__button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path stroke="currentColor" fill="currentColor" d="M8 7v4L2 6l6-5v4h5a8 8 0 1 1 0 16H4v-2h9a6 6 0 1 0 0-12H8z" />
                    </svg>
                </button>
                <button className="pokemon-card__nav__button--like pokemon-card__nav__button">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                        <path fill="none" d="M0 0H24V24H0z" />
                        <path stroke="currentColor" fill="currentColor" d="M12.001 4.529c2.349-2.109 5.979-2.039 8.242.228 2.262 2.268 2.34 5.88.236 8.236l-8.48 8.492-8.478-8.492c-2.104-2.356-2.025-5.974.236-8.236 2.265-2.264 5.888-2.34 8.244-.228zm6.826 1.641c-1.5-1.502-3.92-1.563-5.49-.153l-1.335 1.198-1.336-1.197c-1.575-1.412-3.99-1.35-5.494.154-1.49 1.49-1.565 3.875-.192 5.451L12 18.654l7.02-7.03c1.374-1.577 1.299-3.959-.193-5.454z" />
                    </svg>
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
