export interface Usuario {
    id: number;
    nome: string;
    username: string;
    email: string;
    isAdmin: boolean;
}

export interface UsuarioSimplificado {
    username: string;
    isAdmin: boolean;
}
