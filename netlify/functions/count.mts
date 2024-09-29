import type { Context, Config } from '@netlify/functions';
import { getStore } from '@netlify/blobs';

export default async (req: Request, context: Context) => {
  //
  //  Create a blob store to hold a counter
  //
  // const store = getStore('myCounter');
  // let count: number = parseInt(await store.get('count')) || 0;
  //
  //  Depending on the HTTP method, either return the value from the blob store
  //  or increment the count and then return it.
  //
  // const method = req.method;
  // if (method === 'GET') {
  //   return new Response(count.toString());
  // } else if (method === 'POST') {
  //   count = count + 1;
  //   await store.set('count', count.toString());
  //   return new Response(count.toString());
  // }
};

//
//  Configure the path for the edge function
//
export const config: Config = {
  path: '/api/count',
};
