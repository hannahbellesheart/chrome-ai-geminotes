import path from 'path';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        viteStaticCopy({
            targets: [{ src: 'public/manifest.json', dest: '.' }],
        }),
    ],
    build: {
        outDir: 'build',
        rollupOptions: {
            input: {
                main: './index.html',
            },
        },
    },
    resolve: {
        alias: {
            '@geminotes/atoms': path.resolve(
                __dirname,
                './src/components/atoms/'
            ),
            '@geminotes/molecules': path.resolve(
                __dirname,
                './src/components/molecules/'
            ),
            '@geminotes/organisms': path.resolve(
                __dirname,
                './src/components/organisms/'
            ),
            '@geminotes/templates': path.resolve(
                __dirname,
                './src/components/templates/'
            ),
            '@geminotes/pages': path.resolve(__dirname, './src/pages/'),
            '@geminotes/themes': path.resolve(__dirname, './src/themes/'),
            '@geminotes/stores': path.resolve(__dirname, './src/stores/'),
            '@geminotes/api': path.resolve(__dirname, './src/api/'),
            '@geminotes/utils': path.resolve(__dirname, './src/utils/'),
            '@geminotes/models': path.resolve(__dirname, './src/models/'),
            '@geminotes/urls': path.resolve(__dirname, './src/constants/urls/'),
            '@geminotes/images': path.resolve(
                __dirname,
                './src/constants/images'
            ),
            '@geminotes/props': path.resolve(
                __dirname,
                './src/constants/props'
            ),
            '@geminotes/translations': path.resolve(
                __dirname,
                './src/constants/translations'
            ),
        },
    },
});
