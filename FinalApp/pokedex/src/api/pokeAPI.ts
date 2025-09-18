import { Pokemon, PokemonListResponse, PokemonSpecies } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export class PokeAPIService {
  static async getPokemonList(limit: number = 151, offset: number = 0): Promise<Pokemon[]> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PokemonListResponse = await response.json();
      
      // Extract ID from URL and add to each Pokemon
      return data.results.map((pokemon, index) => ({
        ...pokemon,
        id: offset + index + 1,
      }));
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
      throw error;
    }
  }

  static async getPokemonDetails(id: number): Promise<Pokemon> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: Pokemon = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokemon details for ID ${id}:`, error);
      throw error;
    }
  }

  static async getPokemonSpecies(id: number): Promise<PokemonSpecies> {
    try {
      const response = await fetch(`${BASE_URL}/pokemon-species/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: PokemonSpecies = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching Pokemon species for ID ${id}:`, error);
      throw error;
    }
  }

  static async searchPokemon(query: string): Promise<Pokemon[]> {
    try {
      // For search, we'll fetch all Pokemon and filter locally
      // In a production app, you might want to implement server-side search
      const allPokemon = await this.getPokemonList(1010, 0); // Get all Pokemon
      return allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      console.error('Error searching Pokemon:', error);
      throw error;
    }
  }

  static getPokemonImageUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

  static getPokemonThumbnailUrl(id: number): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
  }

  static getBulbapediaUrl(pokemonName: string): string {
    // Handle special cases and format the name properly for Bulbapedia URLs
    let formattedName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    
    // Handle specific Pokemon name exceptions first
    const nameExceptions: { [key: string]: string } = {
      'nidoran-f': 'Nidoran♀',
      'nidoran-m': 'Nidoran♂', 
      'mr-mime': 'Mr. Mime',
      'farfetchd': "Farfetch'd",
      'ho-oh': 'Ho-Oh',
      'mime-jr': 'Mime Jr.',
      'porygon-z': 'Porygon-Z',
      'type-null': 'Type: Null',
      'jangmo-o': 'Jangmo-o',
      'hakamo-o': 'Hakamo-o',
      'kommo-o': 'Kommo-o'
    };
    
    // Check if this Pokemon has a special name format
    if (nameExceptions[pokemonName.toLowerCase()]) {
      formattedName = nameExceptions[pokemonName.toLowerCase()];
    }
    
    // Create the full URL and encode it properly
    const pageTitle = `${formattedName} (Pokémon)`;
    const encodedTitle = encodeURIComponent(pageTitle).replace(/'/g, '%27');
    
    return `https://bulbapedia.bulbagarden.net/wiki/${encodedTitle}`;
  }
}
