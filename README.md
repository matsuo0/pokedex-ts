# ポケモン図鑑 - TypeScript学習アプリ

TypeScriptの学習を目的としたポケモン図鑑アプリケーションです。PokeAPIを使用してポケモンのデータを取得し、表示します。

## 🎯 学習目標

このプロジェクトを通じて以下のTypeScriptの概念を学習できます：

- **型定義**: インターフェースとタイプの活用
- **API型安全性**: 外部APIレスポンスの型定義
- **状態管理**: useStateでの型指定
- **非同期処理**: Promiseとasync/awaitの型安全性
- **コンポーネント型**: Reactコンポーネントの型定義

## 🚀 機能

- **ポケモン一覧表示**: 20体ずつポケモンを表示
- **検索機能**: 名前でポケモンを検索
- **詳細情報**: ポケモンの種別、統計情報を表示
- **レスポンシブデザイン**: モバイル対応
- **無限スクロール**: 「もっと見る」ボタンで追加読み込み

## 🛠 技術スタック

- **React 18**: UIライブラリ
- **TypeScript**: 型安全性
- **Axios**: HTTP通信
- **CSS3**: モダンなスタイリング

## 📦 インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm start
```

## 🏗 プロジェクト構造

```
src/
├── components/          # Reactコンポーネント
│   ├── PokemonCard.tsx # ポケモンカード
│   ├── PokemonCard.css
│   ├── SearchBar.tsx   # 検索バー
│   └── SearchBar.css
├── hooks/              # カスタムフック
│   └── usePokemon.ts   # ポケモン状態管理
├── services/           # APIサービス
│   └── pokemonApi.ts   # PokeAPI通信
├── types/              # 型定義
│   └── pokemon.ts      # ポケモン関連の型
├── utils/              # ユーティリティ
│   └── pokemonUtils.ts # ポケモン関連の関数
└── App.tsx             # メインアプリケーション
```

## 🎨 主要な学習ポイント

### 1. 型定義の活用

```typescript
// ポケモンの基本情報の型定義
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
  // ... その他のプロパティ
}
```

### 2. API通信の型安全性

```typescript
// APIレスポンスの型定義
export const getPokemonList = async (
  limit: number = 20, 
  offset: number = 0
): Promise<PokemonListResponse> => {
  const response = await apiClient.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return response.data;
};
```

### 3. カスタムフックでの状態管理

```typescript
export const usePokemonList = (limit: number = 20) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<ApiError | null>(null);
  // ... その他の状態とロジック
};
```

### 4. コンポーネントの型定義

```typescript
interface PokemonCardProps {
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon, onClick }) => {
  // コンポーネントの実装
};
```

## 🌟 特徴

- **型安全性**: TypeScriptによる完全な型チェック
- **モダンなUI**: グラデーションとアニメーション
- **レスポンシブ**: モバイル・タブレット対応
- **エラーハンドリング**: 適切なエラー表示
- **パフォーマンス**: デバウンス検索と無限スクロール

## 📱 使用方法

1. アプリを起動すると、最初の20体のポケモンが表示されます
2. 検索バーにポケモンの名前を入力して検索できます
3. 「もっと見る」ボタンで追加のポケモンを読み込めます
4. ポケモンカードをクリックすると詳細情報が表示されます（実装予定）

## 🔧 開発

```bash
# 開発サーバー起動
npm start

# ビルド
npm run build

# テスト実行
npm test
```

## 📚 学習リソース

- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [React公式ドキュメント](https://react.dev/)
- [PokeAPI](https://pokeapi.co/)

## 🤝 貢献

このプロジェクトは学習目的で作成されています。改善提案やバグ報告は歓迎します。

## 📄 ライセンス

MIT License

---

**TypeScript学習の旅を楽しんでください！** 🎉
