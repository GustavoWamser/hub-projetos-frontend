import { useState } from "react";
import axios from "axios";
import Select from "react-select"; 
import Card from "../components/Card";
import Modal from "../components/Modal";
import "./Select.css";


function Projetos({ projetos, empresas, membros, modalAberto, setModalAberto }) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [prazo, setPrazo] = useState("");
  const [situacao, setSituacao] = useState("");
  const [membrosSelecionados, setMembrosSelecionados] = useState([]);

  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");

  const opcoesMembros = membros.map(m => ({
    value: m.id,
    label: m.nome
  }));

  const normalizar = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const projetosFiltrados = projetos
    .filter(projeto => filtroBusca === "" || normalizar(projeto.nome).includes(normalizar(filtroBusca)))
    .filter(projeto => filtroSituacao === "" || projeto.situacao === filtroSituacao)
    .filter(projeto => filtroEmpresa === "" || projeto.empresa === parseInt(filtroEmpresa));

  function handleCriarProjeto() {
    axios.post("http://127.0.0", { nome, descricao, empresa, prazo, situacao })
      .then(res => {
        const alocacoes = membrosSelecionados.map(membro =>
          axios.post("http://127.0.0", { membro: membro.value, projeto: res.data.id })
        );
        return Promise.all(alocacoes);
      })
      .then(() => {
        setModalAberto(false);
        window.location.reload();
      });
  } 

  return (
    <>
      <div id="input-search">
        <input
          type="text"
          placeholder="Buscar por nome..."
          onChange={e => setFiltroBusca(e.target.value)}
        />
        <select onChange={e => setFiltroSituacao(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
        <select onChange={e => setFiltroEmpresa(e.target.value)}>
          <option value="">Empresa Parceira</option>
          {empresas.map(e => (
            <option key={e.id} value={e.id}>{e.nome}</option>
          ))}
        </select>
      </div>

      <div id="cards">
        {projetosFiltrados.map(projeto => (
          <Card
            key={projeto.id}
            tipo="projeto"
            dados={{
              ...projeto,
              empresaNome: empresas.find(e => e.id === projeto.empresa)?.nome
            }}
          />
        ))}
      </div>

      {modalAberto && (
        <Modal titulo="Novo Projeto" onClose={() => setModalAberto(false)}>
          <label>Nome do Projeto:</label>
          <input type="text" placeholder="Digite o Nome" onChange={e => setNome(e.target.value)} />

          <label>Empresa Parceira:</label>
          <select onChange={e => setEmpresa(e.target.value)}>
            <option value="">Escolha</option>
            {empresas.map(e => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>

          <label>Descrição do Projeto:</label>
          <textarea className="placeholder-font" placeholder="Digite a Descrição do Projeto..." onChange={e => setDescricao(e.target.value)} />

          <label>Prazo do Projeto:</label>
          <input className="placeholder-font" type="date" onChange={e => setPrazo(e.target.value)} />

          <label>Situação:</label>
          <select onChange={e => setSituacao(e.target.value)}>
            <option value="">Escolha</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Membros do Projeto:</label>
          <Select className="select-member-container" classNamePrefix="select-member"
            isMulti
            options={opcoesMembros}
            placeholder="Selecione os membros..."
            value={membrosSelecionados} 
            onChange={(opcoes) => setMembrosSelecionados(opcoes || [])}/>

          <div id="modal-footer">
            <button id="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            <button id="btn-salvar" onClick={handleCriarProjeto}>Criar Projeto</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Projetos;
