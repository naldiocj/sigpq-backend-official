export const getLogFormated = (user: any,  endpoint: string, resource: string,) =>
  `O utilizador  ${
    user.username
  } acessou ${endpoint} ${resource} no dia ${new Date().toLocaleString(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Garante o formato 24 horas
    }
  )}`;
