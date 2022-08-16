import React from "react"
import { AnimatePresence, motion } from "framer-motion"

// Utilities
import { COLORS } from "../../utilities/COLORS"
import capitalize from "../../utilities/capitalize"

export default function ContentCardBaseStats({ pokemonData }) {
    return (
        <AnimatePresence>
            <motion.div
                className="pokemon-card__body__stats"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}>
                {pokemonData.stats.map((stat, index) => {
                    const colorStr = COLORS[Object.keys(COLORS)[index]]
                    return (
                        <motion.div
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -100, opacity: 0 }}
                            transition={{ delay: 0.1 * index }}
                            key={index}
                            className="pokemon-card__body__stat"
                            style={{
                                "--bg-color": `rgba(${colorStr.slice(4, colorStr.length - 1)}, 0.3)`,
                            }}>
                            <p>
                                {capitalize(stat.stat.name.replaceAll("-", " ").replaceAll("special", "sp.").replace("hp", "HP"))}
                            </p>
                            <p>{stat.base_stat}</p>
                        </motion.div>
                    )
                })}
                <p className="pokemon-card__body__stat--total">Total: {pokemonData.stats.reduce((p, c) => p + c.base_stat, 0)}</p>
            </motion.div>
        </AnimatePresence>
    )
}
