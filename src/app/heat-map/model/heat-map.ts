export interface HeatMap {
    nomeHorario: string;
    listaDetalhes: HeatMapDetalhe[];
}

export interface HeatMapDetalhe {
    diaSemana: string;
    contagem: number;
}
