import React, { useEffect, useState } from 'react';
import Professor from './Professor'; // usando o Professor que você já fez

const EventoProfessor = () => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    // Exibir pela primeira vez após 10s (para testes, depois troque para 300000 = 5 min)
    const timeout = setTimeout(() => {
      setMostrar(true);
    }, 300000);

    // Repetir a cada 5 minutos
    const intervalo = setInterval(() => {
      setMostrar(true);
    }, 600000); // 5 minutos

    return () => {
      clearTimeout(timeout);
      clearInterval(intervalo);
    };
  }, []);

  const aoFinalizar = () => {
    setMostrar(false);
  };

  return mostrar ? <Professor aoFinalizar={aoFinalizar} /> : null;
};

export default EventoProfessor;
