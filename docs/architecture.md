# ポケモン図鑑アプリ アーキテクチャ設計

## 概要

TypeScript学習用ポケモン図鑑アプリケーションのアーキテクチャ設計ドキュメントです。

## 技術スタック

### フロントエンド
- **React 18**: UIライブラリ
- **TypeScript**: 型安全性
- **CSS3**: スタイリング

### 外部ライブラリ
- **Axios**: HTTP通信

### API
- **PokeAPI**: ポケモンデータ取得

## アーキテクチャ図

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                       │
├─────────────────────────────────────────────────────────────┤
│  App.tsx                                                   │
│  ├── SearchBar.tsx                                         │
│  ├── PokemonCard.tsx                                       │
│  └── App.css                                               │
├─────────────────────────────────────────────────────────────┤
│                    Business Logic Layer                     │
├─────────────────────────────────────────────────────────────┤
│  hooks/                                                    │
│  ├── usePokemon.ts                                         │
│  │   ├── usePokemonList                                    │
│  │   ├── usePokemonDetail                                  │
│  │   └── usePokemonSearch                                  │
│  └── utils/                                                │
│      └── pokemonUtils.ts                                   │
├─────────────────────────────────────────────────────────────┤
│                    Data Access Layer                       │
├─────────────────────────────────────────────────────────────┤
│  services/                                                 │
│  └── pokemonApi.ts                                         │
├─────────────────────────────────────────────────────────────┤
│                    Type Definitions                        │
├─────────────────────────────────────────────────────────────┤
│  types/                                                    │
│  └── pokemon.ts                                            │
└─────────────────────────────────────────────────────────────┘
```

## レイヤー詳細

### 1. Presentation Layer（プレゼンテーション層）

**責任**: UIの表示とユーザーインタラクション

#### コンポーネント構成

##### App.tsx（メインコンポーネント）
```typescript
interface AppState {
  searchMode: boolean;
}

interface AppProps {
  // なし（ルートコンポーネント）
}
```

**責任**:
- アプリケーション全体の状態管理
- コンポーネント間のデータフロー制御
- エラーハンドリングの統合

##### SearchBar.tsx（検索コンポーネント）
```typescript
interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string;
  loading?: boolean;
}
```

**責任**:
- 検索入力の処理
- デバウンス機能
- ローディング状態の表示

##### PokemonCard.tsx（ポケモンカードコンポーネント）
```typescript
interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}
```

**責任**:
- ポケモン情報の表示
- クリックイベントの処理
- レスポンシブデザイン

### 2. Business Logic Layer（ビジネスロジック層）

**責任**: アプリケーションのビジネスロジックと状態管理

#### カスタムフック

##### usePokemon.ts
```typescript
// ポケモン一覧の状態管理
export const usePokemonList = (limit: number = 20) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  
  // ビジネスロジック
  const fetchPokemonList = useCallback(async (newOffset: number = 0) => {
    // API呼び出しと状態更新
  }, [limit]);
  
  return {
    pokemonList,
    loading,
    error,
    hasMore,
    loadMore,
    refetch,
  };
};
```

**責任**:
- データの状態管理
- ビジネスロジックの実装
- エラーハンドリング

#### ユーティリティ関数

##### pokemonUtils.ts
```typescript
// 種別名の日本語変換
export const getTypeNameInJapanese = (typeName: string): string => {
  return typeNameMap[typeName.toLowerCase()] || typeName;
};

// 統計情報の計算
export const getStatPercentage = (pokemon: Pokemon, statName: string): number => {
  const currentStat = getStatValue(pokemon, statName);
  const maxStat = getMaxStatValue(statName);
  return (currentStat / maxStat) * 100;
};
```

**責任**:
- データ変換ロジック
- 計算ロジック
- フォーマット処理

### 3. Data Access Layer（データアクセス層）

**責任**: 外部APIとの通信

#### APIサービス

##### pokemonApi.ts
```typescript
// APIクライアントの設定
const apiClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  timeout: 10000,
});

