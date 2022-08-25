import { useEffect } from "react"
import axios from "axios"

async function fetchData(idOrName, setData, setEvoData) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}/`)
    const evoData = await axios.get(data.evolution_chain.url)
    setData(data)
    setEvoData(evoData.data)
}

export default function usePokemonSpeciesEndpoint(idOrName, setData, setEvoData) {
    useEffect(() => {
        fetchData(idOrName, setData, setEvoData)
    }, [idOrName])
}
