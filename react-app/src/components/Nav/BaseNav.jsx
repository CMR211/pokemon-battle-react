// Libraries
import React from "react"
import { useNavigate } from "react-router-dom"

// Utilities
import { goToLocation } from "../../utilities/goToLocation"
import { returnToLocation } from "../../utilities/returnToLocation"

// Icons
import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"

export default function BaseNav({ history, setHistory, currentLocation }) {
    // Legacy class changer
    const currentClass = "nav"

    // Navigation handlers
    const navigate = useNavigate()
    function goToHome() {
        goToLocation("/", currentLocation, setHistory, navigate)
    }
    function goToPrevious() {
        returnToLocation(navigate, history, setHistory)
    }

    return (
        <div className={`${currentClass}`}>
            <button className={`${currentClass}__button--return ${currentClass}__button`} onClick={goToPrevious}>
                <IconReturn />
            </button>
            <button className={`${currentClass}__button--home ${currentClass}__button`} onClick={goToHome}>
                <IconHome />
            </button>
        </div>
    )
}
