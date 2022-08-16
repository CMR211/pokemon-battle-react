import React from "react"

// Utilities
import { COLORS } from "../../utilities/COLORS"
import capitalize from "../../utilities/capitalize"

export default function ContentCardBaseStats({ pokemonData }) {
    return (
        <div className="pokemon-card__body__stats">
            {pokemonData.stats.map((stat, index) => {
                const colorStr = COLORS[Object.keys(COLORS)[index]]
                return (
                    <div
                        key={index}
                        className="pokemon-card__body__stat"
                        style={{
                            "--bg-color": `rgba(${colorStr.slice(4, colorStr.length - 1)}, 0.3)`,
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
