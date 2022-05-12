const tinypng = require("./task/tinypng");
const log = require("../../lib/log-chalk-file");

const task = {
  tinypng, // 基于 tinypng API 的图片压缩
};

module.exports = async function (
  dir = process.cwd(),
  { logger = "off" }
) {
  // 重写日志输出方法
  log.rewrite();

  // 添加日志标记，logInFile 为 true，则把日志同时输出到 process.cwd() 下的 img-log.txt 文件中
  global.logInFile = logger === "on";

  await task['tinypng'](dir);
};
