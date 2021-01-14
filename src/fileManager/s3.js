import path from 'path';

const aws = require('aws-sdk');
import dotenv from 'dotenv'
dotenv.config();
let s3 = new aws.S3({
	credentials: {
		accessKeyId: process.env.ACCESS_KEY_ID,
		secretAccessKey: process.env.SECRET_ACCESS_KEY
	},
	region: process.env.REGION,
	params : {
		ACL : 'public-read',
		Bucket : process.env.AWS_BUCKET
	}
});

export const saveFile = async (filePath, name, file) => {
	const {createReadStream, mimetype, encoding, filename} = await file.rawFile;
	const newFilename = name ? `${name}.${filename.split('.').pop()}` : filename;
	const dir = `resources/${filePath}`;
	let stream = createReadStream();
	const {Location} = await s3.upload({
		Body: stream,
		Key: `${dir}/${newFilename}`,
		ContentType: mimetype
	}).promise();
	console.log('File Location: ', Location);
	return new Promise((resolve,reject)=>{
		if (Location){
			console.log({
				success: true, message: "Uploaded", mimetype,filename,
				location: Location, encoding
			});
			const fileUrl = Location.replace(`${process.env.AWS_BUCKET}.s3.${process.env.REGION}.amazonaws.com`, process.env.AWS_BUCKET_DNS)
			resolve(fileUrl);
		}else {
			console.log('failed to save s3 file');
			reject({
				success: false, message: "Failed"
			})
		}
	});
};


const isObjectExistS3 = async (params) => {
	try {
		const headCode = await s3.headObject(params).promise();
		const signedUrl = s3.getSignedUrl('getObject', params);
		// Do something with signedUrl
		console.log('isObjectExistS3 headCode: ', headCode);
		return signedUrl;
	} catch (headErr) {
		if (headErr.code === 'NotFound') {
			console.log('isObjectExistS3 NotFound params: ', params);
		}
		return false;
	}
}

const deleteObjectS3 = async (params) => (
	new Promise(async (resolve) => {
		const isObjectExist = await isObjectExistS3(params);
		if (isObjectExist) {
			s3.deleteObject(params,
				(err, data) => {
					if (err) {
						console.log('deleteFromS3 failed: ', err);
						resolve();
					} else {
						console.log('deleteFromS3 data: ', data);
						resolve();
					}
				});
		} else {
			resolve();
		}
	})
);
 /**
 * Delete file from S3
 * @param {String} attachmentId the attachment id
 * @return {Promise} promise resolved to deleted data
 */
 export async function deleteFromS3 (attachmentId) {
 	const fileUrl = attachmentId.split(`${process.env.AWS_BUCKET_DNS}/`)[1];
 	const params = { Bucket : process.env.AWS_BUCKET, Key: fileUrl };
 	console.log('deleteFromS3: ', params);
 	return deleteObjectS3(params);
}

export async function deleteTheme (id) {
 	const params = { Bucket : process.env.AWS_BUCKET, Key: `resources/themes/${id}` };
 	console.log('deleteTheme: ', params);
	return deleteObjectS3(params);
}

export async function isFontExist(fontName) {
 	const params = { Bucket : process.env.AWS_BUCKET, Key: `resources/fonts/${fontName}` };
	console.log('isFontExist: ', params);
	return isObjectExistS3(params);
}
