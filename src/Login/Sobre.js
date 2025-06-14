import "./Cadastro.css";
import { useNavigate } from "react-router-dom";

function Sobre() {
    const navigate = useNavigate();

  return (
    <div className="background">
      <div className="box">
        <h1 className="logo" onClick={() => navigate("/")}>
          <span className="eco">eco</span>
          <span className="farm">farm/</span>
          <span className="eco">sobre</span>
          <span className="farm"> nós</span>
        </h1>

        <div>
          <p className="sobre_texto">Na EcoFarm, acreditamos que grandes mudanças começam em casa. Nosso jogo é uma ferramenta educativa criada para conscientizar sobre a importância do combate ao desperdício, de forma divertida e interativa.
<br />
<br />Por meio do plantio de alimentos e cuidados com a natureza, os jogadores aprendem na prática como pequenas ações podem gerar grandes impactos. Aqui, ensinar o cultivo responsável é também ensinar a valorizar os recursos que temos.
<br />
<br />EcoFarm é mais que um jogo — é uma semente de mudança plantada com conhecimento e diversão. </p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
