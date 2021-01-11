import Theme from './Theme';
import {deleteTheme, saveFile} from '../../fileManager';
import {allModels, allModelsMeta} from '../modelsHelper';

const updateThemeImages = async (images, theme) => {
	await Promise.all(['bg', 'frame', 'sideL', 'sideR', 'sideB', 'sideT'].map(async (imageName) => {
		if (images[imageName]) {
			console.log('saving image: ', images[imageName]);
			theme.images[imageName] = await saveFile(`themes/${theme.id}`, imageName, images[imageName]);
		}
	}));
	await theme.save();
	return theme;
};

export const resolvers = {
	Query: {
		allThemes: (_, input) => allModels(Theme, input),
		_allThemesMeta: (_, input) => allModelsMeta(Theme, input),
		Theme: (_, {id}) => Theme.findById(id)
	},
	Mutation: {
		createTheme: async (_, {imagesInput, ...rest}) => {
			try {
				const theme = await Theme.create({images: {}, ...rest });
				return await updateThemeImages(imagesInput, theme);
			} catch (error) {
				console.log('error: ', error);
				throw error;
			}
		},
		deleteTheme: async (_, {id}) => {
			const theme = await Theme.findById(id);
			if (!theme) {
				throw 'theme Not Found!'
			}
			await theme.delete();
			await deleteTheme(theme.id);
			return theme;
		},
		updateTheme: async (_, {id, imagesInput, ...rest}) => {
			const theme = await Theme.findByIdAndUpdate(id, rest);
			if (theme) {
				return await updateThemeImages(imagesInput, theme);
			} else {
				throw ('theme not found');
			}
		}
	}
};
