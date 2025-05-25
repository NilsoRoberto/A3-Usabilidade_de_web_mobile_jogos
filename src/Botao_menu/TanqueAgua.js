// TanqueAgua.jsx
import React, { useState, useEffect } from "react";
import "./WaterTank.css";

const TanqueAgua = () => {
  const [waterLevel, setWaterLevel] = useState(100);
  const [bubbles, setBubbles] = useState([]);

  const useWater = () => {
    setWaterLevel(prev => Math.max(prev - 10, 0));
    criarBolhas();
  };

  const criarBolhas = () => {
    const novas = Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => Date.now() + Math.random());
    setBubbles((prev) => [...prev, ...novas]);

    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => !novas.includes(b)));
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWaterLevel(prev => Math.min(prev + 1, 100));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="tank-container">
      <div
        className="water"
        style={{ height: `${waterLevel}%` }}
      >
        {bubbles.map((id) => (
          <div key={id} className="bubble" style={{ "--x": Math.random() }}></div>
        ))}
      </div>
      <button className='button-water' onClick={useWater}>Usar Água</button>
    </div>
  );
};

export default TanqueAgua;
