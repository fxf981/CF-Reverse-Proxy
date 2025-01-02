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

/**
 * Welcome to Cloudflare Pages! This is your first page.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your page in action
 * - Run "npm run deploy" to publish your page
 *
 * Learn more at https://developers.cloudflare.com/pages/
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 从 URL 路径中提取主机信息
    const [, host, ...rest] = url.pathname.split('/');

    // 如果路径中没有有效的主机信息或其余部分，返回提示页面
    if (!host || !rest.length) {
      return new Response(
        `<!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome</title>
            <style>
              body { font-family: Arial, sans-serif; text-align: center; padding: 2rem; }
              h1 { color: #333; }
              p { color: #555; }
            </style>
          </head>
          <body>
            <h1>Welcome to Cloudflare Pages!</h1>
            <p>No content was submitted. Please provide a valid URL path.</p>
          </body>
          </html>`,
        { headers: { 'Content-Type': 'text/html' }, status: 400 }
      );
    }

    // 重新构建请求 URL
    const proxyUrl = new URL(`${host}/${rest.join('/')}`);
    proxyUrl.search = url.search;

    const proxyRequest = new Request(proxyUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
    });

    // 转发请求
    try {
      const result = await fetch(proxyRequest);
      return result;
    } catch (error) {
      return new Response(
        `Error occurred while processing your request: ${error.message}`,
        { status: 500 }
      );
    }
  },
};
