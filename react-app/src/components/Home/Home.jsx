import { useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import cheerio from "cheerio"
import axios from "axios"

import IconPokeball from "../../icons/IconPokeball"
import IconPikachu from "../../icons/IconPikachu"
import HomeButton from "./HomeButton"

export default function Home({ history, setHistory }) {
    console.log("%c Rendering <Home>", "color: blue; font-weight: bold")
    
    function genRandom() {
        const MAX_POK = 649
        return Math.floor(Math.random() * MAX_POK)
    }
    const randomPokemon = `/pokemon/${genRandom()}`
    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                className="home">
                <div className="home__container">
                    <h1>PokeAPP</h1>
                    <HomeButton history={history} setHistory={setHistory} color="yellow" goto="/pokedex" text="Pokedex" />
                    <HomeButton
                        history={history}
                        setHistory={setHistory}
                        color="red"
                        goto={randomPokemon}
                        text="Random pokemon"
                    />
                    <div className="bg pokeball">
                        <IconPokeball />
                    </div>
                    <div className="bg pikachu">
                        <IconPikachu />
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
