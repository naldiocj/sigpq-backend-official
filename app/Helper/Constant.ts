const SCHEDULE_STATUS = {'expired': 'expired', 'safe': 'safe', 'to_expire': 'to_expire', 'no_operation': 'no_operation'};

const SCHEDULE_RECURRENCE_BY_NUMBER_ARRAY = [
    'mes',
    'bimestre',
    'trimestre',
    'semestre',
]


module.exports = { 
     SCHEDULE_STATUS,
     RECURRENCES:{
       year: ['Ano'],
     },
     PERIODTOSUBMIT:{
       //[RECURRENCE_MONTHLY]: {[FEB]:'Janeiro', [MAR]: 'Fevereiro', [APR]: 'Março', [MAY]: 'Abril', [JUN]: 'Maio', [JUL]: 'Junho', [AUG]: 'Julho', [SEP]: 'Agosto', [OCT]: 'Setembro', [NOV]: 'Outubro', [DEC]: 'Novembro'},
       //[RECURRENCE_BIMESTER]: {[I_BIMESTER]: 'Iº Bimestre', [II_BIMESTER]: 'IIº Bimestre', [III_BIMESTER]: 'IIIº Bimestre', [IV_BIMESTER]: 'IVº Bimestre', [V_BIMESTER]: 'Vº Bimestre'},
       //[RECURRENCE_TRIMESTER]: {[I_TRIMESTER]: 'Iº Trimestre', [II_TRIMESTER]: 'IIº Trimestre', [III_TRIMESTER]: 'IIIº Trimestre'},
       //[RECURRENCE_SEMESTER]: {[I_SEMESTER]: 'Iº Semestre'}
     },
     COLUMN_BY_RECURRENCE_AND_INTERVAL: {
       //[RECURRENCE_MONTHLY]: { [JAN]: 'Dezembro' ,[FEB]:'Janeiro', [MAR]: 'Fevereiro', [APR]: 'Março', [MAY]: 'Abril', [JUN]: 'Maio', [JUL]: 'Junho', [AUG]: 'Julho', [SEP]: 'Agosto', [OCT]: 'Setembro', [NOV]: 'Outubro', [DEC]: 'Novembro'},
       //[RECURRENCE_BIMESTER]: { [JAN]: 'VIº Bimestre' ,[FEB]:'VIº Bimestre', [MAR]: 'Iº Bimestre', [APR]: 'Iº Bimestre', [MAY]: 'IIº Bimestre', [JUN]: 'IIº Bimestre', [JUL]: 'IIIº Bimestre', [AUG]: 'IIIº Bimestre', [SEP]: 'IVº Bimestre', [OCT]: 'IVº Bimestre', [NOV]: 'Vº Bimestre', [DEC]: 'Vº Bimestre' },
       //[RECURRENCE_TRIMESTER]: { [JAN]: 'IVº Trimestre' ,[FEB]:'IVº Trimestre', [MAR]: 'IVº Trimestre', [APR]: 'Iº Trimestre', [MAY]: 'Iº Trimestre', [JUN]: 'Iº Trimestre', [JUL]: 'IIº Trimestre', [AUG]: 'IIº Trimestre', [SEP]: 'IIº Trimestre', [OCT]: 'IIIº Trimestre', [NOV]: 'IIIº Trimestre', [DEC]: 'IIIº Trimestre' },
       //[RECURRENCE_SEMESTER]: { [JAN]: 'IIº Semestre' ,[FEB]:'IIº Semestre', [MAR]: 'IIº Semestre', [APR]: 'IIº Semestre', [MAY]: 'IIº Semestre', [JUN]: 'IIº Semestre', [JUL]: 'Iº Semestre', [AUG]: 'Iº Semestre', [SEP]: 'Iº Semestre', [OCT]: 'Iº Semestre', [NOV]: 'Iº Semestre', [DEC]: 'Iº Semestre' },
     },
     LAST_PERIOD: {
       //[RECURRENCE_MONTHLY]: 'Dezembro',
       //[RECURRENCE_BIMESTER]: 'VIº Bimestre',
       //[RECURRENCE_TRIMESTER]: 'IVº Trimestre',
       //[RECURRENCE_SEMESTER]: 'IIº Semestre',
     }
   }
   
   