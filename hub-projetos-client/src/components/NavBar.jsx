import "./NavBar.css";

function NavBar({ page }) {
  return (
    <div id="navbar">
      <h1>{page === "projetos" ? "Projetos" : "Membros"}</h1>
      <button id="btn-novo">
        {page === "projetos" ? "＋ Novo Projeto" : "＋ Novo Membro"}
      </button>
    </div>
  );
}

export default NavBar;