import { useEffect, useState } from "react";

export default function useLSFavPokemon () {
    const [favoritedPokemons, setFavoritedPokemons] = useState([])

    useEffect(() => {
        const fp = JSON.parse(window.localStorage.getItem("favoritedPokemons"))
        if (fp) setFavoritedPokemons(fp)
    }, [])

    return [favoritedPokemons, setFavoritedPokemons]
}