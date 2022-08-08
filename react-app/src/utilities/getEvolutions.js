export default function getEvolutions(pokemonEvolutionData) {
    // No evolutions
    if (pokemonEvolutionData.chain.evolves_to.length === 0) {
        return ["none", "none"]
    }
    // At least single evolution spotted
    if (pokemonEvolutionData.chain.evolves_to.length > 0) {
        const primaryEvolution = {
            base: {
                name: pokemonEvolutionData.chain.species.name,
                url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                id: parseInt(pokemonEvolutionData.chain.species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")),
            },
            target: {
                name: pokemonEvolutionData.chain.evolves_to[0].species.name,
                url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                id: parseInt(pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")),
            },
            level: pokemonEvolutionData.chain.evolves_to[0].evolution_details[0].min_level,
        }

        // If no further evolutions return
        if (pokemonEvolutionData.chain.evolves_to[0].evolves_to.length === 0) {
            return [primaryEvolution, "none"]
        }

        // If second evolution spotted
        if (pokemonEvolutionData.chain.evolves_to[0].evolves_to.length > 0) {
            const secondaryEvolution = {
                base: {
                    name: pokemonEvolutionData.chain.evolves_to[0].species.name,
                    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                    id: parseInt(pokemonEvolutionData.chain.evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")),
                },
                target: {
                    name: pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].species.name,
                    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", ".png"),
                    id: parseInt(pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].species.url.replace("https://pokeapi.co/api/v2/pokemon-species/", "").replace("/", "")),
                },
                level: pokemonEvolutionData.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level,
            }
            return [primaryEvolution, secondaryEvolution]
        }
    }
}
