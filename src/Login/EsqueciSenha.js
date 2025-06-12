import "./Cadastro.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function EsqueciSenha() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");

  const enviarCodigo = async () => {
    try {
      const resposta = await axios.post("http://localhost:3001/send-reset-code", { email });
      setMensagem(resposta.data.message);

      // Espera 5 segundos antes de redirecionar
      setTimeout(() => {
        localStorage.setItem("emailRecuperacao", email);
        navigate('/verificar-codigo', { state: { email } });
      }, 1500);
    } catch (erro) {
      console.error("❌ Erro ao enviar:", erro);
      setMensagem(erro.response?.data?.message || "Erro ao enviar.");
    }
  };

  return (
    <div className="background">
      <div className="box">
        <h1 className="logo" onClick={() => navigate('/')}>
          <span className="eco">eco</span><span className="farm">farm</span>
        </h1>

        <div className="div_correcao">
          <div className="esqueceu_senha_fonte">
            <p>Digite seu email para envio do código de verificação:</p>
          </div>

          <input
            className="caixa_texto"
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="botao_estilo" onClick={enviarCodigo}>
            <p>enviar</p>
          </div>

          {mensagem && <p className='bemvindo'>{mensagem}</p>}
        </div>
      </div>
    </div>
  );
}

export default EsqueciSenha;
