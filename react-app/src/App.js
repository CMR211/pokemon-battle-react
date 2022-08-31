// Libraries
import { Routes, Route } from "react-router-dom"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

// Styles
import "./styles/index.css"

// Components
import Home from "./components/Home/Home.jsx"
import Pokedex from "./components/Pokedex/Pokedex.jsx"
import PokemonCard from "./components/PokemonCard/PokemonCard.jsx"
import Berries from "./components/Berries/Berries.jsx"
import GameIndices from "./components/GameIndices/GameIndices.jsx"

// Utilities
import useLSFavPokemon from "./utilities/useLSFavPokemons.js"

function App() {
    const [history, setHistory] = useState(["/"])
    const [favoritedPokemons, setFavoritedPokemons] = useLSFavPokemon()

    return (
        <AnimatePresence>
            <Routes>
                <Route
                    key="pokedex"
                    path="/pokedex"
                    element={
                        <Pokedex
                            history={history}
                            setHistory={setHistory}
                            favoritedPokemons={favoritedPokemons}
                            setFavoritedPokemons={setFavoritedPokemons}
                        />
                    }
                />
                <Route
                    key="pokemon"
                    path="/pokemon/:id"
                    element={
                        <PokemonCard
                            history={history}
                            setHistory={setHistory}
                            favoritedPokemons={favoritedPokemons}
                            setFavoritedPokemons={setFavoritedPokemons}
                        />
                    }
                />
                <Route key="berries" path="/berries" element={<Berries history={history} setHistory={setHistory} />} />
                <Route
                    key="gameindices"
                    path="/gameindices"
                    element={<GameIndices history={history} setHistory={setHistory} />}
                />
                <Route key="home" path="/" element={<Home history={history} setHistory={setHistory} />} />
            </Routes>
        </AnimatePresence>
    )
}

export default App
