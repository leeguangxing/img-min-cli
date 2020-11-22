# img-min-cli
图片批量优化优化 cli 工具。

## 用法
1、将 npm 包安装到全局。

2、执行优化命令：
```shell script
img min [options] [dir]
```

### options  
|选项|说明|
|:---:|:---:|
|-t, --type|使用的压缩方案，可选值 tinypng 或 imagemagick|
|-l, --logger|是否将日志输入到执行目录下的 img-log.txt 文件中，可选值 on 或者 off||

### dir  
需要执行优化的目录或图片文件路径。

<br>

## 方案

### tinypng
需要使用 API key，每月免费上限每个邮箱帐号 500 张，详见：  
[https://tinypng.com/developers](https://tinypng.com/developers)

cli 工具会根据 API key 查询当月使用情况，并和需要优化图片数量作比较。限额不能完成任务，则自动退出。

### ImageMagick
需要预先安装 ImageMagick 客户端，详见：  
[https://imagemagick.org/script/download.php](https://imagemagick.org/script/download.php)

windows 下安装时需要同时勾选相关工具，确保 magick 命令工具能使用。本 cli 工具会使用 shelljs 调用该命令行。

> 本 cli 中的 ImageMagick 配置下压缩效果一般，尤其是 png，会略有失真。建议使用 tinypng 方案。

<br>

## 使用例子
1、压缩单个文件：
```shell script
img min test.png
```
2、压缩整个目录下的所有 jpg 和 png 图片，并将日志输出到文件：
```shell script
img min src -l on
```