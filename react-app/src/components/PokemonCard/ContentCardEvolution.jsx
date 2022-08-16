import React from "react"
import { AnimatePresence, motion } from "framer-motion"

// Utilities
import getEvolutions from "../../utilities/getEvolutions"
import capitalize from "../../utilities/capitalize"

// Icons
import IconArrow from "../../icons/IconArrow"

export default function ContentCardEvolution({ pokemonEvolutionData, goToPokemon, contentCard }) {
    const evolutions = getEvolutions(pokemonEvolutionData)
    const mappedEvolutions = evolutions.map((evolution, index) => {
        if (evolution === "none") return ""
        return (
            <AnimatePresence>
                <motion.div
                    key={index}
                    className="pokemon-card__body__evolution"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    exit={{ x: -100 , opacity: 0 }}>
                    <div className="pokemon-card__body__evolution__pokemon" onClick={() => goToPokemon(evolution.base.id)}>
                        <img src={evolution.base.url} alt={evolution.base.name} />
                        <p>{capitalize(evolution.base.name)}</p>
                    </div>
                    <div className="pokemon-card__body__evolution__arrow">
                        <p>{evolution.level > 0 ? "Lvl " + evolution.level : ""}</p>
                        <IconArrow />
                    </div>
                    <div className="pokemon-card__body__evolution__pokemon" onClick={() => goToPokemon(evolution.target.id)}>
                        <img src={evolution.target.url} alt={evolution.target.name} />
                        <p>{capitalize(evolution.target.name)}</p>
                    </div>
                </motion.div>
            </AnimatePresence>
        )
    })
    return <div className="pokemon-card__body__evolutions">{mappedEvolutions}</div>
}
