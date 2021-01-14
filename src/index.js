import { ApolloServer } from 'apollo-server-express';
import dotenv from 'dotenv'
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';
import {createFilesRoutes} from './fileManager/localFileManager';
import "regenerator-runtime/runtime.js";

dotenv.config();

const startServer = async () => {
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		subscriptions: { path: '/' }
	});

	const app = express();
	if (process.env.NODE_ENV === 'development') {
		createFilesRoutes(app);
	}
	server.applyMiddleware({app});

	await mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});

	server.listen().then(({ url, subscriptionsUrl }) => {
		console.log(`🚀 Server ready at ${url}`)
		console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`)
	});
}

startServer();
