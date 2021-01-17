import { ApolloServer as ApolloServerExpress } from 'apollo-server-express';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';
import {createFilesRoutes} from './fileManager/localFileManager';
import "regenerator-runtime/runtime.js";

dotenv.config();
const isDev = process.env.NODE_ENV === 'development';

const startServerDev = async () => {
	const server = new ApolloServerExpress({
		typeDefs,
		resolvers,
		subscriptions: { path: '/' },
		introspection: true
	});

	const app = express();
	server.applyMiddleware({ app, path: isDev ? '/graphql' : '/' });
	if (isDev) {
		createFilesRoutes(app);
	}
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);

	await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
		console.log(`🚀 subscriptionsPath ready at http://localhost:4000${server.subscriptionsPath}`);

	});
}

const startServerExpress = () => {
	const express = require('express');
	const {graphqlHTTP} = require('express-graphql');
	const { graphqlUploadExpress, GraphQLUpload } = require('graphql-upload');
	const {
		GraphQLSchema,
		GraphQLObjectType,
		GraphQLBoolean,

	} = require('graphql');

	const schema = new GraphQLSchema({
		mutation: new GraphQLObjectType({
			name: 'Mutation',
			fields: {
				uploadImage: {
					description: 'Uploads an image.',
					type: GraphQLBoolean,
					args: {
						image: {
							description: 'Image file.',
							type: GraphQLUpload,
						},
					},
					async resolve(parent, { image }) {
						const { filename, mimetype, createReadStream } = await image;
						const stream = createReadStream();
						// Promisify the stream and store the file, then…
						console.log('stream read!!');
						return true;
					},
				},
			},
		}),
	});

	express()
		.use(
			isDev ? '/graphql' : '/',
			graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
			graphqlHTTP({schema}))
		.listen({ port: 4000 }, () => {
			console.log(`🚀 Server ready at http://localhost:4000`);
			// console.log(`🚀 subscriptionsPath ready at http://localhost:4000${server.subscriptionsPath}`);

		});
}

startServerDev();
