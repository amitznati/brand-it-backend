import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const Template = mongoose.model('Template',
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product'
		},
		template: String
	});
export default Template;
