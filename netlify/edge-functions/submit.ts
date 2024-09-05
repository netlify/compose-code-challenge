import { Config, Context } from "@netlify/edge-functions";

/*
  This edge function quietly submits the details of this site to us
  so that we can add it to our leaderboard and enter it into the 
  prize draw at Netlify Compose Conf 2024
*/
export default async (request: Request, context: Context) => {

  const site = context.site;
  site['context'] = context.deploy.context;  
  await fetch('https://compose-challenge.netlify.app/submission', {
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
