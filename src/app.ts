// importação de dependências:
import express from 'express';

// importação de funções:
import { rotas } from "./routes/rotas"
import { conectar_ao_banco_de_dados } from './config/database';

// variaveis:
const app = express();
const PORT = 3000;

conectar_ao_banco_de_dados();

// middlewares:
app.use(express.json()); // midleware para lidar com json
app.use(rotas); // faz as rotas funcionarem

// inicia o servidor
app.listen(PORT, () => {
  console.log(`O servidor está rodando em http://localhost:${PORT}.`);
});