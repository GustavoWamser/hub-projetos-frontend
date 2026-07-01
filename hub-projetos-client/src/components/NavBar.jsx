import { useLocation } from "react-router-dom";
import "./NavBar.css";

function NavBar({ onNovo }) {
  const location = useLocation();
  const isProjetos = location.pathname === "/" || location.pathname === "/projetos";

  return (
    <div id="navbar">
      <h1>{isProjetos ? "Projetos" : "Membros"}</h1>
      <button id="btn-novo" onClick={onNovo}>
        {isProjetos ? "＋ Novo Projeto" : "＋ Novo Membro"}
      </button>
    </div>
  );
}

export default NavBar;