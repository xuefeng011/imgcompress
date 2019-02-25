#! /usr/bin/env node

const path = require('path');
const fs = require('fs');
const tinify = require("tinify");
const config = require("./package.json");


if (config.tinypngkey === "") {
	console.log('请在package.json 文件配置tinypng的key，如果没有key，请前往【https://tinypng.com/developers】申请');
	return;
}
tinify.key = config.tinypngkey;
const filePath = './src';
const files = fs.readdirSync(filePath);
const reg = /\.(jpg|png)$/;
console.log(`上传TinyPNG中...`);
async function compress() {
	for (let file of files) {
		let filePathAll = path.join(filePath, file);
		let stats = fs.statSync(path.join(filePath, file));
		if (!stats.isDirectory() && reg.test(file)) {
			await new Promise((resolve, reject) => {
				fs.readFile(filePathAll, (err, sourceData) => {
					if (err) {
						console.log(`${file} 压缩失败`);
						reject(err);
					} else {
						let fileSize = fs.statSync(filePathAll).size;

						tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
							if (err) {
								console.log(`${file} 压缩失败`);
								reject(err);
							}
							//将压缩后的文件保存覆盖
							fs.writeFile(filePathAll, resultData, err => {
								let compressFileSize = fs.statSync(filePathAll).size;
								console.log(`${file} ${(fileSize/1024).toFixed(2)}kb 压缩成功 ${(compressFileSize/1024).toFixed(2)}kb ${((compressFileSize-fileSize)*100/fileSize).toFixed(1)}%`);
								resolve();
							})
						})

					}

				})
			})
		}
	}
}

compress();