/**
 *  使用 ImageMagick 优化图片
 */

const fs = require("fs");
const glob = require("glob");
const path = require("path");
// 基于 node.js 的 shell 命令工具
const shell = require("shelljs");

function compressJPG(dir) {
  if (
    shell.exec(
      // https://dev.to/feldroy/til-strategies-for-compressing-jpg-files-with-imagemagick-5fn9
      `magick convert ${dir} -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB ${dir}`
    ).code !== 0
  ) {
    console.error(`${dir} 优化失败`);
    shell.exit(1);
  } else {
    console.success(`${dir} 优化完成`);
  }
}

function compressPNG(dir) {
  if (
    shell.exec(
      // 注意：该 png 压缩效果不太理想
      `magick convert ${dir} +dither -colors 256 -depth 8 ${dir}`
    ).code !== 0
  ) {
    console.error(`${dir} 优化失败`);
    shell.exit(1);
  } else {
    console.success(`${dir} 优化完成`);
  }
}

function isJPG(dir) {
  return /.jpg$/i.test(dir);
}

function isPNG(dir) {
  return /.png$/i.test(dir);
}

function compress(dir) {
  if (isJPG(dir)) {
    compressJPG(dir);
  } else if (isPNG(dir)) {
    compressPNG(dir);
  } else {
    console.error("图片格式错误");
  }
}

module.exports = async function (dir) {
  dir = path.join(process.cwd(), dir);
  const stat = fs.lstatSync(dir);
  if (stat.isFile()) {
    // 单个文件
    compress(dir);
  } else {
    // 目录
    const options = {};
    glob(path.join(dir, "**/*.{png,jpg}"), options, function (err, files) {
      if (err) {
        return console.error(err);
      }
      for (let i = 0; i < files.length; i++) {
        const currentFile = files[i];
        compress(currentFile);
      }
    });
  }
};
