/*
 * Enhance the returned HTML by adding a link to the repository URL
 */

import {
  HTMLRewriter,
  HTMLRewriterTypes,
} from "https://ghuc.cc/worker-tools/html-rewriter/index.ts";
import { Config, Context } from "@netlify/edge-functions";
import * as data from "../data.json" assert { type: "json" };

export default async (request: Request, context: Context) => {
  const resp = await context.next();
  const { repoURL } = data.default;
  return new HTMLRewriter()
    .on('*[data-nf-enhance="repo-link"]', {
      element(element) {
        element.prepend(`<a href="${repoURL}/blob/main/www/index.html">`, {
          html: true,
        });
        element.append(`</a>`, { html: true });
        element.removeAndKeepContent();
      },
    })
    .transform(resp);
};

export const config: Config = {
  path: "/",
};
