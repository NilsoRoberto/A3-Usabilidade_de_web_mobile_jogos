import './Fundo.css';
import Planta from '../Componentes/Planta';
import planta1 from '../Imagens/teste1.png'; // ajuste se necessário
import { useState } from 'react';

function Fundo() {
  const [caixas, setCaixas] = useState({
    caixa1: [],
    caixa2: [],
    caixa3: [],
    caixa4: [],
  });

  function allowDrop(e) {
    e.preventDefault();
  }

  function handleDrop(e, caixa) {
    const imagem = e.dataTransfer.getData("planta");
    if (!imagem) return;

    setCaixas(prev => {
      const plantasAtuais = prev[caixa];
      if (plantasAtuais.length >= 7 ) {
        alert("Limite de 8 plantas por caixa atingido!");
        return prev;
      }

      return {
        ...prev,
        [caixa]: [...plantasAtuais, { id: Date.now(), imagem, progresso: 0 }]
      };
    });
  }

  return (
    <>
    <div className="terra"></div>
      <div className="ContainerGeral">
        <div className="ContainerCaixa1" onDragOver={allowDrop} onDrop={(e) => handleDrop(e, 'caixa1')}>
          {caixas.caixa1.map(planta => (
            <div key={planta.id} className="planta-container">
              <img src={planta.imagem} alt="Planta" />
              <div className="barra-progresso">
                <div className="progresso" style={{ width: `${planta.progresso}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div
          className='ContainerCaixa ContainerCaixa2'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa2')}
        >
          {caixas.caixa2.map(planta => (
            <div key={planta.id} className="planta-container">
              <img src={planta.imagem} alt="Planta" width="50" />
              <div className="barra-progresso">
                <div className="progresso" style={{ width: `${planta.progresso}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div
          className='ContainerCaixa ContainerCaixa3'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa3')}
        >
          {caixas.caixa3.map(planta => (
            <div key={planta.id} className="planta-container">
              <img src={planta.imagem} alt="Planta" width="50" />
              <div className="barra-progresso">
                <div className="progresso" style={{ width: `${planta.progresso}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div
          className='ContainerCaixa ContainerCaixa4'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa4')}
        >
          {caixas.caixa4.map(planta => (
            <div key={planta.id} className="planta-container">
              <img src={planta.imagem} alt="Planta" width="50" />
              <div className="barra-progresso">
                <div className="progresso" style={{ width: `${planta.progresso}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}

export default Fundo;
