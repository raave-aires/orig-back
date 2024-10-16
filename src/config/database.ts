import mongoose from "mongoose";

mongoose.Promise = global.Promise;

export async function conectarMongoDB() {
    try {
        await mongoose.connect('mongodb+srv://raave:lhn05HOHXs5tEhTa@nevoento.wz6jk.mongodb.net/orig');
        console.log('Conectado ao MongoDB!');
    } catch (err) {
        console.error('Erro ao conectar ao MongoDB: ', err);
    }
}