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
// export default {
//   async fetch(request, env, ctx) {
//     const url = new URL(request.url);

//     // 从 URL 路径中提取主机信息
//     const [, host, ...rest] = url.pathname.split('/');

//     // 重新构建请求 URL
//     const proxyUrl = new URL(`${host}/${rest.join('/')}`);
//     proxyUrl.search = url.search;

//     const proxyRequest = new Request(proxyUrl, {
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
    try {
      const url = new URL(request.url);

      // 从路径中提取嵌套的目标 URL
      const targetUrl = url.pathname.slice(1); // 去掉路径开头的 '/'
      const decodedUrl = decodeURIComponent(targetUrl); // 解码 URL

      if (!decodedUrl.startsWith('http://') && !decodedUrl.startsWith('https://')) {
        return new Response('Invalid target URL.', { status: 400 });
      }

      // 创建代理请求
      const proxyRequest = new Request(decodedUrl, {
        method: request.method,
        headers: request.headers,
        body: request.body,
      });

      // 发送代理请求
      const response = await fetch(proxyRequest);

      // 返回代理请求的响应
      return new Response(response.body, {
        status: response.status,
        headers: response.headers,
      });
    } catch (err) {
      return new Response(`Error: ${err.message}`, { status: 500 });
    }
  },
};
