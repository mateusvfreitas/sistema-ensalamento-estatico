export interface HeatMap {
    nomeHorario: string;
    listaDetalhes: HeatMapDetalhe[];
    media: number;
}

export interface HeatMapDetalhe {
    diaSemana: string;
    contagem: number;
}
