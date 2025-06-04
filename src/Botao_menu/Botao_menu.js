import './Botao_menu.css';
import TanqueAgua from './TanqueAgua';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function Botao_menu() {
  const [mostrarConteudo, setMostrarConteudo] = useState(false);
  const [mostrarInven, setMostrarInven] = useState(false);
  const [mostrarQuest, setMostrarQuest] = useState(false);
  const [pontos, setPontos] = useState(0);
  const [upgradeAguaFn, setUpgradeAguaFn] = useState(null);
  const [precoUpgradeAgua, setPrecoUpgradeAgua] = useState(100);

  const adicionarPonto = () => {
    setPontos(p => p + 100);
  };

  const handleCompra = (preco) => {
    if (pontos >= preco) {
      setPontos(p => p - preco);
    } else {
      alert("Você não tem pontos suficientes.");
    }
  };

  const handleRegisterUpgrade = useCallback((fn) => {
    setUpgradeAguaFn(() => fn);
  }, []);

  const toggleConteudo = () => {
    setMostrarConteudo(!mostrarConteudo);
    setMostrarInven(false);
    setMostrarQuest(false);
  };

  const toggleConteudoInv = () => {
    setMostrarInven(!mostrarInven);
  };

  const toggleConteudoQuest = () => {
    setMostrarQuest(!mostrarQuest);
  };

  return (
    <>
      <button className="botao-pontos" onClick={adicionarPonto}>Adicionar 100 pontos</button>
      <p>{pontos}</p>

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
            exit={{ opacity: 0, scale: 0.95, x: 80, transition: { duration: 0.5, ease: "easeInOut" } }}
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

            {/* Este botão parece repetido, você pode remover se for desnecessário */}
            <motion.div
              className='container'
              onClick={toggleConteudoInv}
              whileTap={{ scale: 0.80, y: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="iventory-icon"></div>
              <div className="texto-estilo"><h1>Inventário</h1></div>
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
            exit={{ opacity: 0, scale: 0.95, x: 80, transition: { duration: 0.5, ease: "easeInOut" } }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className='tituloInv'>
              <div className='texto-estilo'><h2>Inventário</h2></div>
              <button className='botao-fechar-inventario' onClick={toggleConteudoInv}></button>
            </div>
            <div className='inv'></div>
          </motion.div>
        )}

        {/* Loja / Quests */}
        {mostrarQuest && (
          <motion.div
            key="quests"
            className="quests"
            initial={{ opacity: 0, scale: 0.95, x: 80 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.95, x: 80, transition: { duration: 0.5, ease: "easeInOut" } }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <div className='tituloLoja'>
              <div className='texto-estilo'><h3>Loja!</h3></div>
              <button className='botao-fechar-loja' onClick={toggleConteudoQuest}></button>
            </div>
            <div className="loja">
              <div className="container-loja">
                <div className="item-loja">
                  <div className="water-icon"></div>
                  <div className="preco-upgrade">{precoUpgradeAgua} pontos</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ 
                        backgroundColor: pontos < precoUpgradeAgua ? '#EB5757' : '#6FCF97' 
                      }}
                      onClick={() => {
                        if (pontos >= precoUpgradeAgua && upgradeAguaFn) {
                          setPontos(p => p - precoUpgradeAgua);
                          upgradeAguaFn();
                          setPrecoUpgradeAgua(p => p * 2); // dobra o valor após cada compra
                        }
                        else {
                          alert("Você não tem pontos suficientes ou o tanque ainda não está pronto.");
                        }
                      }}
                    >
                      Upgrade Água
                    </button>
                  </motion.div>
                </div>

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
      </AnimatePresence>

      {/* Componente do tanque */}
      <TanqueAgua onRegisterUpgrade={handleRegisterUpgrade} />
    </>
  );
}

export default Botao_menu;
