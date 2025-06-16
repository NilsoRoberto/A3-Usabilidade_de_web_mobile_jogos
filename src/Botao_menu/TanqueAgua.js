import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import "./WaterTank.css";

const TanqueAgua = forwardRef(({ onRegisterUpgrade }, ref) => {
  const [waterLevel, setWaterLevel] = useState(100);
  const [intervalTime, setIntervalTime] = useState(3000); // tempo entre cada regeneração

  const useWater = (amount = 10) => {
    setWaterLevel(prev => Math.max(prev - amount, 0));
  };

  const upgradeAgua = () => {
    setIntervalTime(prev => Math.max(250, prev - 250));
  };

  // Expor funções e estados para o componente pai
  useImperativeHandle(ref, () => ({
    waterLevel,
    useWater,
  }));

  // Atualiza a água com base no tempo
  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.min(prev + 1, 100));
    }, intervalTime);
    return () => clearInterval(interval);
  }, [intervalTime]);

  // Passa a função para fora, se fornecido
  useEffect(() => {
    if (onRegisterUpgrade) {
      onRegisterUpgrade(() => upgradeAgua);
    }
  }, [onRegisterUpgrade]);

  return (
    <div className="tank-container">
      <div className="water" style={{ height: `${waterLevel}%` }} />
    </div>
  );
});

export default TanqueAgua;
