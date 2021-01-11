import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
const Schema = mongoose.Schema;
const uploadedImageSchema = new Schema({
	name: String,
	url: String
});
uploadedImageSchema.plugin(mongoosePaginate);
const UploadedImage = mongoose.model('UploadedImage', uploadedImageSchema);
export default UploadedImage;
