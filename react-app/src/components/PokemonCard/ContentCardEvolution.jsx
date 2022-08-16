import React from "react"

// Utilities
import getEvolutions from "../../utilities/getEvolutions"
import capitalize from "../../utilities/capitalize"

// Icons
import IconArrow from "../../icons/IconArrow"

export default function ContentCardEvolution({ pokemonEvolutionData, goToPokemon }) {
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
