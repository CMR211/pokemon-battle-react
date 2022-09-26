// Libraries
import { AnimatePresence, motion } from "framer-motion"

// Components
import HomeButton from "./HomeButton"

// Icons
import IconPokeball from "../../icons/IconPokeball"
import IconPikachu from "../../icons/IconPikachu"
import IconBook from "../../icons/IconBook"
import IconQuestionmark from "../../icons/IconQuestionmark"
import IconBerry from "../../icons/IconBerry"
import IconFloppy from "../../icons/IconFloppy"

export default function Home({ history, setHistory }) {
    // console.log("%c Rendering <Home>", "color: blue; font-weight: bold")

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
                <div className="bg pokeball">
                    <IconPokeball />
                </div>
                <div className="bg pikachu">
                    <IconPikachu />
                </div>
                <h1>PokeAPP</h1>
                <p>Venture through the Pokemon world provided by PokeAPI!</p>
                <div className="home__buttons">
                <p>Explore pokemons across five generations, learn their strenghts and distinguish their looks.</p>
                    <HomeButton history={history} setHistory={setHistory} color="yellow" goto="/pokedex" text="Pokedex">
                        <IconBook />
                    </HomeButton>
                    <p>Go wild and find out new pokemon, maybe you will memorize them all!</p>
                    <HomeButton
                        history={history}
                        setHistory={setHistory}
                        color="green"
                        goto={randomPokemon}
                        text="Random pokemon">
                        <IconQuestionmark />
                    </HomeButton>
                    <p>See the berries, pokemons most loved treats.</p>
                    <HomeButton history={history} setHistory={setHistory} color="red" goto="/berries" text="Berries">
                        <IconBerry />
                    </HomeButton>
                    <p>Explore the franchise since its first debut on Gameboy!</p>
                    <HomeButton history={history} setHistory={setHistory} color="blue" goto="/gameindices" text="Game indices">
                        <IconFloppy />
                    </HomeButton>
                    <p id="copyright">(c) 2022 Bartosz Surma</p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
