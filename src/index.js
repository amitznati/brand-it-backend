import { ApolloServer } from 'apollo-server';
import dotenv from 'dotenv'
// import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';
import path from 'path'
import {createFilesRoutes} from './fileManager';

dotenv.config();
const startServer = async () => {
	const server = new ApolloServer
	({
			typeDefs,
			resolvers,
			subscriptions: { path: '/' }
		});

	// const uri = 'mongodb+srv://amitznati:Nvrcungahl26@cluster0.smxxf.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&ssl=true';
	const uri = process.env.DB_URL; //'mongodb://localhost:27017/brand-it';

	await mongoose.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		serverSelectionTimeoutMS: 5000
	}).catch(err => console.log(err));
	server.listen().then(({ url, subscriptionsUrl }) => {
		console.log(`🚀 Server ready at ${url}`)
		console.log(`🚀 Susbscription ready at ${subscriptionsUrl}`)
	});
};

startServer();
