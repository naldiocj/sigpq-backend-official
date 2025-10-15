// App/Config/logRules.ts

export const LogRules = {
  // Lista de prefixos de rotas que devem ser ignorados
  skipPrefixes: [
    '/health',
    '/docs',
    '/metrics',
    '/favicon.ico',
  ],

  // Lista de prefixos de rotas que devem ser ignorados, mas com exceção de alguns parâmetros de consulta
  skipQuerySearchBelow: {
    '/sicgo': 5,
    '/sigae': 5,
    '/sigoe': 5,
  },

  // Lista de rotas que devem ser ignoradas, mas com exceção de alguns parâmetros de consulta
  skipQuerySearchExact: {
    '/sicgo': [''],
    '/sigae': [''],
    '/sigoe': [''],
  },

  // Lista de rotas que devem ser ignoradas, mas com exceção de alguns parâmetros de consulta
  skipQuerySearchContains: {
    '/sicgo': ['search', 'q'],
    '/sigae': ['search', 'q'],
    '/sigoe': ['search', 'q'],
  },

  // Lista de rotas que devem ser ignoradas, mas com exceção de alguns parâmetros de consulta
  skipQuerySearchRegex: {
    '/sicgo': [/^search=/, /^q=/],
    '/sigae': [/^search=/, /^q=/],
    '/sigoe': [/^search=/, /^q=/],
  },

  // Lista de rotas que devem ser ignoradas, mas com exceção de alguns parâmetros de consulta
  skipQuerySearchStartsWith: {
    '/sicgo': ['search', 'q'],
    '/sigae': ['search', 'q'],
    '/sigoe': ['search', 'q'],
  },
}
