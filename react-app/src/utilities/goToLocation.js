export function goToLocation(targetLocation, currentLocation, setHistory, navigate) {
    setHistory((prev) => [...prev, currentLocation])
    navigate(targetLocation)
    console.log(currentLocation, " -> ", targetLocation)
}
