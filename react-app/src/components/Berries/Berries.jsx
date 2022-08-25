import { useState } from "react"
import { motion } from "framer-motion"

import IconLoader from "../../icons/IconLoader"

import useBerries from "../../utilities/useBerries"
import BaseNav from "../Nav/BaseNav"
import BerryCard from "./BerryCard"

export default function Berries({ history, setHistory }) {
    const [berries, setBerries] = useState(null)
    useBerries(setBerries)

    if (berries === null) return <IconLoader />
    return (
        <motion.div
            className="berries"
            key="berries"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}>
            <BaseNav history={history} setHistory={setHistory} currentLocation="/berries" />
            <div>
                <h1>Berries</h1>
                {berries.map((berry) => (
                    <BerryCard berry={berry} key={berry.name} />
                ))}
            </div>
        </motion.div>
    )
}
