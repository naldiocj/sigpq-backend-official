
type AnyObject = Record<string, any>;

function mapearCampos<T extends AnyObject, K extends keyof T>(
  objeto: T,
  campos: K[],
  valoresIniciais: Partial<T> = {}
): Partial<T> {
  const camposFaltantes = campos.filter((campo) => !objeto[campo] && !valoresIniciais[campo]);

  if (camposFaltantes.length > 0) {
    throw new Error(`Campos em falta na requisição : ${camposFaltantes.join(", ")}`);
  }

  return campos.reduce((acc, campo) => {
    if (objeto[campo] || valoresIniciais[campo]) {
      acc[campo] = objeto[campo] || valoresIniciais[campo];
    }
    return acc;
  }, {} as Partial<T>);
}

module.exports = mapearCampos
