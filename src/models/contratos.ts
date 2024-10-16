import mongoose, { Schema, Document, Model, CallbackError } from "mongoose";

interface IContrato extends Document {
  numero_do_contrato: string;
  data_de_contrato: string;
  nome_do_cliente: string;
}

const esquemaDeContrato: Schema<IContrato> = new Schema({
  numero_do_contrato: { type: String, unique: true }, // Garantimos unicidade
  data_de_contrato: { type: String, required: true },
  nome_do_cliente: { type: String, required: true },
});

// Hook para atribuir o número do contrato automaticamente
esquemaDeContrato.pre<IContrato>('save', async function (next) {
  const contrato = this;
  const dataAtual = new Date();
  const ano = String(dataAtual.getFullYear()).slice(-2); // Últimos dois dígitos do ano
  const mes = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Mês com dois dígitos

  const prefixo = `${ano}${mes}`; // Formato base do número de contrato: "YYMM"

  try {
    // Buscar o último contrato criado neste mês
    const ultimoContrato = await Contrato.findOne({
      numero_do_contrato: { $regex: `^${prefixo}-` }
    }).sort({ numero_do_contrato: -1 });

    let proximoNumero = 1;

    if (ultimoContrato) {
      // Extrair e incrementar o número crescente do contrato anterior
      const partes = ultimoContrato.numero_do_contrato.split('-');
      const ultimoIncremento = parseInt(partes[1], 10);
      proximoNumero = ultimoIncremento + 1;
    }

    // Atribuir o novo número de contrato no formato YYMM-XXXX
    contrato.numero_do_contrato = `${prefixo}-${String(proximoNumero).padStart(4, '0')}`;
    next();
  } catch (error) {
    next(error as CallbackError); // Type assertion para evitar erro de tipagem
  }
});

const Contrato: Model<IContrato> = mongoose.model<IContrato>('Contrato', esquemaDeContrato);

export default Contrato;
