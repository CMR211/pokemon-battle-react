// Libraries
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Components
import BaseNav from "../Nav/BaseNav"
import GamePanel from "./GamePanel"

// JSON data
import gamesData from "../../json/games.json"

// Icons
import IconLoader from "../../icons/IconLoader"

export default function GameIndices({ history, setHistory }) {
    // State for current game panel display
    const [panel, setPanel] = useState(0)
    // State for animation direction
    const [direction, setDirection] = useState(1)
    // Game panels navigation
    const handlers = {
        previousGame: panel === 0 ? " " : gamesData[panel - 1].title.replace("Pokémon", ""),
        nextGame: panel === gamesData.length - 1 ? " " : gamesData[panel + 1].title.replace("Pokémon", ""),
        prev: () => {
            if (panel === 0) return
            setDirection(-1)
            setPanel((panel) => panel - 1)
        },
        next: () => {
            if (panel === gamesData.length - 1) return
            setDirection(1)
            setPanel((panel) => panel + 1)
        },
    }

    if (gamesData === null) return <IconLoader />
    return (
        <AnimatePresence >
            <motion.div
                className="game-indices"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}>
                <BaseNav history={history} setHistory={setHistory} currentLocation="/gameindices" />
                <div className="game-indices__gnav-cont">
                    <button onClick={handlers.prev} className="game-indices__gnav-btn">
                        <span>Previous</span>
                        <motion.span initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={handlers.previousGame}>
                            {handlers.previousGame}
                        </motion.span>
                    </button>
                    <button onClick={handlers.next} className="game-indices__gnav-btn">
                        <span>Next</span>
                        <motion.span initial={{ y: 5, opacity: 0 }} animate={{ y: 0, opacity: 1 }} key={handlers.nextGame}>
                            {handlers.nextGame}
                        </motion.span>
                    </button>
                </div>
                <div className="game-indices__container">
                    
                            <AnimatePresence mode="wait">
                                <GamePanel direction={direction} key={panel} panel={panel} game={gamesData} index={panel} />
                            </AnimatePresence>
                        
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
