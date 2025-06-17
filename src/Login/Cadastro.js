import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Cadastro.css";

function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");    
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async () => {
    const dados = { nome, email, senha };

    try {
      const response = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
      });

      if (response.ok) {
        setMensagem(<span className="bemvindo">Cadastro concluido com sucesso!</span>);
        //navigate("/");  // redireciona para a página inicial (ou a que desejar)
        setTimeout(() => {
          navigate("/login", { state: { email } });
        }, 1000);
      } else {
        const errorData = await response.json();
        setMensagem(<span className="erro">{errorData.error || "Erro desconhecido"}</span>);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      setMensagem(<span className="erro">Erro ao conectar com o servidor.</span>);
    }
  };

  return (
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
            placeholder="nome"
            onChange={(e) => setNome(e.target.value)}
          />
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
        </div>

        <button className="botao" onClick={handleSubmit}>
          Cadastrar
        </button>
        {mensagem && <p className="mensagem-login">{mensagem}</p>}
      </div>
    </div>
  );
}

export default Cadastro;
