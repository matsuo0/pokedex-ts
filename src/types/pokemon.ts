// ポケモンの基本情報の型定義
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    front_shiny: string;
    back_default: string;
    back_shiny: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  abilities: Array<{
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }>;
}

// ポケモン一覧の型定義
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// ポケモン種別の型定義
export interface PokemonType {
  name: string;
  url: string;
}

// APIエラーの型定義
export interface ApiError {
  message: string;
  status?: number;
}

// ローディング状態の型定義
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'; 