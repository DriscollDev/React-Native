export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites?: {
    front_default: string;
    other?: {
      'official-artwork'?: {
        front_default: string;
      };
    };
  };
  types?: PokemonType[];
  abilities?: PokemonAbility[];
  height?: number;
  weight?: number;
  stats?: PokemonStat[];
  species?: {
    name: string;
    url: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface PokemonSpecies {
  name: string;
  url: string;
  evolution_chain?: {
    url: string;
  };
  flavor_text_entries?: Array<{
    flavor_text: string;
    language: {
      name: string;
    };
  }>;
}

export interface TypeColors {
  [key: string]: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  PokemonDetail: { pokemon: Pokemon };
};

export type MainTabParamList = {
  Pokedex: undefined;
  Favorites: undefined;
};

export type PokedexStackParamList = {
  PokedexList: undefined;
  PokemonDetail: { pokemon: Pokemon };
};

export type FavoritesStackParamList = {
  PokedexList: undefined;
  PokemonDetail: { pokemon: Pokemon };
};
