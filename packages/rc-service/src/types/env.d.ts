declare global {
  interface Window {}
}

export {}

declare global {
  interface Window {}

  namespace NodeJS {
    interface ProcessEnv {
      appEnv: 'local' | 'development' | 'production'
      connectClientId?: string
      connectOAuthUrl?: string
      connectUserPoolId?: string
      domainMappings?: string
      sentryDsn: string
    }
  }
}
