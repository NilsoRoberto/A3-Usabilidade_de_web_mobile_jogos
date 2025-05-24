import './Botao_menu.css';
import { useState } from 'react';
import {motion} from "framer-motion";

function Botao_menu(){
  const [mostrarConteudo, setMostrarConteudo] = useState(false);

  const toggleConteudo = () => {
    setMostrarConteudo(!mostrarConteudo);
  };

  return (
    <>
      <motion.div 
      className="botao-redondo" onClick={toggleConteudo}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}

      ></motion.div>

    {mostrarConteudo && (
        <motion.div 
            className="menu-lateral"
             animate={{
                 x: [0, 80], 
                 borderRadius: ["90%", "50%", "5%"]                
                }}
        >
          <div className="item-redondo"> 1</div>
          <div className="item-redondo"> 2</div>
          <div className="item-redondo"> 3</div>
        </motion.div>
      )}
    </>
  );
}


export default Botao_menu;