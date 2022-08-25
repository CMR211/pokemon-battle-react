import { useEffect } from "react"
import axios from "axios"

async function fetchData(setBerries) {
    const { data } = await axios.get("https://pokeapi.co/api/v2/berry/?limit=64")
    setBerries(data.results)
}

export default function useBerries(setBerries) {
    useEffect(() => {
        fetchData(setBerries)
    }, [])
}
