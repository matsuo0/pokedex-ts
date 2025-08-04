import { Pokemon } from '../types/pokemon';

// ポケモンの種別名を日本語に変換するマップ
export const typeNameMap: Record<string, string> = {
  normal: 'ノーマル',
  fire: 'ほのお',
  water: 'みず',
  electric: 'でんき',
  grass: 'くさ',
  ice: 'こおり',
  fighting: 'かくとう',
  poison: 'どく',
  ground: 'じめん',
  flying: 'ひこう',
  psychic: 'エスパー',
  bug: 'むし',
  rock: 'いわ',
  ghost: 'ゴースト',
  dragon: 'ドラゴン',
  dark: 'あく',
  steel: 'はがね',
  fairy: 'フェアリー',
};

// ポケモンの種別名を日本語に変換する関数
export const getTypeNameInJapanese = (typeName: string): string => {
  return typeNameMap[typeName.toLowerCase()] || typeName;
};

// ポケモンの種別に応じた色を取得する関数
export const getTypeColor = (typeName: string): string => {
  const colorMap: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };
  
  return colorMap[typeName.toLowerCase()] || '#777777';
};

// ポケモンの身長をメートル単位で表示する関数
export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1)}m`;
};

// ポケモンの体重をキログラム単位で表示する関数
export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1)}kg`;
};

// ポケモンの統計情報を取得する関数
export const getStatValue = (pokemon: Pokemon, statName: string): number => {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat?.base_stat || 0;
};

// ポケモンの統計情報名を日本語に変換する関数
export const getStatNameInJapanese = (statName: string): string => {
  const statNameMap: Record<string, string> = {
    hp: 'HP',
    attack: '攻撃',
    defense: '防御',
    'special-attack': '特攻',
    'special-defense': '特防',
    speed: '素早さ',
  };
  
  return statNameMap[statName] || statName;
};

// ポケモンの統計情報の最大値を取得する関数
export const getMaxStatValue = (statName: string): number => {
  const maxStats: Record<string, number> = {
    hp: 255,
    attack: 190,
    defense: 230,
    'special-attack': 194,
    'special-defense': 230,
    speed: 200,
  };
  
  return maxStats[statName] || 255;
};

// ポケモンの統計情報のパーセンテージを計算する関数
export const getStatPercentage = (pokemon: Pokemon, statName: string): number => {
  const currentStat = getStatValue(pokemon, statName);
  const maxStat = getMaxStatValue(statName);
  return (currentStat / maxStat) * 100;
};

// ポケモンのIDをゼロパディングして表示する関数
export const formatPokemonId = (id: number): string => {
  return `#${id.toString().padStart(3, '0')}`;
};

// ポケモンの名前を最初の文字を大文字にして表示する関数
export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

// ポケモンの能力名を日本語に変換する関数
export const getAbilityNameInJapanese = (abilityName: string): string => {
  const abilityNameMap: Record<string, string> = {
    'static': 'せいでんき',
    'lightning-rod': 'ひらいしん',
    'compound-eyes': 'ふくがん',
    'swarm': 'むしのしらせ',
    'keen-eye': 'するどいめ',
    'hyper-cutter': 'かいりきバサミ',
    'pickup': 'ものひろい',
    'truant': 'なまけ',
    'hustle': 'はりきり',
    'pressure': 'プレッシャー',
    'limber': 'じゅうなん',
    'sand-veil': 'すながくれ',
    'volt-absorb': 'ちくでん',
    'water-absorb': 'ちょすい',
    'oblivious': 'どんかん',
    'cloud-nine': 'エアロック',
    'insomnia': 'ふみん',
    'color-change': 'へんしょく',
    'immunity': 'めんえき',
    'flash-fire': 'もらいび',
    'shield-dust': 'りんぷん',
    'own-tempo': 'マイペース',
    'suction-cups': 'きゅうばん',
    'intimidate': 'いかく',
    'shadow-tag': 'かげふみ',
    'rough-skin': 'さめはだ',
    'wonder-guard': 'ふしぎなまもり',
    'levitate': 'ふゆう',
    'effect-spore': 'ほうし',
    'synchronize': 'シンクロ',
    'clear-body': 'クリアボディ',
    'natural-cure': 'しぜんかいふく',
    'serene-grace': 'てんのめぐみ',
    'swift-swim': 'すいすい',
    'chlorophyll': 'ようりょくそ',
    'illuminate': 'はっこう',
    'trace': 'トレース',
    'huge-power': 'ちからもち',
    'poison-point': 'どくのトゲ',
    'inner-focus': 'せいしんりょく',
    'magma-armor': 'マグマのよろい',
    'water-veil': 'ちょすい',
    'magnet-pull': 'じりょく',
    'soundproof': 'ぼうおん',
    'rain-dish': 'あめうけざら',
    'sand-stream': 'すなおこし',
    'thick-fat': 'あついしぼう',
    'early-bird': 'はやおき',
    'flame-body': 'ほのおのからだ',
    'run-away': 'にげあし',
  };
  
  return abilityNameMap[abilityName.toLowerCase()] || abilityName;
}; 