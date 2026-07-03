import { useState } from "react";
import axios from "axios";
import Select from 'react-select';
import Card from "../components/Card";
import Modal from "../components/Modal";

function Membros({ membros, modalAberto, setModalAberto }) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [sigla, setSigla] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [foto, setFoto] = useState(null);

  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroCurso, setFiltroCurso] = useState("");

  const normalizar = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const membrosFiltrados = membros
    .filter(m => filtroBusca === "" ||
      normalizar(m.nome).includes(normalizar(filtroBusca)) ||
      normalizar(m.sigla).includes(normalizar(filtroBusca)))
    .filter(m => filtroCurso === "" || m.curso === filtroCurso);

  function handleCriarMembro() {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("cargo", cargo);
    formData.append("sigla", sigla);
    formData.append("email", email);
    formData.append("curso", curso);
    if (foto) formData.append("foto", foto);

    axios.post("http://127.0.0.1:8000/api/membros/", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(() => {
      setModalAberto(false);
      window.location.reload();
    });
  }

  return (
    <>
      <div id="input-search">
        <input
          type="text"
          placeholder="Buscar por nome ou sigla..."
          onChange={e => setFiltroBusca(e.target.value)}
        />
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
          <Card key={membro.id} tipo="membro" dados={membro} />
        ))}
      </div>

      {modalAberto && (
        <Modal titulo="Novo Membro" onClose={() => setModalAberto(false)}>
          <label>Nome:</label>
          <input type="text" placeholder="Digite o Nome" onChange={e => setNome(e.target.value)} />

          <label>Sigla:</label>
          <input type="text" placeholder="Ex: GWX" onChange={e => setSigla(e.target.value)} />

          <label>Email:</label>
          <input type="email" placeholder="Digite o Email" onChange={e => setEmail(e.target.value)} />

          <label>Cargo:</label>
          <select onChange={e => setCargo(e.target.value)}>
            <option value="">Escolha</option>
            <option value="AG LID">AG LID</option>
            <option value="AG PRJ">AG PRJ</option>
            <option value="AG DP">AG DP</option>
            <option value="AG MKT">AG MKT</option>
            <option value="Executor Pleno">Executor Pleno</option>
            <option value="Auxiliar Processos">Auxiliar de Processos</option>
            <option value="Org. Palestra">Org. Palestra</option>
            <option value="Processo Seletivo">Processo Seletivo</option>
            <option value="Viagem Longa">Viagem Longa</option>
            <option value="Visita Curta">Visita Curta</option>
            <option value="Auxiliar de Mídias">Auxiliar de Mídias</option>
            <option value="Auxiliar Financeiro">Auxiliar Financeiro</option>
            <option value="Calouro">Calouro</option>
          </select>

          <label>Curso:</label>
          <select onChange={e => setCurso(e.target.value)}>
            <option value="">Escolha</option>
            <option value="Engenharia Mecânica">Engenharia Mecânica</option>
            <option value="Engenharia de Produção">Engenharia de Produção</option>
            <option value="Engenharia de Controle e Automação">Engenharia de Controle e Automação</option>
            <option value="Engenharia Química">Engenharia Química</option>
            <option value="Engenharia de Materiais">Engenharia de Materiais</option>
            <option value="Engenharia Elétrica">Engenharia Elétrica</option>
            <option value="Engenharia Eletrônica">Engenharia Eletrônica</option>
          </select>

          <label>Foto:</label>
          <input className="input-file" type="file" accept="image/*" onChange={e => setFoto(e.target.files[0])} />

          <div id="modal-footer">
            <button id="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            <button id="btn-salvar" onClick={handleCriarMembro}>Adicionar Membro</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Membros;