// ポケモン一覧取得
export const getPokemonList = async (
  limit: number = 20, 
  offset: number = 0
): Promise<PokemonListResponse> => {
  try {
    const response = await apiClient.get<PokemonListResponse>(
      `/pokemon?limit=${limit}&offset=${offset}`
    );
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};
```

**責任**:
- HTTP通信の管理
- エラーハンドリング
- レスポンスデータの型安全性確保

### 4. Type Definitions（型定義層）

**責任**: アプリケーション全体の型定義

#### 型定義

##### pokemon.ts
```typescript
// ポケモンの基本情報
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
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

// APIレスポンス型
export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{
    name: string;
    url: string;
  }>;
}

// エラー型
export interface ApiError {
  message: string;
  status?: number;
}

// ローディング状態型
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

**責任**:
- 型安全性の確保
- インターフェースの定義
- 型の再利用性

## データフロー

### 1. 初期データ読み込み

```
1. App.tsx マウント
   ↓
2. usePokemonList フック実行
   ↓
3. pokemonApi.getPokemonList() 呼び出し
   ↓
4. PokeAPI からデータ取得
   ↓
5. 各ポケモンの詳細情報を並行取得
   ↓
6. PokemonCard コンポーネントで表示
```

### 2. 検索機能

```
1. ユーザーが検索バーに入力
   ↓
2. SearchBar コンポーネントでデバウンス処理
   ↓
3. usePokemonSearch フック実行
   ↓
4. pokemonApi.searchPokemon() 呼び出し
   ↓
5. 検索結果を PokemonCard で表示
```

### 3. 無限スクロール

```
1. ユーザーが「もっと見る」ボタンをクリック
   ↓
2. usePokemonList.loadMore() 実行
   ↓
3. pokemonApi.getPokemonList() で追加データ取得
   ↓
4. 既存データに新しいデータを追加
   ↓
5. 追加のポケモンカードを表示
```

## 設計原則

### 1. 関心の分離（Separation of Concerns）

- **プレゼンテーション層**: UI表示のみ
- **ビジネスロジック層**: アプリケーションロジック
- **データアクセス層**: API通信のみ
- **型定義層**: 型安全性の確保

### 2. 単一責任原則（Single Responsibility Principle）

各コンポーネント・フック・サービスは一つの責任のみを持つ

### 3. 依存性注入（Dependency Injection）

```typescript
// 良い例：依存性を注入
const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  // コンポーネントの実装
};

// 悪い例：直接依存
const PokemonCard = () => {
  const pokemon = fetchPokemon(); // 直接API呼び出し
};
```

### 4. 型安全性（Type Safety）

すべてのデータフローで型安全性を確保

```typescript
// 型安全なAPI呼び出し
const response = await apiClient.get<PokemonListResponse>('/pokemon');
const data: PokemonListResponse = response.data;
```

## パフォーマンス考慮事項

### 1. メモ化

```typescript
// コンポーネントのメモ化
export const PokemonCard = React.memo<PokemonCardProps>(({ pokemon, onClick }) => {
  // コンポーネントの実装
});

// コールバックのメモ化
const handleClick = useCallback((pokemon: Pokemon) => {
  onClick?.(pokemon);
}, [onClick]);
```

### 2. 遅延読み込み

```typescript
// 必要に応じてデータを読み込み
const loadMore = useCallback(() => {
  if (hasMore && loading !== 'loading') {
    fetchPokemonList(offset);
  }
}, [hasMore, loading, offset, fetchPokemonList]);
```

### 3. エラーハンドリング

```typescript
// 適切なエラーハンドリング
try {
  const data = await apiCall();
  setData(data);
} catch (error) {
  setError(error as ApiError);
} finally {
  setLoading(false);
}
```

## 拡張性

### 1. 新機能追加

- 新しいコンポーネントの追加
- 新しいカスタムフックの作成
- 新しいAPIエンドポイントの追加

### 2. テスト容易性

- 各レイヤーの独立したテスト
- モック可能な設計
- 型安全性によるテストの簡素化

### 3. 保守性

- 明確な責任分離
- 型安全性によるバグの早期発見
- 再利用可能なコンポーネント設計

## 結論

このアーキテクチャ設計により、TypeScriptの型安全性を最大限に活用し、保守性と拡張性の高いアプリケーションを構築できました。各レイヤーの責任が明確に分離されており、今後の機能追加やテストの実装が容易になっています。 