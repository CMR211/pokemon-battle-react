import React from "react"
import { AnimatePresence, motion } from "framer-motion"
import IconPokeball from "../../icons/IconPokeball"
import IconPikachu from "../../icons/IconPikachu"

export default function Home() {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="home">
                <div className="home__container">
                    <h1>Pokemon Center</h1>
                    <div className="silhouette pokeball">
                        <IconPokeball />
                    </div>
                    <div className="silhouette pikachu">
                        <IconPikachu />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
