import "./Cadastro.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function ResetSenha() {
  const navigate = useNavigate();
  const email = localStorage.getItem("emailRecuperacao");

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(""); // estado para mensagem sucesso

  const handleSubmit = async () => {
    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      setSucesso("");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, novaSenha: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setErro("");
        setSucesso("Senha alterada com sucesso!");
        localStorage.removeItem("emailRecuperacao");

        // Timer para redirecionar após 10 segundos
        setTimeout(() => {
          navigate("/");
        }, 1000);

      } else {
        setErro(data.message || "Erro ao alterar senha.");
        setSucesso("");
      }
    } catch (error) {
      console.error("Erro:", error);
      setErro("Erro na conexão com o servidor.");
      setSucesso("");
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
          <div className="esqueceu_senha_fonte">
            <p>Informe sua nova senha:</p>
          </div>
          <input
            className="caixa_texto"
            type="password"
            placeholder="Nova senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <input
            className="caixa_texto"
            type="password"
            placeholder="Confirme senha"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
          <div className="botao_estilo" onClick={handleSubmit}>
            <p>Enviar</p>
          </div>
          {erro && <p className='bemvindo'>{erro}</p>}
          {sucesso && <p className='bemvindo'>{sucesso}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetSenha;