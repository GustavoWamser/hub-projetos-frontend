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

  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

  const opcoesMembros = membros.map(m => ({
    value: m.id,
    label: m.nome
  }));

  const normalizar = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const projetosFiltrados = projetos
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .filter(projeto => filtroBusca === "" || normalizar(projeto.nome).includes(normalizar(filtroBusca)))
    .filter(projeto => filtroSituacao === "" || projeto.situacao === filtroSituacao)
    .filter(projeto => filtroEmpresa === "" || projeto.empresa === parseInt(filtroEmpresa));

  function fecharModal() {
    setModalAberto(false);
    setProjetoSelecionado(null);
    setNome("");
    setDescricao("");
    setEmpresa("");
    setPrazo("");
    setSituacao("");
    setMembrosSelecionados([]);
  }

  function handleCriarProjeto() {
    axios.post("http://127.0.0.1:8000/api/projetos/", { nome, descricao, empresa, prazo, situacao })
      .then(res => {
        const alocacoes = membrosSelecionados.map(membroId =>
          axios.post("http://127.0.0.1:8000/api/alocacoes/", { membro: membroId, projeto: res.data.id })
        );
        return Promise.all(alocacoes);
      })
      .then(() => {
        fecharModal();
        window.location.reload();
      });
  }

  function handleEditarProjeto() {
  axios.patch(
    `http://127.0.0.1:8000/api/projetos/${projetoSelecionado.id}/`,
    {
      nome,
      descricao,
      empresa,
      prazo,
      situacao
    }
  )
  .then(() => {

    const apagar = projetoSelecionado.alocacoes.map(alocacao =>
      axios.delete(
        `http://127.0.0.1:8000/api/alocacoes/${alocacao.id}/`
      )
    );

    return Promise.all(apagar);
  })
  .then(() => {

    const criar = membrosSelecionados.map(membro =>
      axios.post(
        "http://127.0.0.1:8000/api/alocacoes/",
        {
          membro,
          projeto: projetoSelecionado.id
        }
      )
    );

    return Promise.all(criar);
  })
  .then(() => {
    fecharModal();
    window.location.reload();
  });
}

  function handleApagarProjeto() {
  if (!confirm("Tem certeza que deseja apagar este projeto?")) return;
  axios.delete(`http://127.0.0.1:8000/api/projetos/${projetoSelecionado.id}/`)
    .then(() => {
      fecharModal();
      window.location.reload();
    });
}

  return (
    <>
      <div id="input-search">
        <input
          id="filter-search"
          type="text"
          placeholder="Buscar por nome..."
          onChange={e => setFiltroBusca(e.target.value)}
        />
        <select className="filter-select" onChange={e => setFiltroSituacao(e.target.value)}>
          <option value="">Todos os Status</option>
          <option value="Em andamento">Em andamento</option>
          <option value="Concluído">Concluído</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      <select className="filter-select" onChange={e => setFiltroEmpresa(e.target.value)}>
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
            onClick={() => {
              setProjetoSelecionado(projeto);
              setNome(projeto.nome);
              setDescricao(projeto.descricao);
              setEmpresa(projeto.empresa);
              setPrazo(projeto.prazo);
              setSituacao(projeto.situacao);
              setMembrosSelecionados(projeto.alocacoes.map(a => a.membro));
              setModalAberto(true);
            }}
          />
        ))}
      </div>

      {modalAberto && (
        <Modal
          titulo={projetoSelecionado ? "Editar Projeto" : "Novo Projeto"}
          onClose={fecharModal}
        >
          <label>Nome do Projeto:</label>
          <input type="text" value={nome} placeholder="Digite o Nome" onChange={e => setNome(e.target.value)} />

          <label>Empresa Parceira:</label>
          <select value={empresa} onChange={e => setEmpresa(e.target.value)}>
            <option value="">Escolha</option>
            {empresas.map(e => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>

          <label>Descrição do Projeto:</label>
          <textarea className="placeholder-font" value={descricao} placeholder="Digite a Descrição do Projeto..." onChange={e => setDescricao(e.target.value)} />

          <label>Prazo do Projeto:</label>
          <input className="placeholder-font" type="date" value={prazo} onChange={e => setPrazo(e.target.value)} />

          <label>Situação:</label>
          <select value={situacao} onChange={e => setSituacao(e.target.value)}>
            <option value="">Escolha</option>
            <option value="Em andamento">Em andamento</option>
            <option value="Concluído">Concluído</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <label>Membros do Projeto:</label>
          <Select
            className="select-member-container"
            classNamePrefix="select-member"
            isMulti
            options={opcoesMembros}
            placeholder="Selecione os membros..."
            value={opcoesMembros.filter(op => membrosSelecionados.includes(op.value))}
            onChange={(opcoes) => setMembrosSelecionados((opcoes || []).map(op => op.value))}/>

            <div id="modal-footer">
            {projetoSelecionado && (
              <button id="btn-apagar" onClick={handleApagarProjeto}>Apagar</button>
            )}
            <button id="btn-cancelar" onClick={fecharModal}>Cancelar</button>
            <button id="btn-salvar" onClick={projetoSelecionado ? handleEditarProjeto : handleCriarProjeto}>
              {projetoSelecionado ? "Salvar" : "Criar Projeto"}
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Projetos;