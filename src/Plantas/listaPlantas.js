import cenouraFase1 from '../Imagens/cenoura_fase_1.png';
import cenouraFase2 from '../Imagens/cenoura_fase_2.png';
import cenouraFase3 from '../Imagens/cenoura_fase_3.png';
import cenouraMorta from '../Imagens/cenoura_fase_4.png';

import alfaceFase1 from '../Imagens/alface_fase_1.png';
import alfaceFase2 from '../Imagens/alface_fase_2.png';
import alfaceFase3 from '../Imagens/alface_fase_3.png';
import alfaceMorta from '../Imagens/alface_morta.png';

const listaPlantas = {
  cenoura: {
    nome: "Cenoura",
    preco: 50,
    recompensa: 100,
    tempoMorte: 20000,
    fases: [cenouraFase1, cenouraFase2, cenouraFase3],
    imagemMorta: cenouraMorta,
  },
  alface: {
    nome: "Alface",
    preco: 30,
    recompensa: 60,
    tempoMorte: 20000,
    fases: [alfaceFase1, alfaceFase2, alfaceFase3],
    imagemMorta: alfaceMorta,
  },
  alface: {
    nome: "Alface",
    preco: 30,
    recompensa: 60,
    tempoMorte: 20000,
    fases: [alfaceFase1, alfaceFase2, alfaceFase3],
    imagemMorta: alfaceMorta,
  },
  alface: {
    nome: "Alface",
    preco: 30,
    recompensa: 60,
    tempoMorte: 20000,
    fases: [alfaceFase1, alfaceFase2, alfaceFase3],
    imagemMorta: alfaceMorta,
  },
  // + Outras plantas aqui
};

export default listaPlantas;
