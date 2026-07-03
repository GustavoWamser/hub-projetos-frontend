import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Projetos from "./pages/Projetos";
import Membros from "./pages/Membros";
import "./App.css";

function App() {
  const [membros, setMembros] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/membros/")
      .then(res => res.json())
      .then(data => setMembros(data));

    fetch("http://127.0.0.1:8000/api/projetos/")
      .then(res => res.json())
      .then(data => setProjetos(data));

    fetch("http://127.0.0.1:8000/api/empresas/")
      .then(res => res.json())
      .then(data => setEmpresas(data));
  }, []);

  return (
    <div id="app">
      <SideBar />
      <div id="main">
        <NavBar onNovo={() => setModalAberto(true)} />
        <Routes>
          <Route path="/" element={<Projetos projetos={projetos} empresas={empresas} membros={membros} modalAberto={modalAberto} setModalAberto={setModalAberto} />} />
          <Route path="/projetos" element={<Projetos projetos={projetos} empresas={empresas} membros={membros} modalAberto={modalAberto} setModalAberto={setModalAberto} />} />
          <Route path="/membros" element={<Membros membros={membros} modalAberto={modalAberto} setModalAberto={setModalAberto} />} />
          <Route path="*" element={<h2>Página Não Encontrada</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;