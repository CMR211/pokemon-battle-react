import { useState, useEffect } from "react"
import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"
import { COLORS } from "../../utilities/COLORS"
import InfiniteScroll from "react-infinite-scroller"
import axios from "axios"

export default function Pokedex() {
    const initialState = new Array(20).fill({
        name: "Temp",
        url: 123,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
        bg: "yellow",
    })

    const [pokemons, setPokemons] = useState([])
    const [nextPage, setNextPage] = useState("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")

    const fetchData = async (url) => {
        const { data } = await axios.get(url)
        const newPokemons = data.results.map((pokemon) => {
            // https://pokeapi.co/api/v2/pokemon/6/
            const id = pokemon.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")
            return {
                id: id,
                name: pokemon.name,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
            }
        })
        setPokemons((prev) => {
            const ids = prev.map((i) => i.id)
            const toAdd = newPokemons.filter((newPokemon) => !ids.includes(newPokemon.id))
            return [...prev, ...toAdd]
        })
        setNextPage(data.next)
    }

    // useEffect(() => {}, [pokemons])

    return (
        <div className="pokedex">
            <div className="pokedex__nav">
                <button className="pokedex__nav__button--return pokedex__nav__button">
                    <IconReturn />
                </button>
                <button className="pokedex__nav__button--home pokedex__nav__button" onClick={() => {}}>
                    <IconHome />
                </button>
            </div>
            <div className="pokedex__list">
                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => fetchData(nextPage)}
                    hasMore={nextPage === null ? false : true}
                    loader={
                        <div className="loader" key={0}>
                            Loading ...
                        </div>
                    }
                    useWindow={false}>
                    {pokemons.map((pokemon) => {
                        return (
                            <div className="pokedex__pokemon" style={{ "--bg-color": COLORS[pokemon.bg] }}>
                                <div className="pokedex__pokemon__img-c">
                                    <img className="pokedex__pokemon__img-i" alt={pokemon.name} src={pokemon.img} />
                                </div>
                                <p className="pokedex__pokemon__name">{pokemon.name}</p>
                                <p className="pokedex__pokemon__id">{pokemon.id}</p>
                            </div>
                        )
                    })}
                </InfiniteScroll>
            </div>
        </div>
    )
}
