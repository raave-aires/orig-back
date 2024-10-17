import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // carrega as variáveis de ambiente do .env
mongoose.Promise = global.Promise;

const bd_uri = process.env.BANCO_DE_DADOS;

export async function conectar_ao_banco_de_dados() {
  if (!bd_uri) {
    throw new Error('O enlace do banco de dados não está definido.');
  }

  try {
    await mongoose.connect(bd_uri);
    console.log('O banco de dados foi conectado corretamente.');
  } catch (error) {
    console.error('Houve um erro ao conectar ao banco de dados: ', error);
  }
}