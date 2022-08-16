import React from "react"
import { AnimatePresence, motion } from "framer-motion"

// Utilities
import pokemonHeight from "../../utilities/pokemonHeight"
import pokemonWeight from "../../utilities/pokemonWeight"
import getGenderInfo from "../../utilities/getGenderInfo"

//Icons
import IconRuler from "../../icons/IconRuler"
import IconWeight from "../../icons/IconWeight"
import IconMale from "../../icons/IconMale"
import IconFemale from "../../icons/IconFemale"

export default function ContentCardAbout({ pokemonSpeciesData, pokemonData }) {
    return (
        <AnimatePresence>
            <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
                <p className="pokemon-card__body__content">
                    {pokemonSpeciesData["flavor_text_entries"][1]["flavor_text"].replace("\f", " ")}
                </p>
                <div className="pokemon-card__body__weight">
                    <IconRuler />
                    <div className="pokemon-card__body__weight-i">
                        <p>Height</p>
                        <p>{pokemonHeight(pokemonData.height)}</p>
                    </div>

                    <IconWeight />
                    <div className="pokemon-card__body__weight-i">
                        <p>Weight</p>
                        <p> {pokemonWeight(pokemonData.weight)}</p>
                    </div>
                </div>
                {/* <p className="pokemon-card__body__gender__title">Gender characteristics</p> */}
                <div className="pokemon-card__body__weight">
                    <IconMale color="currentColor" />
                    <div>
                        <p>Male chance</p>
                        {getGenderInfo(pokemonSpeciesData.gender_rate)[0]}
                    </div>
                    <IconFemale color="currentColor" />
                    <div>
                        <p>Female chance</p>
                        {getGenderInfo(pokemonSpeciesData.gender_rate)[1]}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
