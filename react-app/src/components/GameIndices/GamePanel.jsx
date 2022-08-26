import { motion } from "framer-motion"
import React from "react"

export default function GamePanel({ panel, game, index, direction }) {
    return (
        <motion.div
            initial={{ x: 400 * direction,  }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ease: "easeOut", duration:0.2}}
            exit={{ opacity:0 }}
            className={`game-indices__gen game-indices__gen--${index + 1}`}>
            <p className="game-indices__gen__gen">Generation {game[panel].gen}</p>
            <h2 className="game-indices__gen__title">{game[panel].title}</h2>
            <div className="game-indices__gen__img-c">
                {game[panel].imgs.map((img) => {
                    return <img className="game-indices__gen__img-i" src={img} alt={img} />
                })}
            </div>
            <h3>History</h3>
            {game[panel].text.map((parapgraph) => {
                return <p className="game-indices__gen__p">{parapgraph}</p>
            })}
            <div className="game-indices__gen__img2-c">
                <img className="game-indices__gen__img2-i" src={game[panel].title_screen} alt="title screen" />
                <p>Game title screen</p>
            </div>
            <h3>Reception</h3>
            <p className="game-indices__gen__p">{game[panel].reception}</p>
        </motion.div>
    )
}
