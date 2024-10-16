import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis de ambiente do .env
mongoose.Promise = global.Promise;

const uri = process.env.MONGODB_URI;

export async function conectarMongoDB() {
    if(!uri){
        throw new Error('A variável de ambiente MONGODB_URI não está definida.');
    }
    
    try {
        await mongoose.connect(uri);
        console.log('Conectado ao MongoDB!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB: ', err);
    }
}