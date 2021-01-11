import express from 'express';
import {createWriteStream, existsSync, unlinkSync} from 'fs';
import path from 'path';
import rimraf from 'rimraf';
import shell from 'shelljs';


export function createFilesRoutes(app) {
	const getFile = (filePath ,res) => {
		if (existsSync(filePath)) {
			res.sendFile(filePath);
		} else {
			res.send(null);
		}
	}
	const getImage = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/images/${req.params.type}/${req.params.name}`);
		getFile(filePath, res);
	};
	const getFont = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/fonts/${req.params.name}`);
		res.header('Access-Control-Allow-Origin', '*');
		getFile(filePath, res);
	};
	const getThemeFile = (req, res) => {
		const filePath = path.resolve(`${__dirname}/resources/themes/${req.params.id}/${req.params.name}`);
		getFile(filePath, res);
	};
	const router = new express.Router();
	// Themes
	router.get('/themes/:id/:name', getThemeFile);
	router.get('/fonts/:name', getFont);
	// Images
	router.get('/images/:type/:name', getImage);
	app.use('/resources', router);
}

export async function saveFile(filePath, name, file) {
	const { filename, createReadStream } = await file.rawFile;
	const newFilename = name ? `${name}.${filename.split('.').pop()}` : filename;
	const dir = path.join(__dirname, `/resources/${filePath}`)
	if (!existsSync(dir)){
		console.log('creating dir: ', dir);
		shell.mkdir('-p', dir);
	}
	await new Promise(res => {
		createReadStream()
			.pipe(createWriteStream(path.join(dir, newFilename)))
			.on('close', res)
	})
	return new URL(newFilename, `http://localhost:4000/resources/${filePath}/`).href;
}

export async function isFontExist(fontName) {
	return existsSync(`${__dirname}/resources/fonts/${fontName}`) ?
		`http://localhost:4000/resources/fonts/${fontName}`
		:
		false;
}

export async function isUploadedImageExist(imageName) {
	return existsSync(`${__dirname}/resources/images/uploaded-images/${imageName}`) ?
		`http://localhost:4000/resources/images/uploaded-images/${imageName}`
		:
		false;
}

export async function deleteTheme(id) {
	return rimraf.sync(`${__dirname}/resources/themes/${id}`);
}

export async function deleteFile(pathUrl) {
	const realPath = pathUrl.replace('http://localhost:4000', __dirname);
	try {
		await unlinkSync(realPath);
		console.log('file removed: ', realPath);
	} catch(err) {
		console.error(err);
	}
}
