import React from "react"
import { AnimatePresence, motion } from "framer-motion"

// Utilities
import capitalize from "../../utilities/capitalize"

// Icons
import IconYes from "../../icons/IconYes"
import IconNo from "../../icons/IconNo"

export default function ContentCardGames({ pokemonData }) {
    const generations = [
        ["red", "green", "yellow", "blue"], //gen-1
        ["gold", "silver", "crystal"], //gen-2
        ["ruby", "sapphire", "emerald", "firered", "leafgreen"], //gen-3
        ["diamond", "pearl", "platinum", "heartgold", "soulsilver"], //gen-4
        ["black", "white", "black-2", "white-2"], //gen-5
    ]
    const presence = generations.map((generation, index) => {
        let present = false
        generation.forEach((version) => {
            if (
                pokemonData.game_indices.some((game_indice) => {
                    return game_indice.version.name === version
                })
            ) {
                present = true
            }
        })
        if (present === true) return [true, `Generation ${index + 1}`]
        if (present === false) return [false, `Generation ${index + 1}`]
    })
    return (
        <AnimatePresence>
            <motion.div
                className="pokemon-card__body__gen"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -100, opacity: 0 }}>
                {presence.map((generation, index) => {
                    return (
                        <AnimatePresence>
                            <motion.div
                                initial={{ x: 30, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * index }}
                                exit={{ x: -30, opacity: 0 }}
                                key={index}
                                className="pokemon-card__body__gen-c" style={{ opacity: generation[0] === true ? 1 : 0.2 }}>
                                <div className="pokemon-card__body__gen-i1">
                                    {index + 1}
                                    <br />
                                    {generation[0] === true ? <IconYes /> : <IconNo />}
                                </div>
                                <div className="pokemon-card__body__gen-i2">
                                    {generations[index].map((gen) => {
                                        return (
                                            <div key={gen} className={`pokemon-card__body__gen--${gen}`}>
                                                {capitalize(gen)}
                                            </div>
                                        )
                                    })}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    )
                })}
            </motion.div>
        </AnimatePresence>
    )
}
