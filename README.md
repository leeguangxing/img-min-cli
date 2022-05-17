# img-min-cli
Image batch optimization cli tool that supports WebP, PNG and JPEG.

<br>

## Usage
1. Install packages globally: 
```shell script
yarn global add @leeguangxing/img-min-cli
```
or
```shell script
npm i -g @leeguangxing/img-min-cli
```

2. Execute optimization commands:
```shell script
img min [options] [dir]
```

<br>

## All options  
|options|description|
|:---:|:---:|
|-l, --logger| Whether to output the log to the img-min-cli.log file in the execution directory, the optional value is on or off. |

<br>

## Dir  
dir is the directory or image file path to be optimized.

<br>

## Solution

### tinypng
API key is required, and the monthly free limit is 500 per email account. For details, see: 
[https://tinypng.com/developers](https://tinypng.com/developers)

The cli tool will query the usage of the current month based on the API key and compare it with the number of images that need to be optimized. If the quota cannot complete the task, it will automatically exit.

<br>

## ENV

You can save your API key in environment TINYPNG_API_KEY. The cli tool will get it from `process.env.TINYPNG_API_KEY`. Otherwise you need to manually enter it each time.

<br>

## Example
1. Compress a single file:
```shell script
img min test.png
```
2. Recursively compress all WebP, PNG, and JPEG images in the entire directory, and output the log to a file (for tracking failed images):
```shell script
img min your_relative_dir -l on
```