//
let Reverse_url = 'https://api.telegram.org';
Reverse_url = env.Reverse_url || Reverse_url;

export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      if (url.pathname.startsWith('/')) {
        url.hostname = Reverse_url
        let new_request = new Request(url, request);
        return fetch(new_request);
      }
      return env.ASSETS.fetch(request);
    },
  };