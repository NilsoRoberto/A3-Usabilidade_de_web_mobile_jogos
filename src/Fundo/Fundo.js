import './Fundo.css';
import { useState, useRef, useEffect, useCallback } from 'react';
import Botao_menu from '../Botao_menu/Botao_menu';
import TanqueAgua from '../Botao_menu/TanqueAgua';
import imgVazia from '../Imagens/teste1.png';
import listaPlantas from '../Plantas/listaPlantas';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../GameState';
import EventoProfessor from '../Eventos/EventoProfessor';


function Fundo() {

  const handleAcertarPergunta = (pontos) => {
  setScore(prevScore => prevScore + pontos);
  setDinheiro(prevDinheiro => prevDinheiro + pontos);
};
  // Estados básicos do jogo
  
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const tanqueRef = useRef();
  const [dinheiro, setDinheiro] = useState(100);
  const [score, setScore] = useState(0);
  const [inventario, setInventario] = useState([]);
  const navigate = useNavigate();

  // Estados para modais e progresso
  const [hasAskedToQuit, setHasAskedToQuit] = useState(false);
  const [hasFinishedGame, setHasFinishedGame] = useState(false);
  const [mostrarModalDesistencia, setMostrarModalDesistencia] = useState(false);
  const [mostrarModalVitoria, setMostrarModalVitoria] = useState(false);

  // Multiplicadores para os upgrades
  const [multiplicadorVenda, setMultiplicadorVenda] = useState(1);
  const [multiplicadorColheita, setMultiplicadorColheita] = useState(1);

  // Funções de upgrade
  const [upgradeAguaFunc, setUpgradeAguaFunc] = useState(null);

  const handleUpgradeVenda = useCallback(() => {
    setMultiplicadorVenda(prev => {
      const novoValor = prev * 1.5;
      console.log("Novo multiplicador de venda:", novoValor);
      return novoValor;
    });
  }, []);

  const handleUpgradeColheita = useCallback(() => {
    setMultiplicadorColheita(prev => {
      const novoValor = prev * 1.2;
      console.log("Novo multiplicador de colheita:", novoValor);
      return novoValor;
    });
  }, []);

  const handleRegisterUpgrade = useCallback((funcaoUpgrade) => {
    setUpgradeAguaFunc(() => funcaoUpgrade);
  }, []);

  // Estados das caixas de plantas
  const [caixas, setCaixas] = useState({
    caixa1: Array(8).fill(null),
    caixa2: Array(8).fill(null),
    caixa3: Array(8).fill(null),
  });

  // Funções de manipulação de plantas
  const allowDrop = (e) => e.preventDefault();

  const regarPlanta = (caixa, index) => {
    const tanque = tanqueRef.current;
    if (tanque.waterLevel <= 0) {
      alert("Sem água no tanque!");
      return;
    }

    tanque.useWater(2.5);

    setCaixas(prev => {
      const novaCaixa = [...prev[caixa]];
      const planta = novaCaixa[index];

      if (planta && !planta.morta) {
        if (planta.fase >= planta.fases.length - 1) return prev;

        const incremento = 5 * multiplicadorColheita;
        planta.progresso = Math.min(planta.progresso + incremento, 100);
        
        if (planta.progresso >= 100) {
          planta.fase += 1;
          planta.progresso = 30;
          planta.tempoUltimaFase = Date.now();
        }
      }

      return { ...prev, [caixa]: novaCaixa };
    });
  };

  // Efeito para atualização periódica das plantas
  useEffect(() => {
    const interval = setInterval(() => {
      setCaixas(prev => {
        const novo = { ...prev };

        for (let caixa in novo) {
          novo[caixa] = novo[caixa].map(planta => {
            if (!planta) return null;

            if (planta.fase === planta.fases.length - 1 && !planta.tempoUltimaFase) {
              planta.tempoUltimaFase = Date.now();
            }

            const tempoParado = Date.now() - (planta.tempoUltimaFase || Date.now());

            if (planta.fase === planta.fases.length - 1 &&
              tempoParado >= planta.tempoMorte &&
              !planta.morta) {
              return { ...planta, morta: true };
            }

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

  // Efeito para verificar vitória/desistência
  useEffect(() => {
    if (score >= 1000 && !hasAskedToQuit) {
      setMostrarModalDesistencia(true);
      setHasAskedToQuit(true);
    }

    if (score >= 3000 && !hasFinishedGame) {
      setMostrarModalVitoria(true);
      setHasFinishedGame(true);
    }
  }, [score, hasAskedToQuit, hasFinishedGame]);

  const handleDrop = (e, caixa, index) => {
    e.preventDefault();
    const tipoPlanta = e.dataTransfer.getData("planta");

    if (!tipoPlanta || !listaPlantas[tipoPlanta]) return;

    const temPlanta = inventario.includes(tipoPlanta);
    if (!temPlanta) {
      alert("Você não tem essa planta no inventário.");
      return;
    }

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
        recompensa: Math.floor(dadosPlanta.recompensa * multiplicadorVenda),
        fase: 0,
        progresso: 50,
        tempoUltimaFase: Date.now(),
        morta: false
      };

      const novoInventario = [...inventario];
      const indexInventario = novoInventario.indexOf(tipoPlanta);
      if (indexInventario !== -1) {
        novoInventario.splice(indexInventario, 1);
        setInventario(novoInventario);
      }

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
    const recompensa = planta?.recompensa || 0;

    setScore(prev => prev + recompensa);
    setDinheiro(prev => prev + recompensa);

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
        dinheiro={dinheiro}
        setDinheiro={setDinheiro}
        upgradeVenda={handleUpgradeVenda}
        upgradeColheita={handleUpgradeColheita}
      />

      <TanqueAgua ref={tanqueRef} onRegisterUpgrade={handleRegisterUpgrade} />

      <div className="score-display">🌟 Score: {score}</div>
      <div className="dinheiro-display">💰 Dinheiro: R${dinheiro}</div>
      <div className="score-wrapper">
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

      {/* Modais */}
      {mostrarModalDesistencia && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Você atingiu 10.000 pontos!</h2>
            <p>Deseja desistir do jogo?</p>
            <div className="modal-buttons">
              <button onClick={() => {
                alert("Você desistiu! Obrigado por jogar.");
                navigate('/login');
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
              navigate('/login');
            }}>
              Voltar ao Início
            </button>
          </div>
        </div>
      )}

      <div className="terra"></div>

      <div className="ContainerGeral">
        {['caixa1', 'caixa2'].map((nomeCaixa, caixaIndex) => (
          <div key={nomeCaixa} className="caixa">
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
                      {loadingIndex === `${nomeCaixa}-${index}` && (
                        <div className="roda-carregamento">
                          <svg className="progress-ring" width="40" height="40">
                            <circle
                              className="progress-ring-circle"
                              stroke="white"
                              strokeWidth="4"
                              fill="transparent"
                              r="18"
                              cx="20"
                              cy="20"
                              style={{
                                strokeDasharray: 2 * Math.PI * 18,
                                strokeDashoffset: 2 * Math.PI * 18 * (1 - loadingProgress / 100),
                                transition: 'stroke-dashoffset 0.06s linear'
                              }}
                            />
                          </svg>
                        </div>
                      )}

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
                          if (!planta.morta) return;

                          if (dinheiro < 100) {
                            alert("Você precisa de R$100 para remover uma planta morta.");
                            return;
                          }

                          setLoadingIndex(`${nomeCaixa}-${index}`);
                          setLoadingProgress(0);

                          let progresso = 0;
                          const interval = setInterval(() => {
                            progresso += 4;
                            setLoadingProgress(progresso);

                            if (progresso >= 100) {
                              clearInterval(interval);
                              removerPlanta(nomeCaixa, index);
                              setDinheiro(prev => prev - 100);
                              setLoadingIndex(null);
                              setLoadingProgress(0);
                            }
                          }, 60);

                          const clear = () => {
                            clearInterval(interval);
                            setLoadingIndex(null);
                            setLoadingProgress(0);
                          };

                          e.target.addEventListener("mouseup", clear, { once: true });
                          e.target.addEventListener("mouseleave", clear, { once: true });
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
      <EventoProfessor onAcertarPergunta={handleAcertarPergunta} />
    </>
  );
}

export default Fundo;