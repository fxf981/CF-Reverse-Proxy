// @ts-nocheck

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  async function handleRequest(request) {
    // 定义要代理的目标 URL
    const targetURL = 'api.telegram.org'; // 将 example.com 替换为你要代理的目标网站的 URL
  
    // 构建新的请求对象，将请求发送到目标 URL
    const proxyRequest = new Request(targetURL, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
  
    try {
      // 发送代理请求，并获取目标网站的响应
      const response = await fetch(proxyRequest);
  
      // 构建新的响应对象，将目标网站的响应返回给客户端
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers
      });
    } catch (error) {
      // 发生错误时返回错误响应
      return new Response('Error: ' + error.message, { status: 500 });
    }
  }
  