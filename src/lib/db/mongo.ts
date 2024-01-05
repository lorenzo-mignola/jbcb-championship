import { MONGODB_URI } from '$env/static/private';
import { MongoClient, ServerApiVersion } from 'mongodb';

export const mongoClient = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const db = mongoClient.db('jbcb-championship');
