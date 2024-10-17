// importação de dependências:
import express, { Request, Response, Router } from 'express'; 
import path from 'path';

// importação de funções:
import Contrato from '../models/contratos';

// variáveis:
export const router: Router = express.Router();

// middlewares:
router.use('/style', express.static(path.join(__dirname, '../../public/style/output.css'))); // middleware para servir estilos junto da pagina html

// rotas:
router.get('/', (req: Request, res: Response) => {
    console.log('O servidor está funcionando.')
    res.sendFile(path.join(__dirname, '../../public/pages/estado-do-servidor.html'));
})

router.get('/visualizar', async (req: Request, res: Response) => {
    try {
        let contratos = await Contrato.find({});
        res.status(200).json(contratos)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get('/:numero_do_contrato', async (req: Request, res: Response) => {
    try {
        const contrato = await Contrato.findOne({ numero_do_contrato: req.params.numero_do_contrato });

            if(!contrato){
                res.status(404).json({ mensagem: "Contrato não encontrado" });
                return;
            };

        res.status(200).json(contrato);
    } catch(error){
        console.error('Erro ao buscar contrato: ', error);
        res.status(500).json({ mensagem: 'Erro interno no servidor' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        let contratos = await Contrato.create(req.body)
        res.status(200).json(contratos)
    } catch (error) {
        res.status(422).json(error)
    }

    console.log(req.body);
})