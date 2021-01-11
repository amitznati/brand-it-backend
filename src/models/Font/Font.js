import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const fontSchema = new Schema({
	name: String,
	url: String
});
fontSchema.plugin(mongoosePaginate);
const Font = mongoose.model('Font', fontSchema);
export default Font;
