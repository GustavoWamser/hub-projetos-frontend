import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Projetos from "./pages/projetos/Projetos";
import Membros from "./pages/membros/Membros";
import "./App.css";

function App() {
  const [modalAberto, setModalAberto] = useState(false);

  return (
    <div id="app">
      <SideBar />
      <div id="main">
        <NavBar onNovo={() => setModalAberto(true)} />
        <Routes>
          <Route path="/projetos" element={<Projetos modalAberto={modalAberto} setModalAberto={setModalAberto} />} />
          <Route path="/membros" element={<Membros modalAberto={modalAberto} setModalAberto={setModalAberto} />} />
          <Route path="*" element={<h2>Página Não Encontrada</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;