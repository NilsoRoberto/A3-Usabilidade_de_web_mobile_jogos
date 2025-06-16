import './Botao_menu.css';
import TanqueAgua from './TanqueAgua';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import listaPlantas from '../Plantas/listaPlantas';

const playSound = (src) => {
  const audio = new Audio(src);
  audio.play();
};

function Botao_menu({ 
  score, 
  setScore, 
  inventario, 
  setInventario, 
  upgradeAgua, 
  dinheiro, 
  setDinheiro, 
  upgradeVenda, 
  upgradeColheita 
}) {
  const [mostrarConteudo, setMostrarConteudo] = useState(false);
  const [mostrarInven, setMostrarInven] = useState(false);
  const [mostrarQuest, setMostrarQuest] = useState(false);
  const [mostrarVegan, setMostrarVegan] = useState(false);
  const [precoUpgradeAgua, setPrecoUpgradeAgua] = useState(100);
  const [precoUpgradeColheita, setPrecoUpgradeColheita] = useState(200);
  const [precoUpgradeVenda, setPrecoUpgradeVenda] = useState(300);

  const handleCompra = (preco) => {
    if (dinheiro >= preco) {
      setDinheiro(d => d - preco);
      playSound('/sons/upgrade.mp3');
    } else {
      playSound('/sons/erro.mp3');
      alert("Você não tem dinheiro suficiente.");
    }
  };

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
      <motion.div
        className="botao-redondo"
        onClick={toggleConteudo}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.80, y: 2 }}
        transition={{ type: "spring", stiffness: 300 }}
        exit={{ opacity: 0, scale: 0 }}
      ></motion.div>

      <AnimatePresence>
        {mostrarConteudo && (
          <motion.div
            className="menu-lateral"
            animate={{ x: [0, 80], opacity: [0, 20, 40, 100] }}
            exit={{ opacity: 0, scale: 0.95, x: 80 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <motion.div className='container' onClick={toggleConteudoInv} whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="iventory-icon"></div>
              <div className="texto-estilo"><h1>Inventário</h1></div>
            </motion.div>

            <motion.div className='container' onClick={toggleConteudoQuest} whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="quests-icon"></div>
              <div className="texto-estilo"><h1>Loja</h1></div>
            </motion.div>

            <motion.div className='container' onClick={toggleConteudoVegan} whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
              <div className="vegan-icon"></div>
              <div className="texto-estilo"><h1>Vegetais</h1></div>
            </motion.div>
          </motion.div>
        )}

        {mostrarInven && (
          <motion.div key="inventario" className="inventario" initial={{ opacity: 0, scale: 0.95, x: 80 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 80 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
            <div className='tituloInv'>
              <div className='texto-estilo'><h2>Inventário</h2></div>
              <button className='botao-fechar-inventario' onClick={toggleConteudoInv}></button>
            </div>
            <div className='inv'>
              <div
                className="containerScroll"
                style={{
                  maxHeight: '400px',
                  overflowY: 'auto',
                  paddingRight: '10px'
                }}
              >
                {inventario.length === 0 && <h4>Inventário vazio.</h4>}

                {inventario.map((nomePlanta, i) => {
                  const planta = listaPlantas[nomePlanta];

                  if (!planta) {
                    console.warn(`Planta não encontrada no listaPlantas: ${nomePlanta}`);
                    return null;
                  }

                  return (
                    <div
                      key={i}
                      className="ContainerInv"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        padding: '10px',
                        marginBottom: '15px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: '#fff'
                      }}
                    >
                      <img
                        src={planta.imagemFoto}
                        alt={planta.nome}
                        draggable
                        onDragStart={e => e.dataTransfer.setData("planta", nomePlanta)}
                        style={{
                          border: "2px solid brown",
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                          cursor: "grab",
                          width: "60px",
                          height: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          padding: "5px",
                          backgroundColor: '#fdf6f0'
                        }}
                        title={`Arraste para plantar: ${planta.nome}`}
                      />

                      <div className="ContainerInf" style={{ lineHeight: '1.5' }}>
                        <p><strong>{planta.nome}</strong></p>
                        <p>Recompensa: {planta.recompensa}</p>
                        <p>Preço: 💰 R${planta.preco}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </motion.div>
        )}

        {mostrarQuest && (
          <motion.div key="quests" className="quests" initial={{ opacity: 0, scale: 0.95, x: 80 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 80 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
            <div className='tituloLoja'>
              <div className='texto-estilo'><h3>Loja!</h3></div>
              <button className='botao-fechar-loja' onClick={toggleConteudoQuest}></button>
            </div>
            <div className="loja">
              <div className="container-loja">
                <div className="item-loja">
                  <div className="water-icon"></div>
                  <div className="preco-upgrade">R${precoUpgradeAgua}</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ backgroundColor: dinheiro < precoUpgradeAgua ? '#EB5757' : '#6FCF97' }}
                      onClick={() => {
                        if (dinheiro >= precoUpgradeAgua && upgradeAgua) {
                          setDinheiro(p => p - precoUpgradeAgua);
                          playSound('/sons/upgrade.mp3');
                          upgradeAgua();
                          setPrecoUpgradeAgua(p => p * 2);
                        } else {
                          playSound('/sons/erro.mp3');
                          alert("Você não tem dinheiro suficiente ou o tanque não está pronto.");
                        }
                      }}
                    >
                      Upgrade Água
                    </button>
                  </motion.div>
                </div>

                

                <div className="item-loja">
                  <div className="vegetables-icon"></div>
                  <div className="preco-upgrade">R${precoUpgradeVenda}</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ backgroundColor: dinheiro >= precoUpgradeVenda ? '#6FCF97' : '#EB5757' }}
                      onClick={() => {
                        if (dinheiro >= precoUpgradeVenda && upgradeVenda) {
                          handleCompra(precoUpgradeVenda);
                          setPrecoUpgradeVenda(prev => prev * 2);
                          upgradeVenda();
                        } else {
                          playSound('/sons/erro.mp3');
                          alert(dinheiro < precoUpgradeVenda ? "Dinheiro insuficiente!" : "Erro no upgrade.");
                        }
                      }}
                    >
                      Upgrade Venda
                    </button>
                  </motion.div>
                </div>

                <div className="item-loja">
                  <div className="harvest-icon"></div>
                  <div className="preco-upgrade">R${precoUpgradeColheita}</div>
                  <motion.div whileTap={{ scale: 0.80, y: 2 }} transition={{ type: "spring", stiffness: 300 }}>
                    <button
                      className="botao_loja"
                      style={{ backgroundColor: dinheiro >= precoUpgradeColheita ? '#6FCF97' : '#EB5757' }}
                      onClick={() => {
                        if (dinheiro >= precoUpgradeColheita && upgradeColheita) {
                          handleCompra(precoUpgradeColheita);
                          setPrecoUpgradeColheita(prev => prev * 2);
                          upgradeColheita();
                        } else {
                          playSound('/sons/erro.mp3');
                          alert("Dinheiro insuficiente ou upgrade não disponível!");
                        }
                      }}
                    >
                      Upgrade Colheita
                    </button>
                  </motion.div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {mostrarVegan && (
          <motion.div key="vegan" className="vegan" initial={{ opacity: 0, scale: 0.95, x: 80 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95, x: 80 }} transition={{ duration: 1.2, ease: "easeInOut" }}>
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
                      if (dinheiro >= planta.preco) {
                        setDinheiro(p => p - planta.preco);
                        setInventario(inv => [...inv, tipo]);
                        playSound("/sons/comprar.mp3");
                      } else {
                        playSound("/sons/erro.mp3");
                        alert("Pontos insuficientes para comprar " + planta.nome);
                      }
                    }}
                  >
                    <img
                      src={planta.imagemFoto}
                      alt={planta.nome}
                      style={{
                        border: "2px solid brown",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                        cursor: "pointer",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        padding: "5px",
                      }}
                    />
                    <span>{planta.nome}</span>
                    <div className="botao_loja-vegan">
                      <span>Comprar 💰 {planta.preco} </span>
                    </div>
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