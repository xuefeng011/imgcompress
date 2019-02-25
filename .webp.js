#! /usr/bin/env node

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

console.log(`webp转换开始～`);

imagemin(['./src/*.{jpg,png}'], 'src/webp', {
	use: [
		imageminWebp()
	]
}).then(() => {
	console.log(`webp转换已完成～`);
}).catch(err => {
	console.log(`发生错误～${err}`);
})