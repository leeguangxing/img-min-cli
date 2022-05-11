#!/usr/bin/env node

// 颜色字体
const chalk = require("chalk");
// 封装的界面交互模块
const minCommand = require("../commands/min");
// 命令行参数工具
const commander = require("commander");
const program = new commander.Command();

// 定义版本号
program.version("v1.0.0", "-v, --version", "output the current version");

// 设置帮助信息的第一行
// Usage: img [options] command
program.name("img").usage("[options] command");

// 帮助信息后追加版权信息
program.on("--help", function () {
  console.log(`\n${chalk.bgGreen.bold("--- author: leeguangxing.cn ---")}`);
});

// 设置未知命令时的报错
program.on("command:*", function () {
  console.error(chalk.red("Invalid command: %s"), program.args.join(" "));
  console.info("See --help for a list of available commands.");
  process.exit(1);
});

// 指定命令及参数，最后通过 action 操作处理程序处理

// 压缩功能
program
  .command("min [dir]")
  .alias("m")
  .description("Specify a relative directory of a filename to be minimized.")
  // .option(
  //   "-t, --type [type]",
  //   'Specify minimize type, it could be "tinypng" or "imagemagick".'
  // )
  .option(
    "-l, --logger [logger]",
    'Whether log message in file，it could be "on" or "off". Log file will be saved in process.cwd()/img-min-cli.log. Default "off", log in stdio.'
  )
  .action(minCommand);

// process.argv 属性返回一个数组，其中包含当启动 Node.js 进程时传入的命令行参数。
program.parse(process.argv);
