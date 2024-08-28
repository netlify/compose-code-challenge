import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { Config, Context } from "@netlify/edge-functions";

let buffer = '';

class UserElementHandler {
  async element(element) {
    const url = element.getAttribute('href');

    console.log(`Fetching ${url}`);
    
    
    let response = await fetch(new Request(url));
    if(response.ok) {
      console.log(`Inserting response from ${url}`);
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

  // console.log(Netlify.env.has("CONTEXT"));
  const resp = await context.next();
  

  return new HTMLRewriter()
    .on('netlify-edge-include', new UserElementHandler())
    .transform(resp);
};

export const config: Config = {
  path: "*",
};
