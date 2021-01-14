import UploadedImage from './UploadedImage';
import {deleteFile, saveFile} from '../../fileManager';
import {allModels, allModelsMeta} from '../modelsHelper';

export const resolvers = {
	Query: {
		allUploadedImages: (_, input) => allModels(UploadedImage, input),
		_allUploadedImagesMeta: (_, input) => allModelsMeta(UploadedImage, input),
		UploadedImage: (_, {id}) => UploadedImage.findById(id)
	},
	Mutation: {
		createUploadedImage: async (_, {name, UploadedImageFile}) => {
			const uploadedImage = await UploadedImage.create({name});
			uploadedImage.url = await saveFile(`images/uploaded-images`, uploadedImage.id, UploadedImageFile);
			await uploadedImage.save();
			return uploadedImage;
		},
		updateUploadedImage: async (_, {id, name, UploadedImageFile}) => {
			const uploadedImage = await UploadedImage.findById(id);
			if (uploadedImage) {
				uploadedImage.name = name;
				if (UploadedImageFile) {
					uploadedImage.url = await saveFile(`images/uploaded-images`, uploadedImage.id, UploadedImageFile);
				}
				await uploadedImage.save();
				return uploadedImage;
			} else {
				throw ('UploadedImage not found');
			}
		},
		deleteUploadedImage: async (_, {id}) => {
			const uploadedImage = await UploadedImage.findById(id);
			if (uploadedImage) {
				await deleteFile(uploadedImage.url);
				await uploadedImage.delete();
				return uploadedImage;
			} else {
				throw 'uploadedImage not exist';
			}
		}
	}
};
