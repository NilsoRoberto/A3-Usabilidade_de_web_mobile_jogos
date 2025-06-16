import './Fundo.css';
import { useState, useRef, useEffect } from 'react';
import Botao_menu from '../Botao_menu/Botao_menu';
import TanqueAgua from '../Botao_menu/TanqueAgua';
import imgVazia from '../Imagens/teste1.png';
import listaPlantas from '../Plantas/listaPlantas';
import EventoProfessor from '../Eventos/EventoProfessor';


function Fundo() {
  const tanqueRef = useRef();
  const [score, setScore] = useState(0);
  const [inventario, setInventario] = useState([]);

  const [upgradeAguaFunc, setUpgradeAguaFunc] = useState(null);
  const handleRegisterUpgrade = (funcaoUpgrade) => {
    setUpgradeAguaFunc(() => funcaoUpgrade);
  };

  const [caixas, setCaixas] = useState({
    caixa1: Array(8).fill(null),
    caixa2: Array(8).fill(null),
    caixa3: Array(8).fill(null),
  });

  const allowDrop = (e) => e.preventDefault();

  const regarPlanta = (caixa, index) => {
    const tanque = tanqueRef.current;
    if (tanque.waterLevel <= 0) {
      alert("Sem água no tanque!");
      return;
    }

    tanque.useWater(10);

    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      const planta = novaCaixa[index];

      if (planta && !planta.morta) {
        if (planta.fase >= planta.fases.length - 1) return prev;

        planta.progresso = Math.min(planta.progresso + 10, 100);
        if (planta.progresso >= 100) {
          planta.fase += 1;
          planta.progresso = 0;
          planta.tempoUltimaFase = Date.now();
        }
      }

      return { ...prev, [caixa]: novaCaixa };
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCaixas(prev => {
        const novo = { ...prev };

        for (let caixa in novo) {
          novo[caixa] = novo[caixa].map(planta => {
            if (!planta) return null;

            const tempoParado = Date.now() - (planta.tempoUltimaFase || Date.now());

            if (planta.fase === planta.fases.length - 1 && tempoParado >= planta.tempoMorte) {
              return { ...planta, morta: true };
            }

            if (!planta.morta) {
              const novoProgresso = Math.max(planta.progresso - 1, 0);
              return { ...planta, progresso: novoProgresso };
            }

            return planta;
          });
        }

        return novo;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDrop = (e, caixa, index) => {
    e.preventDefault();
    const tipoPlanta = e.dataTransfer.getData("planta");
    if (!tipoPlanta || !listaPlantas[tipoPlanta]) return;

    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      if (novaCaixa[index]) {
        alert("Este espaço já está ocupado!");
        return prev;
      }

      const dadosPlanta = listaPlantas[tipoPlanta];

      novaCaixa[index] = {
        id: Date.now(),
        tipo: tipoPlanta,
        fases: dadosPlanta.fases,
        imagemMorta: dadosPlanta.imagemMorta,
        tempoMorte: dadosPlanta.tempoMorte,
        recompensa: dadosPlanta.recompensa,
        fase: 0,
        progresso: 0,
        tempoUltimaFase: Date.now(),
        morta: false
      };

      return { ...prev, [caixa]: novaCaixa };
    });
  };

  const removerPlanta = (caixa, index) => {
    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      novaCaixa[index] = null;
      return { ...prev, [caixa]: novaCaixa };
    });
  };

  const colherPlanta = (caixa, index) => {
    const planta = caixas[caixa][index];
    setScore(prev => prev + (planta?.recompensa || 0));

    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      novaCaixa[index] = null;
      return { ...prev, [caixa]: novaCaixa };
    });
  };

  return (
    <>
      <Botao_menu
        score={score}
        setScore={setScore}
        inventario={inventario}
        setInventario={setInventario}
        upgradeAgua={upgradeAguaFunc}
      />

      <TanqueAgua ref={tanqueRef} onRegisterUpgrade={handleRegisterUpgrade} />

      <div className="score-display">🌟 Score: {score}</div>
      <div className="terra"></div>

      <div className="ContainerGeral">
        {['caixa1', 'caixa2', 'caixa3'].map((nomeCaixa, caixaIndex) => (
          <div key={nomeCaixa} className={`ContainerCaixa${caixaIndex + 1}`}>
            {Array(8).fill().map((_, index) => {
              const planta = caixas[nomeCaixa][index];
              const plantaCrescida = planta && !planta.morta && planta.fase === planta.fases.length - 1;

              return (
                <div
                  key={index}
                  className="slot"
                  onDragOver={allowDrop}
                  onDrop={(e) => handleDrop(e, nomeCaixa, index)}
                >
                  {planta ? (
                    <div className={`planta-container ${plantaCrescida ? 'brilho' : ''}`}>
                      <img
                        src={planta.morta ? planta.imagemMorta : planta.fases[planta.fase]}
                        alt="Planta"
                        width="50"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (planta.morta) return;
                          if (plantaCrescida) {
                            colherPlanta(nomeCaixa, index);
                          } else {
                            regarPlanta(nomeCaixa, index);
                          }
                        }}
                        onMouseDown={(e) => {
                          if (planta.morta) {
                            const timeout = setTimeout(() => removerPlanta(nomeCaixa, index), 1500);
                            const clear = () => clearTimeout(timeout);
                            e.target.addEventListener('mouseup', clear, { once: true });
                            e.target.addEventListener('mouseleave', clear, { once: true });
                          }
                        }}
                      />
                      {!planta.morta && !plantaCrescida && (
                        <div className="barra-progresso">
                          <div
                            className="progresso"
                            style={{ width: `${planta.progresso}%` }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <img src={imgVazia} alt="Espaço vazio" className="espaco-vazio" />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <EventoProfessor />
    </>
  );
}

export default Fundo;
