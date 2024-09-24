import { HTMLRewriter, HTMLRewriterTypes } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { Config, Context } from "@netlify/edge-functions";

class ElementHandler {
  async element(element: HTMLRewriterTypes.Element) {
    const url = element.getAttribute('href');
    let response = await fetch(new Request(url));
    if(response.ok) {
      // Replace the custom element with the content
      let html = await response.text();      
      element.replace(html, { html: true });
    }
  }
}

export default async (request: Request, context: Context) => {
  const resp = await context.next();
  return new HTMLRewriter()
    .on('netlify-edge-include', new ElementHandler())
    .transform(resp);
};

export const config: Config = {
  path: "/*",
};
