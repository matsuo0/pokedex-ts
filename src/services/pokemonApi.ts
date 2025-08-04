import axios from 'axios';
import { Pokemon, PokemonListResponse, ApiError } from '../types/pokemon';

const BASE_URL = 'https://pokeapi.co/api/v2';

// APIクライアントの作成
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

// エラーハンドリング用のヘルパー関数
const handleApiError = (error: any): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
    };
  }
  return {
    message: '予期しないエラーが発生しました',
  };
};

// ポケモン一覧を取得する関数
export const getPokemonList = async (limit: number = 20, offset: number = 0): Promise<PokemonListResponse> => {
  try {
    const response = await apiClient.get<PokemonListResponse>(`/pokemon?limit=${limit}&offset=${offset}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 特定のポケモンの詳細情報を取得する関数
export const getPokemonDetail = async (nameOrId: string | number): Promise<Pokemon> => {
  try {
    const response = await apiClient.get<Pokemon>(`/pokemon/${nameOrId}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// ポケモンを名前で検索する関数
export const searchPokemon = async (name: string): Promise<Pokemon> => {
  try {
    const response = await apiClient.get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

// 複数のポケモンを並行して取得する関数
export const getMultiplePokemon = async (namesOrIds: (string | number)[]): Promise<Pokemon[]> => {
  try {
    const promises = namesOrIds.map(id => getPokemonDetail(id));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    throw handleApiError(error);
  }
}; 