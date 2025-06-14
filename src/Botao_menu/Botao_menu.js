import './Botao_menu.css';
import TanqueAgua from './TanqueAgua';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import listaPlantas from '../Plantas/listaPlantas';

// Função simples para tocar sons
const playSound = (src) => {
  const audio = new Audio(src);
  audio.play();
};

function Botao_menu({ score, setScore, inventario, setInventario, upgradeAgua }) {

  const [mostrarConteudo, setMostrarConteudo] = useState(false);
  const [mostrarInven, setMostrarInven] = useState(false);
  const [mostrarQuest, setMostrarQuest] = useState(false);
  const [mostrarVegan, setMostrarVegan] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [upgradeAguaFn, setUpgradeAguaFn] = useState(null);
  const [precoUpgradeAgua, setPrecoUpgradeAgua] = useState(100);

  // Adiciona pontos (ex: colher planta)
  const adicionarPonto = (valor = 100) => {
    setPontos(p => p + valor);
    playSound('/sons/colheita.mp3');
  };

  const comprarPlanta = (nomePlanta, custo) => {
    if (score < custo) {
      alert("Pontos insuficientes!");
      return;
    }
    setScore(prev => prev - custo);
    setInventario(prev => [...prev, nomePlanta]);
  };

  // Compra itens ou upgrades
  const handleCompra = (preco) => {
    if (pontos >= preco) {
      setPontos(p => p - preco);
      playSound('/sons/upgrade.mp3');
    } else {
      playSound('/sons/erro.mp3');
      alert("Você não tem pontos suficientes.");
    }
  };

  const handleRegisterUpgrade = useCallback((fn) => {
    setUpgradeAguaFn(() => fn);
  }, []);

  const toggleConteudo = () => {
    playSound('/sons/click.mp3');
    setMostrarConteudo(!mostrarConteudo);
    setMostrarInven(false);
    setMostrarQuest(false);
    setMostrarVegan(false);
  };

  const toggleConteudoInv = () => {
    playSound('/sons/click.mp3');
    setMostrarInven(!mostrarInven);
  };

  const toggleConteudoQuest = () => {
    playSound('/sons/click.mp3');
    setMostrarQuest(!mostrarQuest);
    setMostrarVegan(false);
  };

  const toggleConteudoVegan = () => {
    playSound('/sons/click.mp3');
    setMostrarVegan(!mostrarVegan);
    setMostrarQuest(false);
  };

  return (
    <>
      {/* HUD de Pontuação */}
      <div className="hud-pontos">
        <h2>💰 Pontos: {pontos}</h2>
      </div>

      {/* Botão principal */}
      <motion.div
        className="botao-redondo"
        onClick={toggleConteudo}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.80, y: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        exit={{ opacity: 0, scale: 0 }}
      ></motion.div>

      {/* Menu lateral */}
      <AnimatePresence>
        {mostrarConteudo && (
          <motion.div
            className="menu-lateral"
            animate={{ x: [0, 80], opacity: [0, 20, 40, 100] }}
            exit={{ opacity: 0, scale: 0.95, x: 80 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div
              className='container'
              onClick={toggleConteudoInv}
              whileTap={{ scale: 0.80, y: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="iventory-icon"></div>
              <div className="texto-estilo"><h1>Inventário</h1></div>
            </motion.div>

            <motion.div
              className='container'
              onClick={toggleConteudoQuest}
              whileTap={{ scale: 0.80, y: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="quests-icon"></div>
              <div className="texto-estilo"><h1>Loja</h1></div>
            </motion.div>

            <motion.div
              className='container'
              onClick={toggleConteudoVegan}
              whileTap={{ scale: 0.80, y: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="vegan-icon"></div>
              <div className="texto-estilo"><h1>Vegetais</h1></div>
            </motion.div>
          </motion.div>
        )}

        {/* Inventário */}
        {mostrarInven && (
          <motion.div
            key="inventario"
            className="inventario"
            initial={{ opacity: 0, scale: 0.95, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 80 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className='tituloInv'>
              <div className='texto-estilo'><h2>Inventário</h2></div>
              <button className='botao-fechar-inventario' onClick={toggleConteudoInv}></button>
            </div>

            <div className='inv' style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {inventario.length === 0 && <h4>Inventário vazio.</h4>}
              {inventario.map((nomePlanta, i) => {
                const plantaData = listaPlantas[nomePlanta];
                if (!plantaData) return null;

                return (
                  <img
                    key={i}
                    src={plantaData.fases[0]}
                    alt={nomePlanta}
                    draggable
                    onDragStart={e => e.dataTransfer.setData("planta", nomePlanta)}
                    style={{ width: 50, cursor: 'grab', borderRadius: 6 }}
                    title={`Arraste para plantar: ${nomePlanta}`}
                  />
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Loja */}
        {mostrarQuest && (
          <motion.div
            key="quests"
            className="quests"
            initial={{ opacity: 0, scale: 0.95, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 80 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className='tituloLoja'>
              <div className='texto-estilo'><h3>Loja!</h3></div>
              <button className='botao-fechar-loja' onClick={toggleConteudoQuest}></button>
            </div>
            <div className="loja">
              <div className="container-loja">
                {/* Upgrade Água */}
                <div className="item-loja">
                  <div className="water-icon"></div>
                  <div className="preco-upgrade">{precoUpgradeAgua} pontos</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{
                        backgroundColor: score < precoUpgradeAgua ? '#EB5757' : '#6FCF97'
                      }}

                      onClick={() => {
                        if (score >= precoUpgradeAgua && upgradeAgua) {
                          setScore(p => p - precoUpgradeAgua);              // ✅ Desconta pontos
                          playSound('/sons/upgrade.mp3');                   // ✅ Som de sucesso
                          upgradeAgua();                                    // ✅ Executa a função de upgrade passada do TanqueAgua
                          setPrecoUpgradeAgua(p => p * 2);                  // ✅ Dobra o preço do próximo upgrade
                        } else {
                          playSound('/sons/erro.mp3');                      // ⚠️ Som de erro
                          alert("Você não tem pontos suficientes ou o tanque não está pronto."); // ⚠️ Mensagem de erro
                        }
                      }}
                    >
                      Upgrade Água
                    </button>

                  </motion.div>
                </div>

                {/* Outros upgrades */}
                <div className="item-loja">
                  <div className="harvest-icon"></div>
                  <div className="preco-upgrade">200 pontos</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ backgroundColor: pontos >= 200 ? '#6FCF97' : '#EB5757' }}
                      onClick={() => handleCompra(200)}
                    >
                      Upgrade Colheita
                    </button>
                  </motion.div>
                </div>

                <div className="item-loja">
                  <div className="vegetables-icon"></div>
                  <div className="preco-upgrade">300 pontos</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ backgroundColor: pontos >= 300 ? '#6FCF97' : '#EB5757' }}
                      onClick={() => handleCompra(300)}
                    >
                      Upgrade Venda
                    </button>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Vegetais - você pode usar para mostrar dados adicionais */}
        {mostrarVegan && (
          <motion.div
            key="vegan"
            className="vegan"
            initial={{ opacity: 0, scale: 0.95, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 80 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className='tituloVegan'>
              <div className='texto-estilo'><h3>Vegetais</h3></div>
              <button className='botao-fechar-vegan' onClick={toggleConteudoVegan}></button>
            </div>


            <div className="loja-scroll-container">
              <div className="vegan-list">
                {Object.entries(listaPlantas).map(([tipo, planta]) => (
                  <div
                    key={tipo}
                    className="item-loja-vegan"
                    onClick={() => {
                      if (score >= planta.preco) {
                        setScore(p => p - planta.preco);
                        setInventario(inv => [...inv, tipo]); // ✅ adiciona no inventário
                        playSound("/sons/comprar.mp3");
                      } else {
                        playSound("/sons/erro.mp3");
                        alert("Pontos insuficientes para comprar " + planta.nome);
                      }
                    }}
                  >

                    
                    <img
                      src={planta.fases[0]}
                      alt={planta.nome}
                      style={{
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        padding: "5px",
                      }}
                    />
                    <span>{planta.nome}</span>
                    <span>💰 {planta.preco}</span>

                    
                  </div>
                  
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Botao_menu;
