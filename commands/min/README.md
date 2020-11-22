# create 命令说明

格式：
```shell script
truck create|c [options] [dirname]
```

## options

| Name | Default | Description |
| :---  | :--- | :--- |
| -d, --dir | process.cwd()，即当前程序的执行路径。 | 创建模板的目录路径 |

## parameter
- dirname：放置模板的文件夹名称，默认为 'project'。

## example
在家目录的 gitlab/ 下创建目录名称为 test 的模板：
```shell script
truck c -d ~/gitlab/ test
```

## inquirer
询问的选项

### folder type
目录类型

| Name  | Description |
| :---  | :--- |
| JSXComponent | React 组件模板，其中包括分为公共组件 common 和页面组件 page 两种类型。|
| static | 静态 html 页面开发模板 |
| spa | 单页应用开发模板 |
