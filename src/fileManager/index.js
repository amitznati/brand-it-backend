import * as localFileManager from './localFileManager';
import * as s3 from './s3';
import dotenv from 'dotenv';
dotenv.config();
const isDev = process.env.AWS_BUCKET === 'local';
export const deleteFile = isDev ? localFileManager.deleteFile : s3.deleteFromS3;
export const deleteTheme = isDev ? localFileManager.deleteTheme : s3.deleteTheme;
export const isFontExist = isDev ? localFileManager.isFontExist : s3.isFontExist;
export const saveFile = isDev ? localFileManager.saveFile : s3.saveFile;
