import React from "react"
import axios from "axios"

export default function usePokemonEndpoint(idOrName, setData) {
    React.useEffect(
        () => async () => {
            let ignore = false

            const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}/`, {
                headers: {},
                params: {},
            })
            if (!ignore) {
                setData(data)
            }
            return () => {
                ignore = true
            }
        },
        [idOrName]
    )
}
