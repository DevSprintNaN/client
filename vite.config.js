import { defineConfig } from 'vite'
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc'

export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};
  console.log(process.env.VITE_BASE_URL);
  return defineConfig({
    plugins: [react()],
    server: {
      proxy:{
        '/server': {
          target: process.env.VITE_BASE_URL,
          changeOrigin: true,
          secure: false,      
          ws: true,
          rewrite: (path) => path.replace(/^\/server/, '')
        }
      }
    },
  });
};