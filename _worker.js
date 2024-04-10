/**
 * Welcome to Cloudflare Pages! This is your first page.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your page in action
 * - Run "npm run deploy" to publish your page
 *
 * Learn more at https://developers.cloudflare.com/pages/
 */

const tg_host = "api.telegram.org";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    url.host = tg_host;

    const proxyRequest = new Request(url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    const result = await fetch(proxyRequest);
    return result;
  },
};