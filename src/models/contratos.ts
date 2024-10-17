import mongoose, { Schema, Document, Model, CallbackError } from "mongoose";

interface valid_contrato extends Document {
  numero_do_contrato: string;

  dados_basicos_do_contrato: {
    data_do_contrato: string;
    tipo_de_transacao: string;
    produto: string;
    safra: string;
    municipio: string;
  };

  volume_e_valor: {
    volume: number;
    sacas: number;
    moeda_usada: string;
    valor_da_saca: number;
    valor_total: string;
    ptax: string;
    dia_do_ptax: string;
    valor_convertido: string;
    data_do_pagamento: string;
  };

  dados_de_entrega: {
    filial: string;
    terceiro: boolean;
    local_do_armazem_terceiro?: string | null;
    nome_armazem_de_terceiro?: string | null;
    data_de_entrega: string;
  };

  dados_do_cliente: {
    nome_do_parceiro: string;
    tipo_de_parceiro: string;
    cpf: string;
    endereco_do_cliente: {
      cep: string;
      rua: string;
      numero: number;
      bairro: string;
      cidade: string;
      estado: string;
    };
    dados_bancarios: {
      recebedor: string;
      nome_do_recebedor: string;
      cpf: string;
      banco: string;
      agencia: string;
      numero_da_conta: string;
    };
  };

  observacoes: string;
}

// Definição do Schema para o contrato
const esquema_do_contrato: Schema<valid_contrato> = new Schema({
  numero_do_contrato: { type: String, unique: true }, 

  dados_basicos_do_contrato: {
    data_do_contrato: { type: String, required: true },
    tipo_de_transacao: { type: String, required: true },
    produto: { type: String, required: true },
    safra: { type: String, required: true },
    municipio: { type: String, required: true },
  },

  volume_e_valor: {
    volume: { type: Number, required: true },
    sacas: { type: Number, required: true },
    moeda_usada: { type: String, required: true },
    valor_da_saca: { type: Number, required: true },
    valor_total: { type: String, required: true },
    ptax: { type: String, required: true },
    dia_do_ptax: { type: String, required: true },
    valor_convertido: { type: String, required: true },
    data_do_pagamento: { type: String, required: true },
  },

  dados_de_entrega: {
    filial: { type: String, required: true },
    terceiro: { type: Boolean, required: true, default: false},
    local_do_armazem_terceiro: { type: String, default: null },
    nome_armazem_de_terceiro: { type: String, default: null },
    data_de_entrega: { type: String, required: true },
  },

  dados_do_cliente: {
    nome_do_parceiro: { type: String, required: true },
    tipo_de_parceiro: { type: String, required: true },
    cpf: { type: String, required: true },
    endereco_do_cliente: {
      cep: { type: String, required: true },
      rua: { type: String, required: true },
      numero: { type: Number, required: true, default: null },
      bairro: { type: String, required: true },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
    },
    dados_bancarios: {
      recebedor: { type: String, required: true },
      nome_do_recebedor: { type: String, required: true },
      cpf: { type: String, required: true },
      banco: { type: String, required: true },
      agencia: { type: String, required: true },
      numero_da_conta: { type: String, required: true },
    },
  },

  observacoes: { type: String }
});

// função de atribuição automática de número do contrato:
esquema_do_contrato.pre<valid_contrato>('save', async function (next) {
  const contrato = this;

  const dataAtual = new Date();
  const ano = String(dataAtual.getFullYear()).slice(-2); // pega os últimos dois dígitos do ano
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // pega o mês com dois dígitos
  const prefixo = `${ano}${mes}`; // formato base do número de contrato: "YYMM"

  try {
    const ultimo_contrato = await Contrato.findOne({
      numero_do_contrato: { $regex: `^${prefixo}-` } // verifica qual o número do último contrato criado neste mês
    }).sort({ numero_do_contrato: -1 });

    let proximo_numero = 1;

    if (ultimo_contrato) {
      // funções para extrair e incrementar o número do contrato anterior
      const partes = ultimo_contrato.numero_do_contrato.split('-');
      const ultimo_incremento = parseInt(partes[1], 10);
      proximo_numero = ultimo_incremento + 1;
    }

    // Atribuir o novo número de contrato no formato YYMM-XXXX
    contrato.numero_do_contrato = `${prefixo}-${String(proximo_numero).padStart(4, '0')}`;
    next();
  } catch(error){
    next(error as CallbackError); // Type assertion para evitar erro de tipagem
  }
});

const Contrato: Model<valid_contrato> = mongoose.model<valid_contrato>('Contrato', esquema_do_contrato);

export default Contrato;