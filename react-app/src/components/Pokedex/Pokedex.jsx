import { useState } from "react"
import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"
import { COLORS } from "../../utilities/COLORS"

export default function Pokedex() {
    const initialState = new Array(20).fill({
        name: "Temp",
        id: 123,
        img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png",
        bg: "yellow",
    })
    const [pokemons, setPokemons] = useState(initialState)
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
            </div>
        </div>
    )
}
