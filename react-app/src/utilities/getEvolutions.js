export default function getEvolutions(pokemonEvolutionData) {
    // No evolutions
    if (pokemonEvolutionData.chain.evolves_to.length === 0) {
        console.log("Returning at none none")
        return ["none", "none"]
    }
    // At least single evolution spotted
    if (pokemonEvolutionData.chain.evolves_to.length > 0) {
        const evolutionBase = {
            base: pokemonEvolutionData.chain.species.name,
            baseUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
            target: pokemonEvolutionData.chain.evolves_to[0].species.name,
            level: pokemonEvolutionData.chain.evolves_to[0].evolution_details[0].min_level,
            targetUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
        }

        // If no further evolutions return
        if (pokemonEvolutionData.chain.evolves_to[0].evolves_to.length === 0) {
            console.log("Returning at first none")
            return [evolutionBase, "none"]
        }
        // console.log("1", evolutionBase)

        // If second evolution spotted
        if (pokemonEvolutionData.chain.evolves_to[0].evolves_to.length > 0) {
            const evolutionNext = {
                base: pokemonEvolutionData.chain.evolves_to[0].species.name,
                baseUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                target: pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
                targetUrl: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                level: pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
            }
            console.log("Returning at 1st 2nd")
            return [evolutionBase, evolutionNext]
        }
    }
}
