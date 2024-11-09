import fs from "fs";
import path from "path";
import sharp from "sharp";

function compressImage(filePath) {
  const dirName = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const outputDir = path.join("src/assets/images/min", path.relative("src/assets/images", dirName));

  function getExtension(file) {
    const ext = path.extname(file || "").split(".");
    return ext[ext.length - 1];
  }
  const fileFormat = getExtension(fileName);

  // src/assets/images/min 以下は処理しない
  if (dirName.includes("src/assets/images/min")) {
    console.log(`\u001b[1;33m 既に圧縮されたディレクトリをスキップします: ${filePath}`);
    return;
  }

  if (!fs.existsSync("src/assets/images/min")) {
    fs.mkdirSync("src/assets/images/min", { recursive: true });
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  if (fileFormat === "jpg" || fileFormat === "jpeg" || fileFormat === "png") {
    sharp(filePath)
      .webp({ quality: 90 })
      .toFile(path.join(outputDir, fileName.replace(/\.(jpg|jpeg|png)$/i, ".webp")), (err, info) => {
        if (err) {
          console.error(`\u001b[1;31m ${fileName}の圧縮に失敗しました:`, err);
          return;
        }
        console.log(`\u001b[1;32m ${fileName}をwebp形式に変換しました。 ${info.size / 1000}KB`);
      });
  } else if (fileFormat === "svg") {
    sharp(filePath)
      .toFile(path.join(outputDir, fileName), (err, info) => {
        if (err) {
          console.error(`\u001b[1;31m ${fileName}の圧縮に失敗しました:`, err);
          return;
        }
        console.log(`\u001b[1;32m SVGファイルを圧縮してコピーしました: ${fileName}`);
      });
  } else {
    console.log(`\u001b[1;31m 対応していないファイル形式です: ${fileName}`);
  }
}

function processImagesInDirectory(directoryPath) {
  fs.readdirSync(directoryPath).forEach((file) => {
    const filePath = path.join(directoryPath, file);
    if (fs.statSync(filePath).isFile()) {
      compressImage(filePath);
    } else if (fs.statSync(filePath).isDirectory()) {
      processImagesInDirectory(filePath);
    }
  });
}

const imagesDirectory = "src/assets/images";
processImagesInDirectory(imagesDirectory);
