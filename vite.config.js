import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			pages: '/src/pages',
			components: '/src/components',
			molecules: '/src/molecules',
			UI: '/src/UI',
			assets: '/src/assets',
			customHooks: '/src/customHooks',
			utils: '/src/utils',
		},
	},
});
