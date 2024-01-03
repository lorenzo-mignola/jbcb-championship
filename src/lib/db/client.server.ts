import { MongoClient, ServerApiVersion } from 'mongodb';

import { MONGODB_URI } from '$env/static/private';

export const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
});

export const closeConnection = async () => {
  await client.close();
  console.log('Connection close');
};

export const db = client.db('jbcb-championship');
