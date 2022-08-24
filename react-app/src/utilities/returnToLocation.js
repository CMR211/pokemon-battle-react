export function returnToLocation(navigate, history, setHistory) {
    navigate(history[history.length - 1])
    setHistory((prev) => [...prev.slice(0, -1)])
}
