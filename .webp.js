#! /usr/bin/env node

const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const fs = require("fs")

const path = require('path')

async function compress({
	source
} = {
	source: "./assets"
}) {
	const p = path.resolve(__dirname, source);
	let total = 0;
	try {
		const files = fs.readdirSync(p);
		const f = files;
		total = files && files.length
	} catch (e) {
		throw e
	}
	// console.log(`【${p}】111`)

	await imagemin([`${p}/*.{jpg,png}`], p, {
		use: [
			imageminWebp({
				quality: 50
			})
		]
	}).then((e) => {
		return {
			succ: total,
			total: total
		}
	}).catch(err => {
		throw err
	})

}


// compress();

module.exports = compress