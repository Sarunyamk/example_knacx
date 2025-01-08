import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/example-knacx/",
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"], // แยก React ออกเป็นไฟล์ของตัวเอง
          vendor: ["axios", "lodash"], // แยก Libraries อื่น
        },
      },
    },
    chunkSizeWarningLimit: 600, // ขยายขีดจำกัดการเตือน
  },
});
