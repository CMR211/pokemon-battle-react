import PokemonCard from "./components/PokemonCard/PokemonCard.jsx"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import "./styles/index.css"

import Home from "./components/Home/Home.jsx"
import Pokedex from "./components/Pokedex/Pokedex.jsx"

function App() {
    const [favoritedPokemons, setFavoritedPokemons] = useState([])

    useEffect(() => {
        const fp = JSON.parse(window.localStorage.getItem("favoritedPokemons"))
        if (fp) setFavoritedPokemons(fp)
    }, [])

    return (
        <AnimatePresence>
            <Routes>
                <Route key="home" path="/" element={<Home />} />
                <Route
                    key="pokedex"
                    path="/pokedex"
                    element={<Pokedex favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />}
                />
                <Route
                    key="pokemon"
                    path="/pokemon/:id"
                    element={<PokemonCard favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />}
                />
            </Routes>
        </AnimatePresence>
    )
}

export default App
