import React from "react"
import { useNavigate } from "react-router-dom"
import { COLORS } from "../../utilities/COLORS"
import { goToLocation } from "../../utilities/goToLocation"

export default function HomeButton({ text, goto, color, history, setHistory }) {
    const bgcolor = COLORS[color]

    const navigate = useNavigate()

    function handleClick() {
        return goToLocation(goto, "/", setHistory, navigate)
    }

    return (
        <button style={{ "--bg-color": bgcolor }} onClick={handleClick} className="main-button">
            {text}
        </button>
    )
}
