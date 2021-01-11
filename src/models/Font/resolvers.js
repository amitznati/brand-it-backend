import Font from './Font';
import {deleteFile, isFontExist, saveFile} from '../../fileManager';
import {allModels, allModelsMeta} from '../modelsHelper';

export const resolvers = {
	Query: {
		allFonts: (_, input) => allModels(Font, input),
		_allFontsMeta: (_, input) => allModelsMeta(Font, input),
		Font: (_, {id}) => Font.findById(id)
	},
	Mutation: {
		createFont: async (_, {name, fontFile}) => {
			const font = await Font.create({name});
			const {filename} = await fontFile.rawFile;
			const fontPath = await isFontExist(filename);
			font.url = fontPath || await saveFile(`fonts`, name, fontFile);
			await font.save();
			return font;
		},
		deleteFont: async (_, {id}) => {
			const font = await Font.findById(id);
			if (!font) {
				throw 'Font Not Found!'
			}
			await deleteFile(font.url);
			await font.delete();
			return font;
		},
		updateFont: async (_, {id, name}) => {
			const Font = await Font.findById(id);
			if (Font) {
				Font.name = name;
				await Font.save();
				return Font;
			} else {
				throw ('Font not found');
			}
		}
	}
};
