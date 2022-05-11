# img-min-cli
图片批量优化 cli 工具。

## 用法
1、将 npm 包安装到全局。

2、执行优化命令：
```shell script
img min [options] [dir]
```

### options  
|选项|说明|
|:---:|:---:|
|-l, --logger|是否将日志输入到执行目录下的 img-min-cli.log 文件中，可选值 on 或者 off||

### dir  
需要执行优化的目录或图片文件路径。

<br>

## 方案

### tinypng
需要使用 API key，每月免费上限每个邮箱帐号 500 张，详见：  
[https://tinypng.com/developers](https://tinypng.com/developers)

cli 工具会根据 API key 查询当月使用情况，并和需要优化图片数量作比较。限额不能完成任务，则自动退出。

<br>

## 使用例子
1、压缩单个文件：
```shell script
img min test.png
```
2、压缩整个目录下的所有 jpg 和 png 图片，并将日志输出到文件：
```shell script
img min your_relative_dir -l on
```