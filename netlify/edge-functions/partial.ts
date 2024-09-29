/**
 * Render a local partial HTML file into the page.
 */

import { HTMLRewriter, type Element } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { Config, Context } from '@netlify/edge-functions';

class ElementHandler {
  private origin: string;

  constructor(origin: string) {
    this.origin = origin;
  }

  async element(element: Element) {
    const name = element.getAttribute('name');
    if (!name) {
      console.log('Missing name attribute found for partial');
      return;
    }

    const relPath = `/partials/${name}.html`;
    const url = new URL(relPath, this.origin);

    const response = await fetch(new Request(url));

    if (response.status === 404) {
      console.log(
        `Partial not found: ${name}. Add a file named ${name}.html to the www/partials folder.`,
      );
    }

    if (response.ok) {
      const html = await response.text();
      element.replace(html, { html: true });
    }
  }
}

export default async (request: Request, context: Context) => {
  const resp = await context.next();
  const origin = new URL(request.url).origin;
  return new HTMLRewriter().on('partial', new ElementHandler(origin)).transform(resp);
};

export const config: Config = {
  path: '/*',
  onError: 'bypass',
};
