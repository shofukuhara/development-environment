import { defineConfig } from 'vite';
import path from 'path';
import globule from 'globule';
import vitePluginPugStatic from '@macropygia/vite-plugin-pug-static';
import license from 'rollup-plugin-license';
import { terser } from 'rollup-plugin-terser';
import fs from 'fs';

// `src` ディレクトリ内の Pug ファイルを取得して出力名を作成
const getPugInputs = () => {
  const documents = globule.find([path.resolve(__dirname, '../src/**/*.pug')], {
    ignore: [path.resolve(__dirname, '../src/**/_*.pug')],
  });
  return documents.reduce((acc, document) => {
    const relativePath = path.relative(path.resolve(__dirname, '../src'), document);
    const outputName = relativePath.replace(/\.pug$/, '.html');
    acc[outputName] = document;
    return acc;
  }, {});
};

// 出力オプション設定
const outputOptions = {
  entryFileNames: 'assets/js/index.js',
  chunkFileNames: 'assets/js/index.js',
  assetFileNames: (assetInfo) => {
    if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(assetInfo.name)) return 'assets/images/[name].[ext]';
    if (/\.css$/.test(assetInfo.name)) return 'assets/css/[name].[ext]';
    return 'assets/[name].[ext]';
  },
};

// ライセンスコメント追加プラグイン
const addLicenseComment = () => ({
  name: 'add-license-comment',
  writeBundle: () => {
    const filePath = path.resolve(__dirname, '../dist/assets/js/index.js');
    const comment = '/*! Please refer to licence.txt for the details of the license. */\n';
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return console.error(err);
      const modifiedData = comment + data;
      fs.writeFile(filePath, modifiedData, 'utf8', (err) => err && console.error(err));
    });
  },
});

export default defineConfig({
  root: path.resolve(__dirname, '../src'),
  base: './',
  build: {
    outDir: path.resolve(__dirname, '../dist'),
    emptyOutDir: true,
    minify: 'terser',
    // jsのビルド設定
    terserOptions: {
      // コメント削除
      format: { comments: false },
      // consoleの削除
      compress: { drop_console: true },
    },
    rollupOptions: {
      input: getPugInputs(),
      output: outputOptions,
      plugins: [addLicenseComment(), terser()],
    },
  },
  plugins: [
    // pugの開発・ビルド設定
    vitePluginPugStatic({
      buildOptions: { basedir: path.resolve(__dirname, '../src') },
      serveOptions: { basedir: path.resolve(__dirname, '../src') },
    }),
    // 使用しているライブラリのライセンス出力
    license({
      thirdParty: {
        output: path.join(__dirname, '../dist/assets/js/license.txt'),
        includePrivate: true,
      },
    }),
    // ビルドしたディレクトリをコピー
    // viteStaticCopy({
    //   targets: [
    //     {
    //       // 出力元
    //       src: path.join(__dirname, '../dist/assets/css'),
    //        // 出力先
    //       dest: path.resolve(__dirname, '')
    //     },
    //     {
    //       src: path.resolve(__dirname, '../dist/assets/js'),
    //       dest: path.resolve(__dirname, '')
    //     }
    //   ],
    // }),
  ],
  // 開発時source map出力
  css: { devSourcemap: true },
  postcss: path.resolve(__dirname, './postcss.config.cjs'),
  // ローカルサーバー立ち上げ
  server: {
    open: true,
    host: true,
    port: 3000,
  },
});
