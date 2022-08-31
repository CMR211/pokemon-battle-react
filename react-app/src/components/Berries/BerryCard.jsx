import React from "react"
import { COLORS } from "../../utilities/COLORS"

export default function BerryCard({ berry }) {
    // Getting colors array from colors object
    const colorsArray = Object.values(COLORS)

    // Random card main background color
    const cardBackgroundColor = {
        "--bg-color": Object.keys(COLORS)
            .map((key) => COLORS[key])
            [Math.floor(Math.random() * 8)].replace("rgb(", "rgba(")
            .replace(")", ", 0.3)"),
    }

    // Returns each flavor background color and width of the flavor bar based on its potency
    function flavorsBackgroundColor(flavor, index) {
        return {
            "--bg-color": colorsArray[index].replace("rgb(", "rgba(").replace(")", ",0.2)"),
            "--width": (flavor.potency / 40) * 57.6 + "px",
        }
    }

    return (
        <div className="berry" style={cardBackgroundColor}>
            <div className="berry__container">
                <div className="berry__img-c">
                    <img className="berry__img" src={berry.sprite} alt={berry.name} />
                </div>
                <div className="berry__info">
                    <h2>{berry.name}</h2>
                    <p>{berry.flavor_text}</p>
                    <p className="berry__info__firmness">Firmness: {berry.firmness}</p>
                </div>
            </div>
            <div className="berry__flavors">
                {berry.flavors.map((flavor, index) => (
                    <div key={flavor.name} style={flavorsBackgroundColor(flavor, index)}>
                        <p>{flavor.name.toUpperCase()}</p>
                        <p>{flavor.potency}/40</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
