import "./SideBar.css";

function SideBar({ page, setPage }) {
  return (
    <div id="sidebar">
      <div id="logo">
        <img src="/neo_logo.png" />
        <h2>HUB de Projetos</h2>
      </div>

      <nav id="menu">
        <button className={page === "projetos" ? "active" : ""} onClick={() => setPage("projetos")}>
          📁 Projetos
        </button>
        <button className={page === "membros" ? "active" : ""} onClick={() => setPage("membros")}>
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