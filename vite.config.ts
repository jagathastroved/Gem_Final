import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      {
        name: 'trailing-slash-redirect',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.originalUrl === '/gemstone-report') {
              res.statusCode = 301;
              res.setHeader('Location', '/gemstone-report/');
              res.end();
            } else {
              next();
            }
          });
        }
      }
    ],
    base: "/gemstone-report/",
    build: {
      target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari13'],
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 6825,
      allowedHosts: ["astropedia-ai.astroved.com"],

      // local Project Run Uncommend this 

      proxy: {
        '/gemstone-report/api': {
          target: 'https://astropedia-ai.astroved.com',
          changeOrigin: true,
          secure: false,
        }
      },

      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    preview: {
      host: "127.0.0.1",
      port: 6825,
    },
  };
});
