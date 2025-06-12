import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Cadastro from './Login/Cadastro';
import Acesso from './Login/Acesso';
import EsqueciSenha from './Login/EsqueciSenha';
import VerificarCodigo from './Login/VerificarCodigo';
import "./Login/Login.css";
import Sobre from "./Login/Sobre";
import ResetSenha from './Login/ResetSenha';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/acesso" element={<Acesso />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/verificar-codigo" element={<VerificarCodigo />} />
        <Route path='/sobre' element={<Sobre />}/>
        <Route path='/reset' element={<ResetSenha />}/>
      </Routes>
    </Router>
  );
}

export default App;