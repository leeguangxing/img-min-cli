/**
 *  基于 chalk 和 fs 的 cli 日志输出工具
 */

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

function formatMessage(type, messageArray) {
  let formatMessage = "";
  for (let i = 0; i < messageArray.length; i++) {
    const currentMessage = messageArray[i];
    if (i > 0) {
      formatMessage += "\n";
    }
    formatMessage +=
      typeof currentMessage === "string"
        ? currentMessage
        : `${JSON.stringify(currentMessage, null, 2)}`;
  }

  switch (type) {
    case "info":
      return formatMessage;
    case "log":
      return formatMessage;
    case "success":
      return chalk.green(formatMessage);
    case "warn":
      return chalk.yellow(formatMessage);
    case "error":
      return chalk.red(formatMessage);
  }
}

function formatMessageInFile(type, messageArray) {
  if (!global.logInFile) return;
  const logFilePath = path.join(process.cwd(), "img-log.txt");
  let formatMessageInFile = "";
  for (let i = 0; i < messageArray.length; i++) {
    const currentMessage = messageArray[i];
    const formatMessage =
      typeof currentMessage === "string"
        ? currentMessage
        : `${JSON.stringify(currentMessage, null, 2)}`;

    if (i === 0) {
      formatMessageInFile += `[${new Date().toString()}][${type}]: \n`;
    }
    formatMessageInFile += `${formatMessage}\n\n`;
  }
  fs.appendFileSync(logFilePath, formatMessageInFile);
}

let log = {};

log.rewrite = function () {
  let info = console.info;
  let log = console.log;
  let warn = console.warn;
  let error = console.error;
  console.info = function (...arg) {
    // 信息输出
    info.apply(null, [formatMessage("info", arg)]);
    formatMessageInFile("info", arg);
  };
  console.log = function (...arg) {
    // 日志输出
    log.apply(null, [formatMessage("log", arg)]);
    formatMessageInFile("log", arg);
  };
  console.warn = function (...arg) {
    // 警告输出
    warn.apply(null, [formatMessage("warn", arg)]);
    formatMessageInFile("warn", arg);
  };
  console.error = function (...arg) {
    // 错误输出
    error.apply(null, [formatMessage("error", arg)]);
    formatMessageInFile("error", arg);
  };
  console.success = function (...arg) {
    // 成功输出
    log.apply(null, [formatMessage("success", arg)]);
    formatMessageInFile("success", arg);
  };
};

module.exports = log;
