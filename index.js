// index.js
async function handleRequest(request) {
  // 获取原始请求的 URL
  const url = new URL(request.url);

  // 构建要转发的请求
  const forwardRequest = new Request(`https://api.telegram.org${url.pathname}`, {
    headers: request.headers,
    method: request.method,
    body: request.body,
  });

  // 发送转发请求并返回响应
  const response = await fetch(forwardRequest);
  return response;
}

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request));
});