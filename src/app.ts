// importação de dependências:
import express from 'express';

// importação de funções:
import { router } from "./routes/rotas"
import { conectarMongoDB } from './config/database';

// variaveis:
const app = express();
const PORT = 3000;

conectarMongoDB();

// middlewares:
app.use(express.json()); // midleware para lidar com json
app.use(router); // faz as rotas funcionarem

// inicia o servidor
app.listen(PORT, () => {
    console.log(`O servidor está rodando em http://localhost:${PORT}`);
});
