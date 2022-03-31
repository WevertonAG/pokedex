const ids = [];
for(let j = 1; j < 899; j++ ){
    if (j< 10){
        ids.push(`00${j}`)
    }else if (j<100){
        ids.push(`0${j}`)
    }else{
        ids.push(j)
    }
}

const fetchPokemon = () =>{
    const getPokemonUrl = id =>`https://pokeapi.co/api/v2/pokemon/${id}`
    const pokemonPromises =[]
    
    for (let i = 1; i<=898; i++){
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))
    }
    Promise.all(pokemonPromises).then(pokemons => {
        let d= -1
        const lisPokemons = pokemons.reduce((accumulator, pokemon)=>{
            const types = pokemon.types.map(typeInfo => typeInfo.type.name)
            accumulator += `
                <li class ="card">
                <img class="card-image ${types[0]}" alt="${name}"
                    src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/${ids[d+=1]}.png"/>
                    
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class="card-subtitle">${types.join(' | ')}</p>
                </li>
            `
            return accumulator
        },'')

        const ul = document.querySelector('[data-js="pokedex"]')
        console.log(ul)
        ul.innerHTML = lisPokemons

    })
}
fetchPokemon()

// refatorar o código usando axios

