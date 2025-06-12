import React, { useState, useEffect } from "react";
import "./WaterTank.css";

const TanqueAgua = ({ onRegisterUpgrade }) => {
  const [waterLevel, setWaterLevel] = useState(10000);
  const [intervalTime, setIntervalTime] = useState(5000); // tempo entre cada regeneração

  const useWater = () => {
    setWaterLevel(prev => Math.max(prev - 10, 0));
  };


  // Atualiza a água com base no tempo
useEffect(() => {
  const interval = setInterval(() => {
    setWaterLevel(prev => Math.min(prev + 1, 100));
  }, intervalTime);
  return () => clearInterval(interval);
}, [intervalTime]);

  // Aumenta a velocidade de regeneração
const upgradeAgua = () => {
  setIntervalTime(prev => Math.max(250, prev - 250));
};
  // Passa a função para fora, se fornecido
  useEffect(() => {
    if (onRegisterUpgrade) {
      onRegisterUpgrade(upgradeAgua);
    }
  }, [onRegisterUpgrade]);

  return (
    <div className="tank-container">
      <div className="water" style={{ height: `${waterLevel}%` }}>
      </div>
      <button className='button-water' onClick={useWater}>Usar Água</button>
    </div>
  );
};

export default TanqueAgua;
