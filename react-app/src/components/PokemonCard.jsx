import React from "react"

const samplePokemon = {
    name: "pikachu"
}

export default function PokemonCard() {
    return (
        <div className="pokemon-card">
            <div className="pokemon-card__nav">
                <button className="pokemon-card__nav__button--return pokemon-card__nav__button"></button>
                <button className="pokemon-card__nav__button--like pokemon-card__nav__button"></button>
            </div>
            <div className="pokemon-card__hero">
                <h1 className="pokemon-card__hero__pokemon-name">Bulbasaur</h1>
            </div>
        </div>
    )
}
