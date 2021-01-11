import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import mongoose from 'mongoose';
import {typeDefs} from './typeDefs'
import {resolvers} from './resolvers';
import path from 'path'
import {createFilesRoutes} from './fileManager';


const startServer = async () => {
	const server = new ApolloServer({	typeDefs, resolvers	});

	const app = express();
	createFilesRoutes(app);
	server.applyMiddleware({ app });
	mongoose.set('useNewUrlParser', true);
	mongoose.set('useFindAndModify', false);
	mongoose.set('useCreateIndex', true);
	mongoose.set('useUnifiedTopology', true);
	console.log(path.join(__dirname, '../public'));
	app.use(express.static(path.join(__dirname, '../public')));
	await mongoose.connect('mongodb://localhost:27017/brand-it', {useNewUrlParser: true, useUnifiedTopology: true});

	app.listen({ port: 4000 }, () => {
		console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);

	});

};

startServer();
