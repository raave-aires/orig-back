import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis de ambiente do .env
mongoose.Promise = global.Promise;

export async function conectarMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI!);
        console.log('Conectado ao MongoDB!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB: ', err);
    }
}