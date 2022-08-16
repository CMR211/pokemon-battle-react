import PokemonCard from "./components/PokemonCard/PokemonCard.jsx"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import "./styles/index.css"
import Pokedex from "./components/Pokedex/Pokedex.jsx"

function App() {
    const [favoritedPokemons, setFavoritedPokemons] = useState([])
    
    useEffect(() => {
        const fp = JSON.parse(window.localStorage.getItem("favoritedPokemons"))
        if (fp) setFavoritedPokemons(fp)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Pokedex favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />} />
            <Route path="/pokemon/:id" element={<PokemonCard favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />} />
        </Routes>
    )
}

export default App
