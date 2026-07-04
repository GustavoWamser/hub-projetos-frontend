import { useState, useEffect } from "react";
import axios from "axios";
import Card from "../../components/Card";
import ModalProjeto from "./ModalProjeto";
import { useProjetos } from "./useProjetos";

function Projetos({ modalAberto, setModalAberto }) {
  const [projetos, setProjetos] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [membros, setMembros] = useState([]);

  const [filtroBusca, setFiltroBusca] = useState("");
  const [filtroSituacao, setFiltroSituacao] = useState("");
  const [filtroEmpresa, setFiltroEmpresa] = useState("");

  function carregarDados() {
  Promise.all([
    axios.get("http://127.0.0.1:8000/api/projetos/"),
    axios.get("http://127.0.0.1:8000/api/empresas/"),
    axios.get("http://127.0.0.1:8000/api/membros/"),
  ]).then(([resProjetos, resEmpresas, resMembros]) => {
    const projetos = resProjetos.data;

    Promise.all(
      projetos.map(p =>
        axios.get(`http://127.0.0.1:8000/api/projetos/${p.id}/num_membros/`)
          .then(res => ({ ...p, num_membros: res.data.num_members }))
      )
    ).then(projetosComMembros => {
      setProjetos(projetosComMembros);
      setEmpresas(resEmpresas.data);
      setMembros(resMembros.data);
    });
  });
}

  useEffect(() => {
    carregarDados();
  }, []);

  const {
    nome, setNome,
    descricao, setDescricao,
    empresa, setEmpresa,
    prazo, setPrazo,
    situacao, setSituacao,
    membrosSelecionados, setMembrosSelecionados,
    projetoSelecionado, setProjetoSelecionado,
    fecharModal,
    handleCriarProjeto,
    handleEditarProjeto,
    handleApagarProjeto,
  } = useProjetos(setModalAberto, carregarDados);

  const opcoesMembros = membros.map(m => ({ value: m.id, label: m.nome }));

  const normalizar = (str) =>
    str.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const projetosFiltrados = projetos
    .slice()
    .sort((a, b) => a.nome.localeCompare(b.nome))
    .filter(projeto => filtroBusca === "" || normalizar(projeto.nome).includes(normalizar(filtroBusca)))
    .filter(projeto => filtroSituacao === "" || projeto.situacao === filtroSituacao)
    .filter(projeto => filtroEmpresa === "" || projeto.empresa === parseInt(filtroEmpresa));

  return (
    <>
      <div id="input-search">
        <input type="text" placeholder="Buscar por nome..." onChange={e => setFiltroBusca(e.target.value)} />
        <select className="filter-select" onChange={e => setFiltroSituacao(e.target.value)}>
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
            dados={{ ...projeto, empresaNome: empresas.find(e => e.id === projeto.empresa)?.nome }}
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
        <ModalProjeto
          projetoSelecionado={projetoSelecionado}
          fecharModal={fecharModal}
          handleCriarProjeto={handleCriarProjeto}
          handleEditarProjeto={handleEditarProjeto}
          handleApagarProjeto={handleApagarProjeto}
          nome={nome} setNome={setNome}
          descricao={descricao} setDescricao={setDescricao}
          empresa={empresa} setEmpresa={setEmpresa}
          prazo={prazo} setPrazo={setPrazo}
          situacao={situacao} setSituacao={setSituacao}
          membrosSelecionados={membrosSelecionados} setMembrosSelecionados={setMembrosSelecionados}
          empresas={empresas}
          opcoesMembros={opcoesMembros}
        />
      )}
    </>
  );
}

export default Projetos;