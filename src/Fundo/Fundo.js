import './Fundo.css';
import Planta from '../Componentes/Planta';
import planta1 from '../Imagens/planta.png'; // ajuste se necessário
import { useState } from 'react';

function Fundo() {
  const [caixas, setCaixas] = useState({
    caixa1: null,
    caixa2: null,
    caixa3: null,
    caixa4: null,
  });

  function allowDrop(e) {
    e.preventDefault();
  }

  function handleDrop(e, caixa) {
    const imagem = e.dataTransfer.getData("planta");
    setCaixas(prev => ({
      ...prev,
      [caixa]: imagem
    }));
  }

  return (
    <> 
      {/* <div className="inventario"> 
        <h3>Inventário</h3>

        <Planta imagem={planta1} nome="Planta 1" />
      </div> */}

      <div className="ContainerGeral">
        <div
          className='ContainerCaixa1'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa1')}
        >
          {caixas.caixa1 && <img src={caixas.caixa1} alt="Planta" width="60" />}
        </div>

        <div
          className='ContainerCaixa2'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa2')}
        >
          {caixas.caixa2 && <img src={caixas.caixa2} alt="Planta" width="60" />}
        </div>

        <div
          className='ContainerCaixa3'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa3')}
        >
          {caixas.caixa3 && <img src={caixas.caixa3} alt="Planta" width="60" />}
        </div>

        <div
          className='ContainerCaixa4'
          onDragOver={allowDrop}
          onDrop={(e) => handleDrop(e, 'caixa4')}
        >
          {caixas.caixa4 && <img src={caixas.caixa4} alt="Planta" width="60" />}
        </div>
      </div>

      <div className="terra"></div>
    </>
  );
}

export default Fundo;



