import { useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar({ onNovo }) {
  const location = useLocation();
  const isProjetos = location.pathname === "/" || location.pathname === "/projetos";

  return (
    <div id="navbar">
      <h1>{isProjetos ? "Projetos" : "Membros"}</h1>
      <button id="btn-novo" onClick={onNovo}>
        <div className="btn-add">
          <img src="/add.png" alt="add-img" className="add-img"/>
          {isProjetos ? "Novo Projeto" : "Novo Membro"}
        </div>
      </button>
    </div>
  );
}

export default NavBar;