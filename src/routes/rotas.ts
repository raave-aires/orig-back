import express, { Request, Response } from 'express';
import path from 'path';

export const router = express.Router();

router.use('/style', express.static(path.join(__dirname, '../../style')));

router.get('/', (req: Request, res: Response)=>{
    console.log('O servidor está funcionando.')
    res.sendFile(path.join(__dirname, '../../servidor-iniciado.html'));
})

router.post('/', (req: Request, res: Response)=>{
    console.log(req.body);
    res.status(200).send(req.body);
})