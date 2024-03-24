export interface Page<T> {
    content: T[]; // Array de elementos da página
    totalPages: number; // Número total de páginas
    totalElements: number; // Número total de elementos
    size?: number; // Tamanho da página (opcional)
    number?: number; // Número da página atual (opcional)
    first?: boolean; // Indica se é a primeira página (opcional)
    last?: boolean; // Indica se é a última página (opcional)
  }