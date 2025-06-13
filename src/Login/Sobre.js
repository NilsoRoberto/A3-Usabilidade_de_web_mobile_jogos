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
          <p className="sobre_texto">Duis mollit minim esse aliqua aliqua proident ad laboris aute nisi et anim. Id fugiat labore nostrud est et magna exercitation nulla. Exercitation anim minim do anim dolore commodo ullamco id ut quis. Pariatur aliqua anim anim magna in. Culpa ad pariatur fugiat elit occaecat consequat ex officia. Reprehenderit magna consectetur velit aute sunt sunt veniam do in aliqua non commodo culpa. Enim commodo laborum est aliquip labore dolor et veniam.</p>
        </div>
      </div>
    </div>
  );
}

export default Sobre;
