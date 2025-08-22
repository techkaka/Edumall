/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_API_URL: string
  readonly VITE_APP_CDN_URL: string
  readonly VITE_APP_VERSION: string
  readonly VITE_APP_BUILD_TIME: string
  readonly VITE_APP_ENV: string
  readonly VITE_APP_ENABLE_ANALYTICS: string
  readonly VITE_APP_ENABLE_ERROR_REPORTING: string
  readonly VITE_APP_ENABLE_SERVICE_WORKER: string
  readonly MODE: string
  readonly NODE_ENV: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
