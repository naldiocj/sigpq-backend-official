# TODO: Seed `modulo_sigpq_74_gerir_usuarios_sic.ts`

## 1. Remover usuários (hard delete completo)

Para cada email abaixo, remover registros em **todas as tabelas relacionais**:

**Emails para remover:**
- simao.eduardo@sic.gov.ao
- miguel.xavier@sic.gov.ao
- madalena.dongoxi@sic.gov.ao
- octavia.calembe@sic.gov.ao

**Ordem de deleção:**
1. `sigpq_funcionario_orgaos` WHERE pessoafisica_id = pessoa_id
2. `pessoajuridicas` WHERE id = pessoa_id
3. `user_roles` WHERE user_id = user.id
4. `users` WHERE id = user.id
5. `pessoafisicas` WHERE id = pessoa_id
6. `pessoas` WHERE id = pessoa_id

## 2. Adicionar novos usuários (via ORM)

| Nome | Email | Username | ordem | gen |
|------|-------|----------|:---:|:---:|
| Ludimilo Matoso | ludimilo.matoso@sic.gov.ao | ludimilo.matoso | 115 | M |
| Diamantino Simão | diamantino.simao@sic.gov.ao | diamantino.simao | 116 | M |
| Eduardo Bengue | eduardo.bengue@sic.gov.ao | eduardo.bengue | 117 | M |
| Augusto Bige | augusto.bige@sic.gov.ao | augusto.bige | 118 | M |

**Configurações:**
- role_id: 1 (admin)
- user_id (criador): 1
- password: `12345678` (hash via `UserHelper.generatePasswordWithSalt`)
- descricao: `'Criado automaticamente pelo sistema.'`
- Pessoafisica: `apelido: 'XXX'`, `nome_pai: 'XXX'`, `nome_mae: 'XXX'`, `data_nascimento: new Date('2000-01-01')`, `nacionalidade_id: 1`, `estado_civil_id: 1`, `regime_id: 1`

## 3. Arquivo

`seeds/modulo_sigpq_74_gerir_usuarios_sic.ts`
