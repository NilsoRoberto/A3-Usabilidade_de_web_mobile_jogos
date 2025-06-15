import cenouraFase1 from '../Imagens/cenouraFase1.png';
import cenouraFase2 from '../Imagens/cenouraFase2.png';
import cenouraFase3 from '../Imagens/cenouraFase3.png';
import cenouraMorto from '../Imagens/cenouraMorto.png';
import cenouraFoto from '../Imagens/cenouraFoto.png';

import alfaceFase1 from '../Imagens/alfaceFase1.png';
import alfaceFase2 from '../Imagens/alfaceFase2.png';
import alfaceFase3 from '../Imagens/alfaceFase3.png';
import alfaceMorto from '../Imagens/alfaceMorto.png';
import alfaceFoto from '../Imagens/alfaceFoto.png';

import tomateFase1 from '../Imagens/tomateFase1.png';
import tomateFase2 from '../Imagens/tomateFase2.png';
import tomateFase3 from '../Imagens/tomateFase3.png';
import tomateMorto from '../Imagens/tomateMorto.png';
import tomateFoto from '../Imagens/tomateFoto.png';

const listaPlantas = {
  cenoura: {
    nome: "Cenoura",
    preco: 50,
    recompensa: 100,
    tempoMorte: 20000,
    fases: [cenouraFase1, cenouraFase2, cenouraFase3],
    imagemFoto: cenouraFoto,
    imagemMorta: cenouraMorto,
  },
  alface: {
    nome: "Alface",
    preco: 30,
    recompensa: 150,
    tempoMorte: 15000,
    fases: [alfaceFase1, alfaceFase2, alfaceFase3],
    imagemFoto: alfaceFoto,
    imagemMorta: alfaceMorto,
  },
  tomate: {
    nome: "Tomate",
    preco: 40,
    recompensa: 200,
    tempoMorte: 10000,
    fases: [tomateFase1, tomateFase2, tomateFase3],
    imagemFoto: tomateFoto,
    imagemMorta: tomateMorto,
  }
  // + Outras plantas aqui
};

export default listaPlantas;
