declare module '@ioc:Adonis/Core/Event' {
    type Evento = 'LOGIN' | 'LOGOUT' | 'REGISTAR' | 'ELIMINAR' | 'ATUALIZAR' | 'VISUALIZACAO' | 'LISTAGEM';
    type Method = 'POST' | 'GET' | 'FILE' | 'PUT' | 'DELETE';
    interface EventsList {
        'logs:registar': {
            utilizador: Object,
            evento: Evento,
            tabela: String | undefined | null,
            tabela_id: String | Number | null,
            orgao: Number | String,
            message: String,
            success: Boolean,
            url: String,
            old_data: Object,
            new_data: Object,
            method: Method,
            created_at: Date,
            versao: String,
            obs: String,
        },
        // 'utilizador:listar': { id: number; email: string },
        'agente:registar': { id: number; email: string },
        'agente:listar': { id: number; email: string },
        'login': { id: number; email: string },
        'logout': { id: number; email: string }
    }
}
