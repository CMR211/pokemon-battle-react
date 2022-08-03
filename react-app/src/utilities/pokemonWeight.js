export default function pokemonWeight(number) {
    const imperial = Math.round(number / 0.453592) / 10
    const metric = Math.round(number * 10) / 100
    return `${metric} kg / ${imperial} lbs`
}
