import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const businessSchema = new Schema({
	name: String,
	categories: [{
		type: Schema.Types.ObjectId,
		ref: 'Category'
	}]
});
businessSchema.plugin(mongoosePaginate);
const Business = mongoose.model('Business', businessSchema);
export default Business;
