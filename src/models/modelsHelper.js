export const allModels = async (model, input, populate) => {
	const query   = input.filter;
	const options = {
		// select:   'title date author',
		// sort:     { id: -1 },
		populate: populate,
		// lean:     true,
		// offset:   20,
		limit:    input.perPage,
		page: input.page + 1
	};
	const allModels = await model.paginate(query, options);
	return allModels.docs;
};

export const allModelsMeta = async (model, input) => {
	const allModels = await model.paginate({}, {limit: input.perPage, page: input.page + 1});
	return {
		count: allModels.total
	};
};
