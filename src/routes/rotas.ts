// importação de dependências:
import express, { Request, Response } from 'express';
import path from 'path';

// importação de funções:
import Contrato from '../models/contratos';

// variáveis:
export const router = express.Router();

// middlewares:
router.use('/style', express.static(path.join(__dirname, '../../style'))); // middleware para servir estilos junto da pagina html

// rotas:
router.get('/', (req: Request, res: Response)=>{
    console.log('O servidor está funcionando.')
    res.sendFile(path.join(__dirname, '../../servidor-iniciado.html'));
})

router.get('/visualizar', async (req: Request, res: Response)=>{
    try {
        let contratos = await Contrato.find({});
        res.status(200).json(contratos)
    } catch (error) {
        res.status(500).json(error)
    }

})

router.post('/', async (req: Request, res: Response)=>{
    try {
        let contratos = await Contrato.create(req.body)
        res.status(200).json(contratos)
    } catch (error) {
        res.status(422).json(error)
    }

    console.log(req.body);
})