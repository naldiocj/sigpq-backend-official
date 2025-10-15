// import { DateTime } from "luxon"

export default interface PessoaENTRADA {
  id?: number
  numero_ordem?: number
  nome_completo: string
  tipo: string
  activo?: boolean
  user_id: number
}
