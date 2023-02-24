declare namespace NodeJS {
  interface ProcessEnv {
    // ...
    // Add your own env variables here
    // ...
    PORT: string
    DB_HOST: string
    DB_PORT: string
    DB_USER: string
    DB_PASSWORD: string
    DB_NAME: string
    HASH_SALT: string
    JWT_SECRET: string
    SENTRY_DSN: string
    SENTRY_ENABLED: boolean
  }
}
