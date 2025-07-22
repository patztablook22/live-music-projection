import { defineConfig } from 'vite';

export default defineConfig({
    root: 'src',
    define: {
        global: 'window',
    },

    optimizeDeps: {
        exclude: ["onnxruntime-web"],
    },
});
