import {useEffect} from "react"
import axios from "axios"

export default function usePokemonSpeciesEndpoint(idOrName, setData, setEvoData) {
    useEffect(
        () => async () => {
            //
            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}/`, {
                headers: {},
                params: {},
            })
            setData(data)
            //
            const evoData = await axios.get(data.evolution_chain.url, {
                headers: {},
                params: {},
            })
            setEvoData(evoData.data)
        },
        [idOrName]
    )
}
