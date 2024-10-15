import { ICliente } from "@/interfaces/IClientes";
import { IProdutos } from "./IProdutos";
export interface ICompra {
  id: string;
  produto:IProdutos
  "cliente comprador": ICliente;
  "valor de passagem": number;
}
