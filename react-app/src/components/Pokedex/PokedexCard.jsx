import React from "react"

import { COLORS } from "../../utilities/COLORS"
import capitalize from "../../utilities/capitalize"
import padZero from "../../utilities/padZero"

import IconLiked from "../../icons/IconLiked"

export default function PokedexCard({ pokemonColors, goToPokemon, pokemon, favoritedPokemons }) {
    const bgColor = pokemonColors.find((color) => color.id === pokemon.id).color
    return (
        <div
            onClick={() => goToPokemon(pokemon.id)}
            className="pokedex__pokemon"
            style={{ "--bg-color": `rgba(${COLORS[bgColor].replace("rgb(", "").slice(0, -1)},1)` }}>
            <div className="pokedex__like-status">{favoritedPokemons.includes(pokemon.id) ? <IconLiked /> : ""}</div>
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
}
