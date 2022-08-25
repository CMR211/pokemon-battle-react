import React from "react"

export default function BerryCard({ berry }) {
    return (
        <div className="berry">
            <img className="berry__img" src={berry.sprite} alt={berry.name} />
            <div className="berry__info">
                <h2>{berry.name}</h2>
                <p>{berry.flavor_text}</p>
                <p>Firmness: {berry.firmness}</p>
            </div>
            <div className="berry__flavors">
                {berry.flavors.map((flavor) => (
                    <div>
                        <p key={flavor + "1"}>{flavor.name}</p>
                        <p key={flavor + "2"}>{flavor.potency}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
