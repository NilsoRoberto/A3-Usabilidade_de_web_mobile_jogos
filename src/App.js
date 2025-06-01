import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Cadastro from './Login/Cadastro';
import Acesso from './Login/Acesso';
import "./Login/Login.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/acesso" element={<Acesso />} />
      </Routes>
    </Router>
  );
}

export default App;