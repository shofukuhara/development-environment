### nodeバージョン

- node v18.20.0
- npm v10.5.0

| コマンド             | アクション                                 |
| :------------------- | :----------------------------------------- |
| `npm install`        | 依存関係をインストール                        |
| `npm run dev`        | ローカル開発サーバー localhost:3000起動       |
| `npm run build`      | ビルドファイル出力 `./dist/`                 |
| `npm run style:lint` | SCSSファイルのLintチェックを実行              |
| `npm run lint`       | Lintチェックを実行して、自動的に修正も行う      |
| `npm run renameToPhp`| distに出力されたindex.htmlをindex.phpに変換  |

```text
/
├── config/
│   ├── .prettierignore # Prettier に無視させるファイルやフォルダを指定
│   ├── .prettierrc # Prettier の設定ファイル
│   ├── .stylelintrc.json # Stylelint の設定ファイル（CSSのコード品質をチェック）
│   ├── postcss.config.cjs # PostCSS の設定ファイル（CSS処理用）
│   ├── rename-index-to-php.mjs # distに出力されたindex.htmlをindex.phpに変換
│   ├── setting.json # プロジェクト全体の設定を管理するためのカスタムJSON
│   └── vite.config.js # Vite の設定ファイル（ビルド・開発サーバー設定）
│
├── dist/  # ビルド後の出力フォルダ
│   ├── assets/
│   │   ├── css
│   │   ├── js
│   │   └── images
│   └── index.html
│
├── src/ # 開発用フォルダ
│   ├── assets/
│   │   ├── css # scss
│   │   ├── js # vanilla js
│   │   └── images # 非圧縮
│   ├── html/ # Pugの部品を格納
│   │   └── include
│   │        ├── components # UIコンポーネント（ボタン、カードなど）
│   │        ├── config # 設定用ファイル（head,パス関連）
│   │        ├── elements # 小さなパーツ（タイトル、テキスト、画像など）
│   │        ├── layouts # レイアウト（ヘッダー、フッターなど）
│   │        ├── locales # テキストをオブジェクトで管理（多言語とかで使用）
│   │        └── meta # meta周りの設定（オブジェクトで管理）
│   ├── public/ # ビルド時にそのままdistに出力(ogpやfavicon,フォント)
│   │   └── assets
│   │        ├── fonts
│   │        └── images
│   └── index.pug
│
├── .gitignore
└── package.json
```
