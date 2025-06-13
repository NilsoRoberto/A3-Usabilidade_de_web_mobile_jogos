import './Fundo/Fundo.js'; 
import Fundo from './Fundo/Fundo.js';
import Botao_menu from './Botao_menu/Botao_menu';
import TanqueAgua from './Botao_menu/TanqueAgua';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Cadastro from './Login/Cadastro';
import Acesso from './Login/Acesso';
import EsqueciSenha from './Login/EsqueciSenha';
import VerificarCodigo from './Login/VerificarCodigo';
import "./Login/Login.css";
import Sobre from "./Login/Sobre";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/acesso" element={<Acesso />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/verificar-codigo" element={<VerificarCodigo />} />
        <Route path='/sobre' element={<Sobre />}/>
      </Routes>
    </Router>                 
    {/* <Botao_menu></Botao_menu>
    <Fundo> </Fundo>*/}
    </>
  );
}
export default App;
