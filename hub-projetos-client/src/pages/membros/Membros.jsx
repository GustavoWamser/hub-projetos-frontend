import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";
import ModalMembro from "./ModalMembro";
import { useMembros } from "./useMembros";

function Membros({ modalAberto, setModalAberto }) {
  const [membros, setMembros] = useState([]);
  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("");

  function carregarMembros() {
    axios.get("http://127.0.0.1:8000/api/membros/").then(res => setMembros(res.data));
  }

  useEffect(() => {
    carregarMembros();
  }, []);

  const {
    nome, setNome, cargo, setCargo, sigla, setSigla,
    email, setEmail, curso, setCurso, setFoto,
    membroSelecionado, setMembroSelecionado,
    fecharModal, handleCriarMembro, handleEditarMembro, handleApagarMembro,
  } = useMembros(setModalAberto, carregarMembros);

  const normalizar = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const membrosFiltrados = membros
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .filter(m => filtroBusca === "" ||
      normalizar(m.nome).includes(normalizar(filtroBusca)) ||
      normalizar(m.sigla).includes(normalizar(filtroBusca)))
    .filter(m => filtroCurso === "" || m.curso === filtroCurso);

  return (
    <>
      <div id="input-search">
        <input type="text" placeholder="Buscar por nome ou sigla..." onChange={e => setFiltroBusca(e.target.value)} />
        <select onChange={e => setFiltroCurso(e.target.value)}>
          <option value="">Todos os Cursos</option>
          <option value="Engenharia Mecânica">Engenharia Mecânica</option>
          <option value="Engenharia de Produção">Engenharia de Produção</option>
          <option value="Engenharia de Controle e Automação">Engenharia de Controle e Automação</option>
          <option value="Engenharia Química">Engenharia Química</option>
          <option value="Engenharia de Materiais">Engenharia de Materiais</option>
          <option value="Engenharia Elétrica">Engenharia Elétrica</option>
          <option value="Engenharia Eletrônica">Engenharia Eletrônica</option>
        </select>
      </div>

      <div id="cards">
        {membrosFiltrados.map(membro => (
          <Card
            key={membro.id}
            tipo="membro"
            dados={membro}
            onClick={() => {
              setMembroSelecionado(membro);
              setNome(membro.nome);
              setCargo(membro.cargo);
              setSigla(membro.sigla);
              setEmail(membro.email);
              setCurso(membro.curso);
              setModalAberto(true);
            }}
          />
        ))}
      </div>

      {modalAberto && (
        <ModalMembro
          membroSelecionado={membroSelecionado}
          fecharModal={fecharModal}
          handleCriarMembro={handleCriarMembro}
          handleEditarMembro={handleEditarMembro}
          handleApagarMembro={handleApagarMembro}
          nome={nome} setNome={setNome}
          sigla={sigla} setSigla={setSigla}
          email={email} setEmail={setEmail}
          cargo={cargo} setCargo={setCargo}
          curso={curso} setCurso={setCurso}
          setFoto={setFoto}
        />
      )}
    </>
  );
}

export default Membros;