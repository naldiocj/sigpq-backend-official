export default interface PessoafisicaENTRADA {
  id: number
  foto_civil?: string
  apelido: string
  genero: string
  nome_mae: string
  nome_pai: string
  regime_id: number
  data_nascimento: Date
  nacionalidade_id: number
  estado_civil_id: number
}
