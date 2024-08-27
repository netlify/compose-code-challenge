import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { Config, Context } from "@netlify/edge-functions";

let buffer = '';

class UserElementHandler {
  async element(element) {
    const url = element.getAttribute('href');
    let response = await fetch(new Request(url));
    if(response.ok) {
      // Replace the custom element with the content
      let html = await response.text();      
      element.replace(html, { html: true });
    }
  }
}

async function handleElement(text){
  console.log(text);
}

export default async (request: Request, context: Context) => {

  console.log(Netlify.env.has("CONTEXT"));
  

  return new HTMLRewriter()
    .on('netlify-edge-include', new UserElementHandler())
    .transform(await context.next());
};

export const config: Config = {
  path: "*",
};
