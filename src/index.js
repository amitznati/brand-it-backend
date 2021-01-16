import { ApolloServer } from 'apollo-server';
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';
import {createFilesRoutes} from './fileManager/localFileManager';
import "regenerator-runtime/runtime.js";
import path from 'path';

dotenv.config();

const startServerProd = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		subscriptions: { path: '/' },
		introspection: true
	});

	await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

	server.listen().then(({ url, subscriptionsUrl }) => {
		console.log(`🚀 Server ready at ${url}`)
		console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`)
	});
}

const startServerDev = async () => {
	const server = new ApolloServerExpress({ typeDefs, resolvers });

	const app = express();
	createFilesRoutes(app);
	server.applyMiddleware({ app });
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);

	await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

	});
}

startServerProd();
