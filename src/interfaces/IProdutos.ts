import { ICliente } from "@/interfaces/IClientes";
export interface IProdutos {
  id: string;
  nome: string;
  valor: number;
  "cliente vendedor": ICliente;
  imagem: string;
}
