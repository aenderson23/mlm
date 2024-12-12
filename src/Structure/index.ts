import { ICliente } from "@/interfaces/IClientes";

export class Structure {
  readonly comissão = [0.1, 0.08, 0.05, 0.03, 0.02, 0.01, 0.005];
  readonly pacotes = [
    {
      nome: "pacote basico",
      valor: 100,
      pontos: 100,
      comissao: 10,
      requisitos: "venda direta de qualquer pacote",
      beneficios: "Acesso à plataforma, treinamento basico, suporte tecnico",
    },
    {
      nome: "pacote premium",
      valor: 300,
      pontos: 330,
      comissao: 30,
      requisitos: "3 vendas diretas de qualquer pacote",
      beneficios:
        "Acesso à plataforma, treinamento avançado, suporte prioritário",
    },
    {
      nome: "pacote pro",
      valor: 500,
      pontos: 630,
      comissao: 50,
      requisitos: "6 vendas diretas de qualquer pacote",
      beneficios: "Acesso à plataforma, treinamento especializado, suporte VIP",
    },
    {
      nome: "pacote VIP",
      valor: 1000,
      pontos: 1300,
      comissao: 100,
      requisitos: "12 vendas diretas de qualquer pacote",
      beneficios:
        "Acesso à plataforma, treinamento executivo, suporte presonalizado",
    },
    {
      nome: "pacote elite",
      valor: 5000,
      pontos: 7000,
      comissao: 550,
      requisitos: "25 vendas diretas de qualquer pacote",
      beneficios:
        "Acesso à plataforma, treinamento estratégico, suporte exclusivo",
    },
    {
      nome: "pacote Master",
      valor: 10000,
      pontos: 16000,
      comissao: 1300,
      requisitos: "50 vendas diretas de qualquer pacote",
      beneficios:
        "Acesso à plataforma, treinamento de liderança, suporte presonalizado",
    },
    {
      nome: "pacote Legend",
      valor: 50000,
      pontos: 100000,
      comissao: 7500,
      requisitos: "100 vendas diretas de qualquer pacote",
      beneficios: "Acesso à plataforma, treinamento exclusívo, suporte VIP",
    },
  ] as Pacote[];
  readonly distribuição = {
    comissão: 0.3,
    marketing: 0.2,
    plataforma: 0.2,
    segurança: 0.15,
    treinamento: 0.15,
  };
  readonly meta = {
    Objetivo: "Alcançar 2.000.000 pontos em 6 meses.",
    Equipes: 4,
    MetaEquipes: [800000, 400000, 400000, 400000],
    Premio: "Viagem para um destino de luxo internacional (6 dias e 5 noites).",
  };
  readonly MetasParciais = {
    hospedagem: 500000,
    ingressos: 200000,
    acompanhante: 3000000,
  };

  public selecionarPacote(indice: number): Pacote {
    return this.pacotes[indice];
  }

  public selecionarPacotePeloNome(nome: string): Pacote {
    const pacote = this.pacotes.find((pcte) => pcte.nome == nome);
    if (pacote) {
      return pacote;
    } else {
      throw new Error("Pacote não encontrado");
    }
  }
  public distribuirComissão(usuario: ICliente[], valor: number): void {
    for (let i = 0; i < usuario.length; i++) {
      usuario[i].carteira = valor * this.comissão[i];
    }
  }
}

export interface Pacote {
  nome: string;
  valor: number;
  pontos: number;
  comissao: number;
  requisitos: string;
  beneficios: string;
}
