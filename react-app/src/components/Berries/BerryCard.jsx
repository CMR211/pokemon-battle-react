import React from "react"
import { COLORS } from "../../utilities/COLORS"

export default function BerryCard({ berry }) {
    const colorsArray = Object.values(COLORS)
    const bgc = {
        "--bg-color": Object.keys(COLORS)
            .map((key) => COLORS[key])
            [Math.floor(Math.random() * 8)].replace("rgb(", "rgba(")
            .replace(")", ", 0.3)"),
    }
    return (
        <div className="berry" style={bgc}>
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
                    <div
                        key={flavor.name}
                        style={{
                            "--bg-color": colorsArray[index].replace("rgb(", "rgba(").replace(")", ",0.2)"),
                            "--width": (flavor.potency / 40) * 57.6 + "px",
                        }}>
                        <p>{flavor.name.toUpperCase()}</p>
                        <p>{flavor.potency}/40</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
