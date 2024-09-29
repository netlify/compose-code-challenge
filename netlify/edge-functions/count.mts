import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import type { Context, Config } from '@netlify/edge-functions';
import { getStore } from '@netlify/blobs';

export default async (_request: Request, context: Context) => {
  const store = getStore('myCounter');
  const count: number = parseInt(await store.get('count')) || 0;

  const resp = await context.next();
  return new HTMLRewriter()
    .on('#ccc-vote-count', {
      element(element) {
        element.setInnerContent(count.toString());
      },
    })
    .transform(resp);
};

// Configure the path for the edge function
export const config: Config = {
  path: '/',
};
