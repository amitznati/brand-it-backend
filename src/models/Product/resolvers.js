import Product from './Product';
import Category from '../Category/Category';
import {deleteFile, saveFile} from '../../fileManager';
import Template from '../Template/Template';
import {allModels, allModelsMeta} from '../modelsHelper';

async function updateProductImageAndCategories(rest, image, product) {
	const categoriesIds = rest.categories;
	if (image) {
		product.imageUrl = await saveFile('images/products', rest.name, image);
		await product.save();
	}
	if (categoriesIds && categoriesIds.length) {
		await Category.updateMany(
			{_id: {$in: categoriesIds}},
			{$push: {products: product}},
			{multi: true}
		);
	}
	return product;
}

export const resolvers = {
	Query: {
		allProducts: (_, input) => allModels(Product, input),
		_allProductsMeta: (_, input) => allModelsMeta(Product, input),
		Product: (_, {id}) => Product.findById(id),
		getProductWithTemplates: (_, {productId}) => Product.findById(productId).populate('templates'),
		getProductsWithTemplates: (_, {params}) => {
			const {categories = [], ids = []} = params;
			const payload = {};
			if (categories.length) {
				payload.categories = {$in: categories};
			}
			if (ids.length) {
				payload['_id'] = {$in: ids};
			}
			console.log(payload);
			return Product.find(payload).populate('templates');
		}
	},
	Mutation: {
		createProduct: async (_, input) => {
			const {image, ...rest} = input;
			const product = await Product.create({...rest});
			const categoriesIds = input.categories;
			return await updateProductImageAndCategories(rest, image, product);
		},

		updateProduct: async (_, {id, image, ...rest}) => {
			const product = await Product.findById(id);
			if (product) {
				await Category.updateMany(
					{},
					{$pull: {products: id}},
					{multi: true}
				);
				await Product.findByIdAndUpdate(id, rest);
				return await updateProductImageAndCategories(rest, image, product);
			} else {
				throw ('product not exist');
			}
		},
		deleteProduct: async (_, {id}) => {
			const product = await Product.findById(id);
			if (product) {
				await Category.updateMany(
					{},
					{$pull: {products: id}},
					{multi: true}
				);
				product.imageUrl && await deleteFile(product.imageUrl);
				await product.delete();
				return product;
			} else {
				throw ('product not exist');
			}
		},
		addTemplate: async (_, {id, template, templateId}) => {
			if (templateId) {
				await Template.findByIdAndUpdate(templateId, {template});
			} else {
				const newTemplate = await Template.create({template});
				await Product.findByIdAndUpdate(id, {
					$push: {templates: newTemplate},
				});
			}
			return Product.findById(id);
		},
		deleteTemplate: async (_, {id, productId}) => {
			const template = await Template.findById(id);
			if (template) {
				await template.delete();
				if (productId) {
					await Product.findOneAndUpdate({_id: productId}, {$pull: {templates: id}});
				}
				return 'deleted';
			}
			return 'Template did not found!';
		}
	}
};
