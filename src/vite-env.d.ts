// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_IMAGE_HOSTING_KEY: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  