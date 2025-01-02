/**
 * Welcome to Cloudflare Pages! This is your first page.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your page in action
 * - Run "npm run deploy" to publish your page
 *
 * Learn more at https://developers.cloudflare.com/pages/
 */

// const host = "api.telegram.org";
// export default {
//   async fetch(request, env, ctx) {
//     const url = new URL(request.url);
//     url.host = host;

//     const proxyRequest = new Request(url, {
//       method: request.method,
//       headers: request.headers,
//       body: request.body,
//     });

//     const result = await fetch(proxyRequest);
//     return result;
//   },
// };
/**
 * Welcome to Cloudflare Pages! This is your first page.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your page in action
 * - Run "npm run deploy" to publish your page
 *
 * Learn more at https://developers.cloudflare.com/pages/
 */

// export default {
//   async fetch(request, env, ctx) {
//     const url = new URL(request.url);
//     const host = url.searchParams.get('host') || 'api.telegram.org';

//     const proxyRequest = new Request(`https://${host}${url.pathname}`, {
//       method: request.method,
//       headers: request.headers,
//       body: request.body,
//     });

//     const result = await fetch(proxyRequest);
//     return result;
//   },
// };
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 从 URL 路径中提取主机信息
    const [, host, ...rest] = url.pathname.split('/');

    // 重新构建请求 URL
    const proxyUrl = new URL(`${host}/${rest.join('/')}`);
    proxyUrl.search = url.search;

    const proxyRequest = new Request(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    const result = await fetch(proxyRequest);
    return result;
  },
};

