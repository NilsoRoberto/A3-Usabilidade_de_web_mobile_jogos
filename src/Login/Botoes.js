import { useNavigate } from "react-router-dom";

function Botoes() {
  const navigate = useNavigate();

  return (
    <>
        <div className="botoes">
        <div className="div_ajuste">
            <div className="botao_estilo" onClick={() => navigate('/cadastro')}>
            <p>cadastrar</p>
            </div>
            <div className="botao_estilo" onClick={() => navigate('/acesso')}>
            <p>logar</p>
            </div>
            <div className="botao_estilo" onClick={() => navigate('/sobre')}>
            <p>sobre</p>
            </div>
        </div>
        </div>
    </>
  );
}

export default Botoes;