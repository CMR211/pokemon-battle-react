import React from "react"
import axios from "axios"

export default function usePokemonSpeciesEndpoint(idOrName, setData) {
    React.useEffect(
        () => async () => {

            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${idOrName}/`, {
                headers: {},
                params: {},
            })
            setData(data)

        },
        []
    )
}
