### nodeバージョン
- node v18.20.0
- npm v10.5.0


| コマンド                  | アクション                                       |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | 依存関係をインストール                           |
| `npm run dev`             | ローカル開発サーバー localhost:3000起動          |
| `npm run build`           | ビルドファイル出力 `./dist/`                     |
| `npm run style:lint`      | SCSSファイルのLintチェックを実行                 |
| `npm run lint`            | Lintチェックを実行して、自動的に修正も行う       |


project/                 # プロジェクトのルートディレクトリ
├─ config/               # 設定ファイル関連（プロジェクト全体の設定を管理）
│  ├─ .prettierignore    # Prettierの無視リスト
│  ├─ .prettierrc        # Prettierの設定ファイル
│  ├─ .stylelintrc.json  # Stylelintの設定ファイル
│  ├─ postcss.config.cjs # PostCSSの設定ファイル
│  ├─ setting.json       # プロジェクト独自の設定（用途に応じて）
│  └─ vite.config.js     # Viteの設定ファイル
│
├─ dist/                 # ビルド後の出力ディレクトリ（配布用）
│  ├─ assets/            # ビルドされた静的ファイル
│  │  ├─ css/            # CSSファイル（ビルド後）
│  │  ├─ js/             # JavaScriptファイル（ビルド後）
│  │  └─ images/         # 画像ファイル（ビルド後）
│  └─ index.html         # ビルドされたHTMLファイル
│
├─ node_modules/         # npmでインストールしたパッケージ
│
└─ src/                  # 開発用ディレクトリ（ソースコード）
   ├─ assets/            # 静的アセット（非ビルドの元ファイル）
   │  ├─ css/            # SCSSファイル（開発用）
   │  ├─ js/             # Vanilla JavaScriptファイル（開発用）
   │  └─ images/         # 非圧縮画像（開発用）
   │
   ├─ html/              # Pugテンプレート関連
   │  └─ include/        # Pugのインクルードファイル（共通パーツやコンポーネント）
   │     ├─ component/   # 再利用可能なUIコンポーネント（Pugファイル）
   │     ├─ config/      # サイト設定や変数をまとめたPugファイル
   │     ├─ element/     # 基本HTML要素のPugファイル
   │     └─ layout/      # 共通レイアウト（ヘッダー・フッターなどのPugファイル）
   │
   ├─ public/            # そのまま`dist/`にコピーされるディレクトリ（静的ファイル）
   │  └─ assets/         # 静的ファイル（圧縮済みや圧縮不要な画像など）
   │     └─ images/      # 公開用の画像ファイル
   │
   └─ index.pug          # メインのPugファイル（エントリーポイント）
│
├─ .gitignore            # Gitで無視するファイルの設定
├─ package-lock.json     # npmの依存関係ロックファイル
├─ package.json          # npmの設定ファイル
└─ README.md             # プロジェクトの説明ファイル

