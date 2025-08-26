import colecaoUF from "../dados/dados.js";
import express from 'express';

const app = express();

app.get('/ufs', (req, res) =>  {
    res.json(colecaoUF);
});

app.get('/ufs/:iduf', (req, res) => {
    const idUF = parseInt(req.params.iduf);
    let mensagemErro = '';
    let uf;

    if (!(isNaN(idUF))) {
     uf = colecaoUF.find(u => u.id === idUF);
     if (!uf) {
        mensagemErro = "UF não encontrada";
     }   
    }else {
        mensagemErro = 'Requisição iválida';
    }
    if (uf) {
        res.json(uf);
    }else {
        res.status(404).json({ "erro": mesagemError})
    }

});

app.listen(8080, () => {
    let data = new Date();
    console.log('Servidor iniciado na porta 8080 em: ' + data);
});

