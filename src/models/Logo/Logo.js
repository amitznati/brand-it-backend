import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const logoSchema = new Schema({
	name: String,
	template: String
});
logoSchema.plugin(mongoosePaginate);
const Logo = mongoose.model('Logo', logoSchema);
export default Logo;
