import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 5173, // Change from default 5173
		open: true, // Auto-open browser
		host: true, // or "0.0.0.0"
		strictPort: true,
		watch: {
			usePolling: true, // helpful on some host OSes
		},
	},
});
