import { promises as fs } from "fs";
import path from "path";

const srcDir = "dist"; //出力元
const destDir = "_php"; //出力先

async function copyIndexFilesOnly(src, dest) {
    await fs.mkdir(dest, { recursive: true }); // フォルダを作成
    const entries = await fs.readdir(src, { withFileTypes: true });
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        let destPath = path.join(dest, entry.name);

        // 指定したフォルダをスキップする(assets)
        if (entry.isDirectory() && entry.name === "assets") {
            console.log(`Skip: ${srcPath} 🌬`);
            continue; //指定したフォルダをスキップして次のディレクトリへ
        }

        if (entry.isDirectory()) {
            // サブディレクトリ内を探索
            await copyIndexFilesOnly(srcPath, destPath);
        } else if (entry.name === "index.html") {
            // index.html のみコピーして .php にリネーム
            destPath = destPath.replace(/index\.html$/, "index.php");
            await fs.mkdir(path.dirname(destPath), { recursive: true }); // 必要なフォルダを作成
            await fs.copyFile(srcPath, destPath);
            console.log(`Copy: ${srcPath} → ${destPath} 🌞`);
        }
    }
}

// 処理を実行
copyIndexFilesOnly(srcDir, destDir).catch(console.error);
