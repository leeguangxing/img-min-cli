const inquirerPromise = require("../../lib/inquirer-promise");
const tinypng = require("./task/tinypng");
const imageMagick = require("./task/imageMagick");
const log = require("../../lib/log-chalk-file");

const task = {
  tinypng, // 基于 tinypng API 的图片压缩
  imagemagick: imageMagick, // 基于 imageMagick 的图片压缩
};

module.exports = async function (
  dir = process.cwd(),
  { type, logger = "off" }
) {
  // 重写日志输出方法
  log.rewrite();

  // 添加日志标记，logInFile 为 true，则把日志同时输出到 process.cwd() 下的 img-log.txt 文件中
  global.logInFile = logger === "on";

  // if (!type) {
  //   const { minimizeType } = await inquirerPromise({
  //     type: "list",
  //     name: "minimizeType", // name 将会作为返回值的 key
  //     message: "minimize type:",
  //     choices: ["tinypng", "imagemagick"],
  //   });
  //   type = minimizeType;
  // }

  // await task[type](dir);
  await task['tinypng'](dir);
};
