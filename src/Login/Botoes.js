import { useNavigate } from "react-router-dom";

function Botoes() {
  const navigate = useNavigate();

  return (
    <>
        <div className="botoes">
        <div className="div_ajuste">
            <div className="botao_estilo" onClick={() => navigate('/cadastro')}>
            <p>novo jogo</p>
            </div>
            <div className="botao_estilo">
            <p>continuar</p>
            </div>
            <div className="botao_estilo">
            <p>sair</p>
            </div>
        </div>
        </div>
    </>
  );
}

export default Botoes;