import PokemonCard from "./components/PokemonCard"
import { Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"

import "./styles/index.css"

function App() {
    const [favoritedPokemons, setFavoritedPokemons] = useState([])
    
    useEffect(() => {
        const fp = JSON.parse(window.localStorage.getItem("favoritedPokemons"))
        if (fp) setFavoritedPokemons(fp)
    }, [])

    return (
        <Routes>
            <Route path="/" element={<PokemonCard idOrName={1} favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />} />
            <Route path="/pokemon/:id" element={<PokemonCard favoritedPokemons={favoritedPokemons} setFavoritedPokemons={setFavoritedPokemons} />} />
        </Routes>
    )
}

export default App
