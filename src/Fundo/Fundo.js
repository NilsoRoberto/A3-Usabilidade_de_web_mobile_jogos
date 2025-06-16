import './Fundo.css';
import { useState, useRef, useEffect } from 'react';
import Botao_menu from '../Botao_menu/Botao_menu';
import TanqueAgua from '../Botao_menu/TanqueAgua';
import imgVazia from '../Imagens/teste1.png';
import listaPlantas from '../Plantas/listaPlantas';
import { useNavigate } from 'react-router-dom';



function Fundo() {
  const tanqueRef = useRef();
  const [score, setScore] = useState(10000);
  const [inventario, setInventario] = useState([]);
  const [upgradeAguaFunc, setUpgradeAguaFunc] = useState(null);

  // ✅ Estes são os dois estados que estavam no lugar errado
  const [hasAskedToQuit, setHasAskedToQuit] = useState(false);
  const [hasFinishedGame, setHasFinishedGame] = useState(false);
  const [mostrarModalDesistencia, setMostrarModalDesistencia] = useState(false);
  const [mostrarModalVitoria, setMostrarModalVitoria] = useState(false);
  const navigate = useNavigate();

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

    tanque.useWater(1);

    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      const planta = novaCaixa[index];

      if (planta && !planta.morta) {
        if (planta.fase >= planta.fases.length - 1) return prev;

        planta.progresso = Math.min(planta.progresso + 5, 100);
        if (planta.progresso >= 100) {
          planta.fase += 1;
          planta.progresso = 30;
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

            // 🔥 Garante que começa a contar tempo quando chega na última fase
            if (
              planta.fase === planta.fases.length - 1 &&
              !planta.tempoUltimaFase
            ) {
              planta.tempoUltimaFase = Date.now();
            }

            const tempoParado = Date.now() - (planta.tempoUltimaFase || Date.now());

            // 🔥 Morre por tempo parado na última fase
            if (
              planta.fase === planta.fases.length - 1 &&
              tempoParado >= planta.tempoMorte &&
              !planta.morta
            ) {
              return { ...planta, morta: true };
            }

            // 🔥 Morre por barra zerada
            if (!planta.morta) {
              const novoProgresso = Math.max(planta.progresso - 1, 0);

              if (novoProgresso === 0) {
                return { ...planta, progresso: 0, morta: true };
              }

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

  useEffect(() => {
    if (score >= 10000 && !hasAskedToQuit) {
      setMostrarModalDesistencia(true);
      setHasAskedToQuit(true);
    }

    if (score >= 30000 && !hasFinishedGame) {
      setMostrarModalVitoria(true);
      setHasFinishedGame(true);
    }
  }, [score, hasAskedToQuit, hasFinishedGame]);


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
        progresso: 50, // ✅ Pode ajustar aqui se quiser iniciar mais cheia ou mais vazia
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

      <div className="score-wrapper">
        <div className="score-display">🌟 Score: {score}</div>
        <div className="star-container">
          {[1, 2, 3].map((n) => {
            const isActive = score >= n * 10000;
            return (
              <span
                key={n}
                className={`star ${isActive ? 'active' : ''}`}
              >
                ★
              </span>
            );
          })}
        </div>
      </div>
      {mostrarModalDesistencia && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Você atingiu 10.000 pontos!</h2>
            <p>Deseja desistir do jogo?</p>
            <div className="modal-buttons">
              <button onClick={() => {
                alert("Você desistiu! Obrigado por jogar.");
                setMostrarModalDesistencia(false);
              }}>
                Desistir
              </button>
              <button onClick={() => setMostrarModalDesistencia(false)}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalVitoria && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Parabéns!</h2>
            <p>Você concluiu o jogo com 30.000 pontos!</p>
            <button onClick={() => {
              setMostrarModalVitoria(false);
              navigate('/'); // Altere aqui se sua tela inicial tiver outro caminho
            }}>
              Voltar ao Início
            </button>
          </div>
        </div>
      )}


      {mostrarModalVitoria && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>🎉 Parabéns!</h2>
            <p>Você concluiu o jogo com 30.000 pontos!</p>
            <button onClick={() => setMostrarModalVitoria(false)}>Fechar</button>
          </div>
        </div>
      )}



      <div className="terra"></div>

      <div className="ContainerGeral">
        {['caixa1', 'caixa3'].map((nomeCaixa, caixaIndex) => (
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
                            if (score < 100) {
                              alert("Você precisa de 100 pontos para remover uma planta morta.");
                              return;
                            }

                            const timeout = setTimeout(() => {
                              removerPlanta(nomeCaixa, index);
                              setScore(prev => prev - 100);
                            }, 1500);

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
                            style={{
                              width: `${planta.progresso}%`,
                              backgroundColor:
                                planta.progresso <= 20
                                  ? 'red'
                                  : planta.progresso <= 40
                                    ? 'yellow'
                                    : 'green'
                            }}
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
    </>
  );
}


export default Fundo;
