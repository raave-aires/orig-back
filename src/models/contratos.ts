import mongoose, { Schema, Document, Model } from "mongoose";

interface IContrato extends Document {
    data_de_contrato: string;
    nome_do_cliente: string;
}

const esquemaDeContrato: Schema<IContrato> = new Schema({
    data_de_contrato: { type: String, required: true },
    nome_do_cliente: { type: String, required: true },
});

const Contrato: Model<IContrato> = mongoose.model<IContrato>('Contrato', esquemaDeContrato);

export default Contrato;
