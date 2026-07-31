import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * Serves the Vercel function in `api/` during `npm run dev`, so the consultation
 * form behaves locally exactly as it does in production. In production Vercel
 * serves `api/consultation.js` itself and this plugin never runs.
 */
function devApiPlugin(): Plugin {
  return {
    name: "dev-api-routes",
    apply: "serve",
    configureServer(server: ViteDevServer) {
      server.middlewares.use("/api/consultation", async (req, res) => {
        try {
          const chunks: Buffer[] = [];
          for await (const chunk of req) chunks.push(chunk as Buffer);
          const rawBody = Buffer.concat(chunks).toString("utf8");

          const mod = await server.ssrLoadModule("/api/consultation.js");

          // Minimal Vercel-style response shim.
          const vercelRes = Object.assign(res, {
            status(code: number) {
              res.statusCode = code;
              return vercelRes;
            },
            json(body: unknown) {
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(body));
              return vercelRes;
            },
          });

          await mod.default(
            { method: req.method, headers: req.headers, body: rawBody },
            vercelRes
          );
        } catch (error) {
          console.error("[dev-api] /api/consultation failed:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "Dev API handler error" }));
        }
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Expose non-VITE_ vars (RESEND_API_KEY etc.) to the dev API handler only.
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""));

  return {
    plugins: [react(), devApiPlugin()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: 8088,
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            three: ["three"],
            gsap: ["gsap", "lenis"],
            react: ["react", "react-dom", "react-router-dom"],
          },
        },
      },
    },
  };
});
