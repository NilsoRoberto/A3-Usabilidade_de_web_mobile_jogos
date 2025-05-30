import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Cadastro.css";

function Cadastro() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    
  const handleSubmit = async () => {
    const dados = { email, senha };

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate("/");
      } else {
        alert("Erro ao cadastrar.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

    return (
      <>
<div className="background">
      <div className="box">
        <h1 className="logo">
        <div onClick={() => navigate('/')}>
          <span className="eco">eco</span>
          <span className="farm">farm</span>
        </div>
        </h1>

        <div className="div_ajuste">
        <input className="caixa_texto" type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <input className="caixa_texto" type="text" placeholder="senha" onChange={(e) => setSenha(e.target.value)}/>
        <button onClick={handleSubmit}>Cadastrar</button>
        </div>
      </div>
    </div>
      </>
    );
  }
  
  export default Cadastro;