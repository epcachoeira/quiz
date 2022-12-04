/*
    Esta função recebe um array e gera um novo adicionando um número aleatório
    Depois classifica o array gerado pelo número aleatório
    No final, restaura o array original e devolve como resultado da função
*/

export function embaralhar(elementos: any[]): any[] {
    return elementos
        .map(valor => ({ valor, aleatorio: Math.random() }))
        .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio)
        .map(obj => obj.valor)
}