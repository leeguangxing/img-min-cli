/**
 *  使用 tinypng API 优化图片
 */

const path = require("path");
const fs = require("fs");
const tinify = require("tinify");
const glob = require("glob");
const inquirerPromise = require("../../../lib/inquirer-promise");

module.exports = async function (dir) {
  if(process.env.TINYPNG_API_KEY) {
    tinify.key = process.env.TINYPNG_API_KEY
  } else {
    // 提示输入 API key
    const { apiKey } = await inquirerPromise([
      {
        type: "input",
        name: "apiKey",
        message:
          "Input your tinypng API key, visist https://tinypng.com/developers for more infomation.",
      },
    ]);
    tinify.key = apiKey;
  }

  tinify.validate(function (err) {
    if (err) {
      return console.error(err);
    }

    const compressionsThisMonth = tinify.compressionCount;
    console.warn(`Compressed pictures this month: ${compressionsThisMonth}`);

    dir = path.join(process.cwd(), dir);

    const stat = fs.lstatSync(dir);

    if (stat.isFile()) {
      tinify.fromFile(dir).toFile(dir, function (err) {
        if (err) {
          return console.error(err);
        }
        // 输出优化成功信息
        console.success(`${dir} Optimization succeeded!`);
      });
    } else {
      const options = {};
      glob(path.join(dir, "**/*.{png,jpg,webp,jpeg}"), options, function (err, files) {
        if (err) {
          return console.error(err);
        }
        if (files.length > 500 - compressionsThisMonth) {
          return console.warn("The number of images is greater than the remaining number of optimizations this month!");
        }
        for (let i = 0; i < files.length; i++) {
          const currentFile = files[i];
          tinify.fromFile(currentFile).toFile(currentFile, function (err) {
            if (err) {
              return console.error(err);
            }
            // 输出优化成功信息
            console.success(`${currentFile} Optimization succeeded!`);
          });
        }
      });
    }
  });
};
