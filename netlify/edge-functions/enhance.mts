/**
 * Enhance the returned HTML by adding a link to the repository URL
 */
import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';
import { Config, Context } from '@netlify/edge-functions';
import data from '../data.json' with { type: 'json' };

export default async (_request: Request, context: Context) => {
  const resp = await context.next();

  // For convenience, the build stashed the repo URL in the site metadata for us
  // to use
  const repoURL = data.default.repoURL;
  if (!repoURL) {
    // No repoURL will have been stashed unless we ran `ntl build` locally,
    // or the site was deployed to Netlify
    console.log('No repoURL found. Run `ntl build` first to enable this feature locally.');
    return resp;
  }

  return new HTMLRewriter()
    .on('*[data-nf-enhance="repo-link"]', {
      element(element) {
        element.prepend(`<a href="${repoURL}" target="_blank">`, {
          html: true,
        });
        element.append(`</a>`, { html: true });
        element.removeAndKeepContent();
      },
    })
    .on('*[data-nf-enhance="repo-link-index.html"]', {
      element(element) {
        element.prepend(`<a href="${repoURL}/blob/main/www/index.html" target="_blank">`, {
          html: true,
        });
        element.append(`</a>`, { html: true });
        element.removeAndKeepContent();
      },
    })
    .transform(resp);
};

export const config: Config = {
  path: '/',
  onError: 'bypass',
};
