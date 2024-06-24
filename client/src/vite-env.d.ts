/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AUTH_CLIENTID: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_AUTH_AUDIENCE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
