import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const productSchema = new Schema({
	name: String,
	imageUrl: String,
	size: {
		height: Number,
		width: Number
	},
	templateFrame: {
		x: Number,
		y: Number,
		height: Number,
		width: Number
	},
	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}],
	templates: [{
		type: Schema.Types.ObjectId,
		ref: 'Template'
	}],
	dynamicTextOptions: [String]
});
productSchema.plugin(mongoosePaginate);
const Product = mongoose.model('Product', productSchema);
export default Product;
