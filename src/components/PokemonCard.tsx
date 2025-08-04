import React from 'react';
import { Pokemon } from '../types/pokemon';
import { 
  formatPokemonId, 
  formatPokemonName, 
  getTypeNameInJapanese, 
  getTypeColor 
} from '../utils/pokemonUtils';
import './PokemonCard.css';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(pokemon);
    }
  };

  return (
    <div 
      className="pokemon-card" 
      onClick={handleClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <div className="pokemon-card-header">
        <span className="pokemon-id">{formatPokemonId(pokemon.id)}</span>
      </div>
      
      <div className="pokemon-image-container">
        <img 
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default} 
          alt={pokemon.name}
          className="pokemon-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = pokemon.sprites.front_default;
          }}
        />
      </div>
      
      <div className="pokemon-info">
        <h3 className="pokemon-name">{formatPokemonName(pokemon.name)}</h3>
        
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => (
            <span
              key={index}
              className="pokemon-type"
              style={{ backgroundColor: getTypeColor(type.type.name) }}
            >
              {getTypeNameInJapanese(type.type.name)}
            </span>
          ))}
        </div>
        
        <div className="pokemon-stats">
          <div className="stat-item">
            <span className="stat-label">HP</span>
            <span className="stat-value">{pokemon.stats.find(s => s.stat.name === 'hp')?.base_stat || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">攻撃</span>
            <span className="stat-value">{pokemon.stats.find(s => s.stat.name === 'attack')?.base_stat || 0}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">防御</span>
            <span className="stat-value">{pokemon.stats.find(s => s.stat.name === 'defense')?.base_stat || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 