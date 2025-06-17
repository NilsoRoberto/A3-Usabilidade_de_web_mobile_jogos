import React, { useState } from 'react';
import './Professor.css';
import professorImg from './professor.png';

// Lista de perguntas
const todasPerguntas = [
  {
    texto: "Qual é uma das principais causas do desperdício de alimentos nas residências?",
    opcoes: ["Falta de supermercados próximos", "Comprar alimentos além do necessário", "Falta de geladeira moderna", "Comer fora de casa todos os dias"],
    correta: 1
  },
  {
    texto: "O que significa 'consumo consciente'?",
    opcoes: ["Comprar apenas produtos em promoção", "Utilizar produtos importados", "Consumir pensando nos impactos sociais e ambientais", "Não consumir absolutamente nada"],
    correta: 2
  },
  {
    texto: "Qual dessas atitudes ajuda a evitar o desperdício de água?",
    opcoes: ["Tomar banhos demorados", "Lavar calçadas com mangueira", "Reaproveitar a água da máquina de lavar", "Lavar o carro toda semana"],
    correta: 2
  },
  {
    texto: "O que acontece quando deixamos luzes acesas sem necessidade?",
    opcoes: ["Aumenta a ventilação da casa", "Reduz a conta de energia", "Contribuímos para o desperdício de energia elétrica", "Gera mais conforto visual"],
    correta: 2
  },
  {
    texto: "Como podemos reduzir o desperdício de papel?",
    opcoes: ["Imprimindo tudo em papel reciclado", "Evitando o uso de papel sempre que possível", "Jogando papéis usados no lixo comum", "Escrevendo em canetas caras"],
    correta: 1
  },
  {
    texto: "Qual destas ações mais contribui para evitar o desperdício de alimentos?",
    opcoes: ["Comprar alimentos por impulso", "Armazenar corretamente os alimentos", "Jogar fora alimentos com aparência estranha", "Comer fora todos os dias"],
    correta: 1
  },
  {
    texto: "Qual é a consequência direta do desperdício de energia?",
    opcoes: ["Redução da pegada ecológica", "Diminuição do aquecimento global", "Aumento dos gastos e danos ao meio ambiente", "Geração de mais empregos"],
    correta: 2
  },
  {
    texto: "Qual dessas ações é um exemplo de desperdício no dia a dia?",
    opcoes: ["Usar uma garrafa reutilizável", "Deixar a torneira aberta ao escovar os dentes", "Desligar os aparelhos da tomada", "Usar lâmpadas LED"],
    correta: 1
  },
  {
    texto: "O que devemos fazer com sobras de comida em bom estado?",
    opcoes: ["Jogar fora imediatamente", "Guardar e reutilizar em outra refeição", "Deixar fora da geladeira por dias", "Dar para os vizinhos sem perguntar"],
    correta: 1
  },
  {
    texto: "Qual é o papel da educação na conscientização contra o desperdício?",
    opcoes: ["Ensinar a consumir mais", "Formar consumidores inconscientes", "Incentivar atitudes sustentáveis e responsáveis", "Promover o aumento de resíduos"],
    correta: 2
  },
  {
    texto: "Qual das ações abaixo mais contribui para alcançar o ODS 2 - Fome Zero e Agricultura Sustentável?",
    opcoes: ["Aumentar o uso de agrotóxicos para proteger plantações.", "Expandir o desmatamento para abrir novas áreas agrícolas.", "Investir em agricultura familiar e produção local de alimentos.", "Priorizar monoculturas para exportação de commodities."],
    correta: 2
  },
  {
    texto: "O que caracteriza uma prática agrícola sustentável?",
    opcoes: ["Uso intensivo de fertilizantes químicos para aumentar a produtividade.", "Queima de resíduos agrícolas para limpar o solo rapidamente.", "Rotação de culturas e preservação da fertilidade do solo.", "Produção voltada exclusivamente para o mercado externo."],
    correta: 2
  }
];

// Função para sortear 3 perguntas aleatórias
const sortearPerguntas = () => {
  const copia = [...todasPerguntas];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia.slice(0, 3);
};



