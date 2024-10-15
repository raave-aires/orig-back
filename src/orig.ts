// importação de dependências
import express, { Request, Response } from 'express';

const router = express.Router();

router.get('/',(req: Request, res: Response)=>{
    console.log('Servidor aberto')
    res.send();
})

