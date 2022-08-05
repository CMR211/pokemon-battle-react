import React from "react"
import axios from "axios"

export default function usePokemonEvolutionEndpoint(evolutionURL, setData) {
    React.useEffect(
        () => async () => {
            const { data } = await axios.get(evolutionURL, {
                headers: {},
                params: {},
            })
            setData(data)
        },
        []
    )
}
