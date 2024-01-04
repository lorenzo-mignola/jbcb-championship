/* eslint-disable no-console -- used for debug */
import { client } from '$lib/db/client.server';

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch {
    console.error('Unable to start mongodb connection');
  }
}

await run();
