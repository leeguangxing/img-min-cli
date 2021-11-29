/**
 *  使用 tinypng API 优化图片
 */

const path = require("path");
const fs = require("fs");
const tinify = require("tinify");
const glob = require("glob");
const inquirerPromise = require("../../../lib/inquirer-promise");

module.exports = async function (dir) {
  // 提示输入 API key
  // const { apiKey } = await inquirerPromise([
  //   {
  //     type: "input",
  //     name: "apiKey",
  //     message:
  //       "Input your tinypng API key, visist https://tinypng.com/developers for more infomation.",
  //   },
  // ]);

  // tinify.key = apiKey;
  tinify.key = 'NpmX8kWybqyFY58Xs27nWLCR49G0Fy01';
  tinify.validate(function (err) {
    if (err) {
      return console.error(err);
    }

    const compressionsThisMonth = tinify.compressionCount;
    console.warn(`本月已压缩图片：${compressionsThisMonth} 张`);

    dir = path.join(process.cwd(), dir);

    const stat = fs.lstatSync(dir);

    if (stat.isFile()) {
      tinify.fromFile(dir).toFile(dir, function (err) {
        if (err) {
          return console.error(err);
        }
        // 输出优化成功信息
        console.success(`${dir} 优化完成`);
      });
    } else {
      const options = {};
      glob(path.join(dir, "**/*.{png,jpg}"), options, function (err, files) {
        if (err) {
          return console.error(err);
        }
        if (files.length > 500 - compressionsThisMonth) {
          return console.warn("图片数量大于本月剩余可优化数量！");
        }
        for (let i = 0; i < files.length; i++) {
          const currentFile = files[i];
          tinify.fromFile(currentFile).toFile(currentFile, function (err) {
            if (err) {
              return console.error(err);
            }
            // 输出优化成功信息
            console.success(`${currentFile} 优化完成`);
          });
        }
      });
    }
  });
};
