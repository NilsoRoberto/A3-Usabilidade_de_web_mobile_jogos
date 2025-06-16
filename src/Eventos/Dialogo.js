import { useEffect, useState } from 'react';
import './Dialogo.css';

function Dialogo({ textoCompleto, nome }) {
  const [textoVisivel, setTextoVisivel] = useState('');
  const [index, setIndex] = useState(0);

  // Reinicia o texto se mudar o textoCompleto (novo diálogo)
  useEffect(() => {
    setTextoVisivel('');
    setIndex(0);
  }, [textoCompleto]);

  // Efeito de digitação letra por letra
  useEffect(() => {
    if (index < textoCompleto.length) {
      const timeout = setTimeout(() => {
        setTextoVisivel((prev) => prev + textoCompleto.charAt(index));
        setIndex((prev) => prev + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [index, textoCompleto]);

  return (
    <div className="dialogo-container">
      <div className="fala">
        <div className="nome">{nome}</div>
        <div className="texto">
          {textoVisivel.split('\n').map((linha, index) => (
            <p key={index}>{linha}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dialogo;
