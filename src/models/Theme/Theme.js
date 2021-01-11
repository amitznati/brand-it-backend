import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const themeSchema = new Schema({
	name: String,
	fontFamilies: {
		primary: {
			fontFamily: String,
			fontProvider: String,
			fontUrl: String
		},
		secondary: {
			fontFamily: String,
			fontProvider: String,
			fontUrl: String
		},
		tertiary: {
			fontFamily: String,
			fontProvider: String,
			fontUrl: String
		}
	},
	palette: {
		primary: String,
		secondary: String,
		tertiary: String,
	},
	images: {
		bg: String,
		frame: String,
		sideL: String,
		sideR: String,
		sideB: String,
		sideT: String
	}
});
themeSchema.plugin(mongoosePaginate);
const Theme = mongoose.model('Theme', themeSchema);
export default Theme;
