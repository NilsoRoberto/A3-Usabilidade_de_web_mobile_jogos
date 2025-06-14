import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom';
import "./Cadastro.css";
import Botao_menu from '../Botao_menu/Botao_menu.js';


function Acesso() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem(<span className="bemvindo">Bem-vindo, {data.nome}!</span>);
        // redireciona para a página principal ou dashboard após 1 segundo
       setTimeout(() => {
         navigate("/menu"); // ou para a página desejada, tipo: navigate('/dashboard')
        }, 1000);
      } else {
        setMensagem(<span className="erro">{data.error}</span>);
      }
    } catch (error) {
      navigate("/menu") // ou para a página desejada, tipo: navigate('/dashboard')
      setMensagem(<span className="erro">Erro ao conectar com o servidor.</span>);
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

          <div className="div_correcao">
            <input
              className="caixa_texto"
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="caixa_texto"
              type="password"
              placeholder="senha"
              onChange={(e) => setSenha(e.target.value)}
            />
            <Link to="/esqueci-senha" className="teste">Esqueci minha senha</Link>
          </div>
          <button className="botao" onClick={handleSubmit}>
            Entrar
          </button>

          {mensagem && <p className="mensagem-login">{mensagem}</p>}
        </div>
      </div>
    </>
  );
}

export default Acesso;
