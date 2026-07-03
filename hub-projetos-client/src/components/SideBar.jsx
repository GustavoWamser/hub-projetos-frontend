import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import imgFolders from '/folder.png';
import imgMembers from '/members.png';
import imgConfig from '/config.png';
import imgHelp from '/help.png';
import "./SideBar.css";

function SideBar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div id="sidebar">
      <div id="logo">
        <img src="/neo_logo.png" alt="Logo" />
        <h2>HUB de Projetos</h2>
      </div>

      <nav id="menu">
        <button
          className={location.pathname === "/projetos" || location.pathname === "/" ? "active" : ""}
          onClick={() => navigate("/projetos")}>
          <img src={imgFolders} alt="Projetos" className="sidebar-icon" />
          Projetos
        </button>
        <button
          className={location.pathname === "/membros" ? "active" : ""}
          onClick={() => navigate("/membros")}>
          <img src={imgMembers} alt="Membros" className="sidebar-icon" />
          Membros
        </button>
      </nav>

      <div id="menu-bottom">
        <button>
          <img src={imgConfig} alt="Configurações" className="footer-icon" />
          Configurações
        </button>
        <button>
          <img src={imgHelp} alt="Ajuda" className="footer-icon" />
          Ajuda & Suporte
        </button>
      </div>
    </div>
  );
}

export default SideBar;
