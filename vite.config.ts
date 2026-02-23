import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { fileURLToPath, URL } from "url";

export default defineConfig({
  plugins: [react(), svgr()],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  build: {
    outDir: "dist",
    sourcemap: false,
  },

  server: {
    port: 5173,
  },
});


































































































// import { defineConfig } from "vite";
// import { miaodaDevPlugin } from "miaoda-sc-plugin";
// import react from "@vitejs/plugin-react";
// import svgr from "vite-plugin-svgr";
// import path from "path";

// // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [
// //     react(),
// //     miaodaDevPlugin(),
// //     svgr({
// //       svgrOptions: {
// //         icon: true,
// //         exportType: "named",
// //         namedExport: "ReactComponent",
// //       },
// //     }),
// //   ],
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"),
// //     },
// //   },
// // });

// export default defineConfig({
//   plugins: [
//     react(),
//     miaodaDevPlugin(),
//     svgr({
//       svgrOptions: {
//         icon: true,
//         exportType: "named",
//         namedExport: "ReactComponent",
//       },
//     }),
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"),
//     },
//   },

//   build: {
//     outDir: "dist",
//   },

//   server: {
//     historyApiFallback: true,
//   },
// });
