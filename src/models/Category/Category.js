import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const categorySchema = new Schema({
	name: String,
	business: {
		type: Schema.Types.ObjectId,
		ref: 'Business'
	},
	products: [{
		type: Schema.Types.ObjectId,
		ref: 'Product'
	}]
});
categorySchema.plugin(mongoosePaginate);

const Category = mongoose.model('Category', categorySchema);
export default Category;
