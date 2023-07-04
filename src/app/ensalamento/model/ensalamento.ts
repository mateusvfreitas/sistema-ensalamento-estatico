export interface Ensalamento {
    nomeHorario: string;
    listaDetalhes: EnsalamentoDetalhe[];
}

export interface EnsalamentoDetalhe {
    diaSemana: string;
    codigoDisciplina: string;
    turma: string;
}
