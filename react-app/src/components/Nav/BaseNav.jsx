import React from "react"
import { useNavigate } from "react-router-dom"

import { goToLocation } from "../../utilities/goToLocation"
import { returnToLocation } from "../../utilities/returnToLocation"

import IconHome from "../../icons/IconHome"
import IconReturn from "../../icons/IconReturn"

export default function BaseNav({ history, setHistory, currentLocation }) {
    const navigate = useNavigate()
    const currentClass = "nav"
    function goToHome() {
        goToLocation("/", currentLocation, setHistory, navigate)
    }
    return (
        <div className={`${currentClass}`}>
            <button
                className={`${currentClass}__button--return ${currentClass}__button`}
                onClick={() => returnToLocation(navigate, history, setHistory)}>
                <IconReturn />
            </button>
            <button className={`${currentClass}__button--home ${currentClass}__button`} onClick={goToHome}>
                <IconHome />
            </button>
        </div>
    )
}
