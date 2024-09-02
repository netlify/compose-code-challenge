import { Config, Context } from "@netlify/edge-functions";


export default async (request: Request, context: Context) => {

  const site = context.site;
  site['context'] = context.deploy.context;  
  await fetch('https://compose-code-challenge.netlify.app/submissions', {
  // await fetch('http://localhost:8000/submissions', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(site)
  });
};

export const config: Config = {
  path: "/",
};
