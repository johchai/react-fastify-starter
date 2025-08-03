// TODO: remove this if unused & update the wrangler config

// production
// export default {
//   fetch(request) {
//     const url = new URL(request.url);

//     if (url.pathname.startsWith("/api/")) {
//       return Response.json({
//         name: "Cloudflare"
//       });
//     }
//     return new Response(null, { status: 404 });
//   }
// } satisfies ExportedHandler<Env>;

// development
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    // If the path starts with /api/, forward the request to your real backend
    if (url.pathname.startsWith("/api/")) {
      const backendUrl = new URL(request.url);
      backendUrl.hostname = "localhost"; // Change this to your backend domain
      backendUrl.port = "4005"; // remove port if you're switching to prod domain
      backendUrl.protocol = "http:";

      const proxiedRequest = new Request(backendUrl.toString(), request);
      return fetch(proxiedRequest);
    }

    return new Response(null, { status: 404 });
  }
};
