## What is this

Webpackで作成していた静的ページ開発環境をViteに刷新

## Language / 

* ~~Webpack~~ -> Vite
* HTML(+EJS)
* SCSS
* TypeScript
* ~~ESLint+Prettier~~ -> Biome

## Requirement

### Node.js

* `20.x`を使用します
* Volta推奨
  * https://volta.sh/

### WebP

後述するWebP変換バッチを使用する際には、[Googleが配布しているユーティリティ](https://developers.google.com/speed/webp/docs/precompiled) の導入が必要です。
MacであればHomebrewから導入出来ます。

```bash
brew install webp
```

### envファイル

* 環境ごとに異なる値、またはセキュアなトークン等を使う場合は環境に応じた`.env`ファイルを作成してください
* `.env.example`以外はgitignoreされます
* 読み込み対象となるenvはコマンド一覧を参照ください
* 特定の環境のみ（かつその環境が全体から見て少数一部に限る）が違う、という場合は定数で切り分けするほうが低コストかもしれません
* `.env.example`はプロジェクト状況に応じて追記してください
    * その際、セキュアな情報はgitを介して共有すべきではありません

## npmコマンド

| コマンド                | 用途           | 備考                                                        |
|:--------------------|:-------------|:----------------------------------------------------------|
| `dev`               | 開発環境起動       |                                                           |
| `build`             | ビルド実行        |                                                           |
| `preview`           | プレビュー        |                                                           |
| `biome`             | Biome実行      | [Biome](https://biomejs.dev/)を使用したコードの静的解析＋整形             |
| `convert:webp`      | WebP一括変換     | `src/images`配下の画像を一括変換する                                  |
| `deploy:develop`    | デプロイ（dev環境）  | `.env.develop`の`APP_URL`と`APP_DEPLOY_TARGET`を使用してrsync    |
| `deploy:production` | デプロイ（prod環境） | `.env.production`の`APP_URL`と`APP_DEPLOY_TARGET`を使用してrsync |

### WebP一括変換

`src/images`配下の`jpg`、`jpeg`, `png`を一括でWebPに変換します。
変換したファイルは`${拡張子を含む元のファイル名}.webp`としてソースファイルと同一階層に出力されます。（拡張子違いで同一ファイル名があるとバッティングするため）

### IE11

Webpack版でギリギリ考慮していたIE11は考慮しないようにしました。


### デプロイ

* 手元でビルドしたものをsshでrsyncする想定のシェルスクリプトを同梱しています
* `sshconfig`に`hoge`で登録しているサーバの場合（`ssh hoge`でそのサーバにssh出来る状態）、下記のように対応環境の`.env`を作成して追記します
  * `APP_URL`は実行結果表示用なので直接デプロイ作業には関与しません

```
# デプロイ先URL
APP_URL=https://example.com
# デプロイ時のSSHコマンド
APP_DEPLOY_TARGET=hoge:/var/www/html/{デプロイ先ディレクトリ}
```

## リリースノート

マイナーリリースあたりまでの主要更新項目を記載します。 詳細はGithubのリリース情報を参照してください。

| version | date       | description                                      |
|:--------|:-----------|:-------------------------------------------------|
| `1.0.0` | 2024/05/25 | 初版                                               |
