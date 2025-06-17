import cenouraFase1 from '../Imagens/cenouraFase1.png';
import cenouraFase2 from '../Imagens/cenouraFase2.png';
import cenouraFase3 from '../Imagens/cenouraFase3.png';
import cenouraMorto from '../Imagens/cenouraMorto.png';
import cenouraFoto from '../Imagens/Cenourafoto.png';

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

import aboboraFase1 from '../Imagens/aboboraFase1.png';
import aboboraFase2 from '../Imagens/aboboraFase2.png';
import aboboraFase3 from '../Imagens/aboboraFase3.png';
import aboboraMorto from '../Imagens/aboboraMorta.png';
import aboboraFoto from '../Imagens/aboboraFoto.png';

import peraFase1 from '../Imagens/peraFase1.png';
import peraFase2 from '../Imagens/peraFase2.png';
import peraFase3 from '../Imagens/peraFase3.png';
import peraMorto from '../Imagens/peraMorta.png';
import peraFoto from '../Imagens/peraFoto.png';

const listaPlantas = {
  cenoura: {
    nome: "Cenoura",
    preco: 30,
    recompensa: 45,
    tempoMorte: 15000,
    fases: [cenouraFase1, cenouraFase2, cenouraFase3],
    imagemFoto: cenouraFoto,
    imagemMorta: cenouraMorto,
  },
  alface: {
    nome: "Alface",
    preco: 60,
    recompensa: 100,
    tempoMorte: 25000,
    fases: [alfaceFase1, alfaceFase2, alfaceFase3],
    imagemFoto: alfaceFoto,
    imagemMorta: alfaceMorto,
  },
  tomate: {
    nome: "Tomate",
    preco: 100,
    recompensa: 180,
    tempoMorte: 40000,
    fases: [tomateFase1, tomateFase2, tomateFase3],
    imagemFoto: tomateFoto,
    imagemMorta: tomateMorto,
  },
  abobora: {
    nome: "Abóbora",
    preco: 160,
    recompensa: 300,
    tempoMorte: 60000,
    fases: [aboboraFase1, aboboraFase2, aboboraFase3],
    imagemFoto: aboboraFoto,
    imagemMorta: aboboraMorto,
  },
  pera: {
    nome: "Pera",
    preco: 240,
    recompensa: 500,
    tempoMorte: 1000,
    fases: [peraFase1, peraFase2, peraFase3],
    imagemFoto: peraFoto,
    imagemMorta: peraMorto,
  }
};


export default listaPlantas;
