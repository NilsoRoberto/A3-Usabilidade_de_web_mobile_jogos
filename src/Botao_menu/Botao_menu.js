import './Botao_menu.css';
import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

function Botao_menu() {
  const [mostrarConteudo, setMostrarConteudo] = useState(false);
  const [mostrarInven, setMostrarInven] = useState(false);
  const [mostrarQuest, setMostrarQuest] = useState(false);

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
        animate={{
          x: [0, 80], 
          opacity: [0, 20, 40, 100],
        }}
        exit={{ 
          opacity: 0, 
          scale: 0.95, 
          x: 80,
          transition: { duration: 0.5, ease: "easeInOut" }
        }}
        transition={{
          duration: 1.2,
          ease: "easeInOut"
        }}
      > 
        <motion.div
          className='container'
          onClick={toggleConteudoInv}
          whileTap={{ scale: 0.80, y: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
        <div className="iventory-icon"></div>
        <div class="texto-estilo"><h1>Inventário</h1></div>
        </motion.div>


        {/* enchendo conteudo Quests */}
        <motion.div
          className='container'
          onClick={toggleConteudoQuest}
          whileTap={{ scale: 0.80, y: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
        <div className="quests-icon"></div>
        <div class="texto-estilo"><h1>Missoes</h1></div>
        </motion.div>


        {/* Enchendo conteudo */}
        <motion.div
          className='container'
          onClick={toggleConteudoInv}
          whileTap={{ scale: 0.80, y: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
        <div className="iventory-icon"></div>
        <div class="texto-estilo"><h1>Inventário</h1></div>
        </motion.div>
        
        
    </motion.div>
    )}
    {/* Iventario*/}
    {mostrarInven && (
    <motion.div
      key="inventario" // garante rastreamento único da div
      className="inventario"
      initial={{ opacity: 0, scale: 0.95, x: 80 }}
        animate={{ 
        opacity: 1, 
        scale: 1, 
        x: 0 
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95, 
        x: 80,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut"
      }}
    >
      <div className='tituloInv'>
        <div className='texto-estilo'><h2>Inventário</h2></div>
        <button className='botao-fechar' onClick={toggleConteudoInv}></button>
      </div>
      <div className='inv'>
      </div>
    </motion.div>
    )}

    {/* Quests */}
    {mostrarQuest && (
    <motion.div
      key="quests"
      className="quests"
      initial={{ opacity: 0, scale: 0.95, x: 80 }}
        animate={{ 
        opacity: 1, 
        scale: 1, 
        x: 0 
      }}
      exit={{ 
        opacity: 0, 
        scale: 0.95, 
        x: 80,
        transition: { duration: 0.5, ease: "easeInOut" }
      }}
      transition={{
        duration: 1.2,
        ease: "easeInOut"
      }}
    ></motion.div>
    )}

  </AnimatePresence>
</>
);
}

export default Botao_menu;
