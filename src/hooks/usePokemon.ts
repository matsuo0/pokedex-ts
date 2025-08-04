import { useState, useEffect, useCallback } from 'react';
import { Pokemon, PokemonListResponse, LoadingState, ApiError } from '../types/pokemon';
import { getPokemonList, getPokemonDetail, searchPokemon } from '../services/pokemonApi';

// ポケモン一覧の状態管理
export const usePokemonList = (limit: number = 20) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  // ポケモン一覧を取得する関数
  const fetchPokemonList = useCallback(async (newOffset: number = 0) => {
    try {
      setLoading('loading');
      setError(null);
      
      const response: PokemonListResponse = await getPokemonList(limit, newOffset);
      
      // 各ポケモンの詳細情報を取得
      const pokemonDetails = await Promise.all(
        response.results.map(async (pokemon) => {
          const id = pokemon.url.split('/').slice(-2)[0];
          return await getPokemonDetail(id);
        })
      );
      
      if (newOffset === 0) {
        setPokemonList(pokemonDetails);
      } else {
        setPokemonList(prev => [...prev, ...pokemonDetails]);
      }
      
      setOffset(newOffset + limit);
      setHasMore(response.next !== null);
      setLoading('success');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      setLoading('error');
    }
  }, [limit]);

  // 初期データの読み込み
  useEffect(() => {
    fetchPokemonList();
  }, [fetchPokemonList]);

  // 次のページを読み込む関数
  const loadMore = useCallback(() => {
    if (hasMore && loading !== 'loading') {
      fetchPokemonList(offset);
    }
  }, [hasMore, loading, offset, fetchPokemonList]);

  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    refetch: () => fetchPokemonList(0),
  };
};

// 個別ポケモンの状態管理
export const usePokemonDetail = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);

  const fetchPokemonDetail = useCallback(async (nameOrId: string | number) => {
    try {
      setLoading('loading');
      setError(null);
      
      const pokemonData = await getPokemonDetail(nameOrId);
      setPokemon(pokemonData);
      setLoading('success');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      setLoading('error');
    }
  }, []);

  return {
    pokemon,
    loading,
    error,
    fetchPokemonDetail,
  };
};

// ポケモン検索の状態管理
export const usePokemonSearch = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);

  const searchPokemonByName = useCallback(async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setLoading('idle');
      return;
    }

    try {
      setLoading('loading');
      setError(null);
      
      const pokemon = await searchPokemon(searchTerm);
      setSearchResults([pokemon]);
      setLoading('success');
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError);
      setLoading('error');
      setSearchResults([]);
    }
  }, []);

  return {
    searchResults,
    loading,
    error,
    searchPokemonByName,
  };
}; 