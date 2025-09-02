import express from 'express';
import { buscarUfs, buscarUFsPorId, buscarUFsPorNome } from "./servico/servico.js";

const app = express();

const buscarUFsPorNome = (nomeUF) => {
    return colecaoUF.filter(uf => uf.nome.toLowerCase().includes(nomeUF.toLowerCase()))
};

app.get('/ufs', (req, res) => {
    const nomeUf = req.query.busca;
    const resultado = nomeUf ? buscarUFsPorNome(nomeUf) : colecaoUF;

    if (resultado.length > 0) {
        res.json(resultado);
    } else {
        res.status(404).send({ "erro": 'nenhuma uf encontrada' })
    }
});


app.get('/ufs/:iduf', (req, res) => {
    const uf  = buscarUFsPorId(req.params.iduf);

    if (uf) {
       res.json(uf);
    } else if (isNaN(parseInt(req.params.iduf))) {
        res.status(400).send({"erro": "Requisição inválida"});
    } else {
        res.status(404).send({"erro": "UF não encontrada"})
    }
 
});
app.listen(8080, () => {
    let data = new Date();
    console.log('Servidor iniciado na porta 8080 em: ' + data);
});

