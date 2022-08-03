export default function pokemonHeight(number) {
    const imperial = Math.round(((number * 10) / 2.54 / 12) * 10) / 10
    const metric = Math.round(number * 10) / 100
    return `${metric} m / ${imperial} ft`
}
