import { useNavigate, useLocation } from "react-router-dom";
import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div id="sidebar">
      <div id="logo">
        <img src="/neo_logo.png" />
        <h2>HUB de Projetos</h2>
      </div>

      <nav id="menu">
        <button
          className={location.pathname === "/projetos" || location.pathname === "/" ? "active" : ""}
          onClick={() => navigate("/projetos")}
        >
          📁 Projetos
        </button>
        <button
          className={location.pathname === "/membros" ? "active" : ""}
          onClick={() => navigate("/membros")}
        >
          👤 Membros
        </button>
      </nav>

      <div id="menu-bottom">
        <button>⚙ Configurações</button>
        <button>❓ Ajuda & Suporte</button>
      </div>
    </div>
  );
}

export default SideBar;