import { useEffect } from "react"
import axios from "axios"

async function fetchData(idOrName, setData) {
    const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}/`, {
        headers: {},
        params: {},
    })
    setData(data)
}

export default function usePokemonEndpoint(idOrName, setData) {
    useEffect(() => {
        fetchData(idOrName, setData)
    }, [idOrName])
}
