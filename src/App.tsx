import React, { useState } from 'react';
import './App.css';
import PokemonCard from './components/PokemonCard';
import SearchBar from './components/SearchBar';
import { usePokemonList, usePokemonSearch } from './hooks/usePokemon';
import { Pokemon } from './types/pokemon';

function App() {
  const [searchMode, setSearchMode] = useState(false);
  const { pokemonList, loading, error, hasMore, loadMore } = usePokemonList(20);
  const { searchResults, loading: searchLoading, error: searchError, searchPokemonByName } = usePokemonSearch();

  const handleSearch = (searchTerm: string) => {
    if (searchTerm.trim()) {
      setSearchMode(true);
      searchPokemonByName(searchTerm);
    } else {
      setSearchMode(false);
    }
  };

  const handlePokemonClick = (pokemon: Pokemon) => {
    console.log('Selected Pokemon:', pokemon);
    // ここで詳細モーダルを開くなどの処理を追加できます
  };

  const displayPokemon = searchMode ? searchResults : pokemonList;
  const displayLoading = searchMode ? searchLoading : loading;
  const displayError = searchMode ? searchError : error;

  return (
    <div className="App">
      <header className="App-header">
        <h1>ポケモン図鑑</h1>
        <p>TypeScript学習用アプリ</p>
      </header>

      <main className="App-main">
        <SearchBar 
          onSearch={handleSearch}
          loading={searchLoading === 'loading'}
        />

        {displayError && (
          <div className="error-message">
            <p>エラーが発生しました: {displayError.message}</p>
            <button onClick={() => window.location.reload()}>
              再読み込み
            </button>
          </div>
        )}

        {displayLoading && displayPokemon.length === 0 && (
          <div className="loading-container">
            <div className="loading-spinner-large"></div>
            <p>ポケモンを読み込み中...</p>
          </div>
        )}

        {!displayLoading && displayPokemon.length === 0 && !displayError && (
          <div className="no-results">
            <p>ポケモンが見つかりませんでした</p>
          </div>
        )}

        {displayPokemon.length > 0 && (
          <div className="pokemon-grid">
            {displayPokemon.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
                onClick={handlePokemonClick}
              />
            ))}
          </div>
        )}

        {!searchMode && hasMore && !displayLoading && (
          <div className="load-more-container">
            <button 
              onClick={loadMore}
              className="load-more-button"
              disabled={displayLoading}
            >
              {displayLoading ? '読み込み中...' : 'もっと見る'}
            </button>
          </div>
        )}

        {displayLoading && displayPokemon.length > 0 && (
          <div className="loading-more">
            <div className="loading-spinner-small"></div>
            <p>追加のポケモンを読み込み中...</p>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2024 ポケモン図鑑 - TypeScript学習プロジェクト</p>
      </footer>
    </div>
  );
}

export default App;
