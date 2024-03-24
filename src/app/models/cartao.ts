import { Cliente } from "./cliente";

export interface CartaoResponse {
  content: Cartao[]; // Array de cartões
  // Outras propriedades de paginação, se necessário
}

export interface Cartao{
  id:number;
  numeroCartao:string;
  dataValidade:string;
  cvv:string;
  limiteCartao:number;
  status:boolean;
  id_cliente:number;
  nomeCliente:Cliente;
}

