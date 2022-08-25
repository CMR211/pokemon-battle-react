import PokemonCard from "./components/PokemonCard/PokemonCard.jsx"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"

import "./styles/index.css"

import Home from "./components/Home/Home.jsx"
import Pokedex from "./components/Pokedex/Pokedex.jsx"

function App() {
    const [history, setHistory] = useState(["/"])
    const [favoritedPokemons, setFavoritedPokemons] = useState([])

    useEffect(() => {
        const fp = JSON.parse(window.localStorage.getItem("favoritedPokemons"))
        if (fp) setFavoritedPokemons(fp)
    }, [])

    useEffect(() => {
        console.log(history)
    }, [history])

    return (
        <AnimatePresence>
                <Route key="home" path="/">
                    <Home history={history} setHistory={setHistory} />{" "}
                </Route>
                <Route key="pokedex" path="/pokedex">
                    <Pokedex
                        history={history}
                        setHistory={setHistory}
                        favoritedPokemons={favoritedPokemons}
                        setFavoritedPokemons={setFavoritedPokemons}
                    />
                </Route>
                <Route key="pokemon" path="/pokemon/:id">
                    <PokemonCard
                        history={history}
                        setHistory={setHistory}
                        favoritedPokemons={favoritedPokemons}
                        setFavoritedPokemons={setFavoritedPokemons}
                    />
                </Route>
        </AnimatePresence>
    )
}

export default App
