import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export async function conectarMongoDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/orig');
        console.log('Conectado ao MongoDB!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB: ', err);
    }
}
