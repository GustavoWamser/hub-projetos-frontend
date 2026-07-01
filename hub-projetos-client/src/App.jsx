import { useState, useEffect } from "react";
import SideBar from "./components/SideBar";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import "./App.css";

function App() {
  const [page, setPage] = useState("projetos");
  const [membros, setMembros] = useState([]);
  const [projetos, setProjetos] = useState([]);
  const [empresas, setEmpresas] = useState([]);

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
      <SideBar page={page} setPage={setPage} />
      <div id="main">
        <NavBar page={page} />
        <div id="input-search">
          <input type="text" placeholder="Buscar por nome, empresa ou descrição..." />
          <select>
            <option>Todos os Status</option>
            <option>Concluído</option>
            <option>Em Andamento</option>
            <option>Planejamento</option>
            <option>Atrasado</option>
          </select>
          <select>
            <option>Empresa Parceira</option>
          </select>
        </div>
        <div id="cards">
          {page === "projetos" && projetos.map(projeto => (
            <Card
              key={projeto.id}
              tipo="projeto"
              dados={{
                ...projeto,
                empresaNome: empresas.find(e => e.id === projeto.empresa)?.nome
              }}
            />
          ))}
          {page === "membros" && membros.map(membro => (
            <Card key={membro.id} tipo="membro" dados={membro} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;