import React, { useState } from 'react';

const perguntas = [
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

const Quiz = ({ onFinalizar }) => {
  const [index, setIndex] = useState(0);
  const [respostaCerta, setRespostaCerta] = useState(0);

  const proximaPergunta = (i) => {
    if (i === perguntas[index].correta) {
      setRespostaCerta(respostaCerta + 1);
    }
    if (index + 1 < perguntas.length) {
      setIndex(index + 1);
    } else {
      onFinalizar(respostaCerta + (i === perguntas[index].correta ? 1 : 0));
    }
  };

  return (
    <div className="dialogo-container">
      <p><strong>Pergunta {index + 1}:</strong> {perguntas[index].texto}</p>
      {perguntas[index].opcoes.map((opcao, i) => (
        <button key={i} onClick={() => proximaPergunta(i)} style={{ display: "block", margin: "5px 0" }}>
          {opcao}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
