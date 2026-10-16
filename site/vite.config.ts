import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin, type ViteDevServer } from 'vite';

/** Preview: clean URLs (/work → /work/index.html) and the 404 page, as on Vercel. */
function cleanUrlsPreview(): Plugin {
  return {
    name: 'oc-clean-urls-preview',
    configurePreviewServer(server) {
      const dist = path.resolve(server.config.root, server.config.build.outDir);
      server.middlewares.use((req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        if (path.extname(url.pathname)) return next();
        const file = path.join(dist, url.pathname, 'index.html');
        if (fs.existsSync(file)) {
          req.url = path.posix.join(url.pathname, 'index.html') + url.search;
          return next();
        }
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(path.join(dist, '404.html')));
      });
    }
  };
}

/**
 * Dev: render pages on request with Lit SSR (same code path as the prerenderer),
 * so `npm run dev` shows exactly what the build ships, with HMR for client code.
 */
function litSsrDev(): Plugin {
  return {
    name: 'oc-lit-ssr-dev',
    configureServer(server: ViteDevServer) {
      server.watcher.add(new URL('./content', import.meta.url).pathname);
      server.watcher.on('change', async file => {
        if (file.endsWith('.md')) {
          const mod = await server.ssrLoadModule('/src/entry-server.ts');
          mod.invalidatePosts();
          server.ws.send({ type: 'full-reload' });
        }
      });
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url ?? '/', 'http://localhost');
        const accept = req.headers.accept ?? '';
        if (req.method !== 'GET' || !accept.includes('text/html'))
          return next();
        try {
          const mod = await server.ssrLoadModule('/src/entry-server.ts');
          const pages = await mod.getPages();
          const path = url.pathname.replace(/\/+$/, '') || '/';
          const page =
            pages.find((p: { path: string }) => p.path === path) ??
            pages.find((p: { path: string }) => p.path === '/404');
          const head =
            '<script type="module" src="/src/entry-client.ts"></script>';
          let html = await mod.renderPage(page, { head });
          html = await server.transformIndexHtml(url.pathname, html);
          res.statusCode = page.path === '/404' && path !== '/404' ? 404 : 200;
          res.setHeader('Content-Type', 'text/html; charset=utf-8');
          res.end(html);
        } catch (e) {
          server.ssrFixStacktrace(e as Error);
          next(e);
        }
      });
    }
  };
}

export default defineConfig({
  appType: 'mpa',
  plugins: [litSsrDev(), cleanUrlsPreview()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      input: 'src/entry-client.ts'
    }
  },
  preview: {
    port: 4173
  }
});