const Professor = ({ aoFinalizar, onAcertarPergunta }) => {
  const [mostrarIntroducao, setMostrarIntroducao] = useState(false);
  const [mostrarQuiz, setMostrarQuiz] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [index, setIndex] = useState(0);
  const [acertos, setAcertos] = useState(0);
  const [perguntasSelecionadas, setPerguntasSelecionadas] = useState([]);
  const [mostrarProfessor, setMostrarProfessor] = useState(true);
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);
  const [respostaCerta, setRespostaCerta] = useState(null);
  const [bloquearRespostas, setBloquearRespostas] = useState(false);

  const iniciarIntroducao = () => {
    setMostrarIntroducao(true);
  };

  const iniciarQuiz = () => {
    const sorteadas = sortearPerguntas();
    setPerguntasSelecionadas(sorteadas);
    setMostrarIntroducao(false);
    setMostrarQuiz(true);
    setIndex(0);
    setAcertos(0);
    setFinalizado(false);
    setRespostaSelecionada(null);
    setRespostaCerta(null);
    setBloquearRespostas(false);
  };

  const responder = (i) => {
    if (bloquearRespostas) return;

    const correta = perguntasSelecionadas[index].correta;
    setRespostaSelecionada(i);
    setRespostaCerta(correta);
    setBloquearRespostas(true);

      if (i === correta) {
      setAcertos(prev => prev + 1);
      if (onAcertarPergunta) {
        onAcertarPergunta(200); // Chama a função passando os pontos por acerto
      }
    }

    setTimeout(() => {
      if (index + 1 < perguntasSelecionadas.length) {
        setIndex(prev => prev + 1);
        setRespostaSelecionada(null);
        setRespostaCerta(null);
        setBloquearRespostas(false);
      } else {
        setMostrarQuiz(false);
        setFinalizado(true);
      }
    }, 3000);
  };

  const finalizarQuiz = () => {
    setMostrarProfessor(false);
    if (aoFinalizar) aoFinalizar();
  };

  const score = acertos * 200;

  return (
    <div className="cenario">
      {mostrarProfessor && (
        <>
          <div className="professor-interativo" onClick={iniciarIntroducao}>
            <img src={professorImg} alt="Professor" className="personagem-img animar-surgir" />
            {!mostrarIntroducao && !mostrarQuiz && !finalizado && (
              <div className="balao-clique">
                Clique para participar!
                <div className="balao-seta"></div>
              </div>
            )}
          </div>

          {mostrarIntroducao && !mostrarQuiz && !finalizado && (
            <div className="dialogo-container">
              <p><strong>Prof. Eco:</strong></p>
              <p>
                Olá, tudo bem? Eu sou o Prof. Eco!<br />
                Sou o responsável por testar seus conhecimentos aqui no EcoFarm e também ajudar você a aprender de um jeito divertido.<br />
                Hoje, preparei <strong>3 perguntas especiais</strong> para você.<br />
                Cada resposta certa vale pontos que poderão ser usados, então preste bastante atenção!<br />
                Pronto para começar? Então vamos nessa!
              </p>
              <button onClick={iniciarQuiz} className="btn-dialogo">Participar</button>
            </div>
          )}

          {mostrarQuiz && (
            <div className="dialogo-container">
              <p><strong>Pergunta {index + 1}:</strong> {perguntasSelecionadas[index].texto}</p>
              {perguntasSelecionadas[index].opcoes.map((opcao, i) => {
                let classe = 'btn-resposta';
                if (respostaSelecionada !== null) {
                  if (i === respostaSelecionada && i === respostaCerta) {
                    classe += ' correta';
                  } else if (i === respostaSelecionada && i !== respostaCerta) {
                    classe += ' errada';
                  } else if (i === respostaCerta) {
                    classe += ' correta';
                  }
                }

                return (
                  <button
                    key={i}
                    className={classe}
                    onClick={() => responder(i)}
                    disabled={bloquearRespostas}
                  >
                    {opcao}
                  </button>
                );
              })}
            </div>
          )}

          {finalizado && (
            <div className="dialogo-container">
              <p><strong>Parabéns!</strong></p>
              <p>Você concluiu o quiz!</p>
              <p>Respostas corretas: {acertos} de 3</p>
              <p>Total de pontos: {score}</p>
              <button onClick={finalizarQuiz} className="btn-dialogo">Finalizar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Professor;
