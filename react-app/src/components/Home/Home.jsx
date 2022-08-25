import { AnimatePresence, motion } from "framer-motion"

import IconPokeball from "../../icons/IconPokeball"
import IconPikachu from "../../icons/IconPikachu"
import HomeButton from "./HomeButton"
import IconBook from "../../icons/IconBook"
import IconQuestionmark from "../../icons/IconQuestionmark"
import IconBerry from "../../icons/IconBerry"

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
                {/* <div className="home__container"> */}
                    <div className="bg pokeball">
                        <IconPokeball />
                    </div>
                    <div className="bg pikachu">
                        <IconPikachu />
                    </div>
                    <h1>PokeAPP</h1>
                    <div className="home__buttons">
                        <HomeButton history={history} setHistory={setHistory} color="yellow" goto="/pokedex" text="Pokedex">
                            <IconBook />
                        </HomeButton>
                        <HomeButton
                            history={history}
                            setHistory={setHistory}
                            color="green"
                            goto={randomPokemon}
                            text="Random pokemon">
                            <IconQuestionmark />
                        </HomeButton>
                        <HomeButton
                            history={history}
                            setHistory={setHistory}
                            color="red"
                            goto="/berries"
                            text="Berries">
                            <IconBerry />
                        </HomeButton>
                    </div>
                {/* </div> */}
            </motion.div>
        </AnimatePresence>
    )
}
