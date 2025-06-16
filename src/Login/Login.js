import Botoes from "./Botoes";

function Login() {
  return (
    <div className="background">
      <div className="box">
        <h1 className="logo">
          <span className="eco">eco</span>
          <span className="farm">farm</span>
        </h1>
        <Botoes />
      </div>
    </div>
  );
}

export default Login;