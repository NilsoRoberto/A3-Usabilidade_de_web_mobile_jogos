import "./Cadastro.css";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function VerificarCodigo() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";

  const [codigo, setCodigo] = useState("");
  const [mensagem, setMensagem] = useState("");

  const verificarCodigo = async () => {
    if (!codigo || !email) {
      setMensagem("Preencha o código e o email corretamente.");
      return;
    }

    console.log("📤 Enviando verificação:", { email, code: codigo });

    try {
      const resposta = await axios.post("http://localhost:3001/verify-code", {
        email,
        code: codigo,
      });

      console.log("✅ Resposta do servidor:", resposta.data);

      setMensagem(resposta.data.message);

      // Aguarda 1.5s e redireciona se sucesso
      if (resposta.data.message.toLowerCase().includes("válido")) {
        setTimeout(() => {
          navigate("/reset", { state: { email } });
        }, 1500);
      }

    } catch (erro) {
      console.error("❌ Erro ao verificar código:", erro);
      setMensagem(erro.response?.data?.message || "Erro ao verificar o código.");
    }
  };

  return (
    <div className="background">
      <div className="box">
        <h1 className="logo" onClick={() => navigate("/")}>
          <span className="eco">eco</span>
          <span className="farm">farm</span>
        </h1>

        <div className="div_correcao_reset">
          <p style={{ marginBottom: 10 }}>
            Um código foi enviado para o email: <strong>{email}</strong>
          </p>

          <input
            className="caixa_texto"
            type="text"
            placeholder="Digite o código"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />

          <div className="botao_estilo" onClick={verificarCodigo}>
            <p>Confirmar</p>
          </div>

          {mensagem && (
            <p className='bemvindo_validado'
              style={{
                marginTop: 10,
                color:
                  mensagem.toLowerCase().includes("sucesso") ||
                  mensagem.toLowerCase().includes("válido")
                    ? "green"
                    : "red",
              }}
            >
              {mensagem}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerificarCodigo;
