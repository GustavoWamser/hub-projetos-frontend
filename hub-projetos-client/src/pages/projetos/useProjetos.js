import { useState } from "react";
import axios from "axios";

export function useProjetos(setModalAberto, carregarDados) {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [prazo, setPrazo] = useState("");
  const [situacao, setSituacao] = useState("");
  const [membrosSelecionados, setMembrosSelecionados] = useState([]);
  const [projetoSelecionado, setProjetoSelecionado] = useState(null);

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
        carregarDados();
      });
  }

  function handleEditarProjeto() {
    axios.patch(`http://127.0.0.1:8000/api/projetos/${projetoSelecionado.id}/`, { nome, descricao, empresa, prazo, situacao })
      .then(() => {
        const apagar = projetoSelecionado.alocacoes.map(alocacao =>
          axios.delete(`http://127.0.0.1:8000/api/alocacoes/${alocacao.id}/`)
        );
        return Promise.all(apagar);
      })
      .then(() => {
        const criar = membrosSelecionados.map(membro =>
          axios.post("http://127.0.0.1:8000/api/alocacoes/", { membro, projeto: projetoSelecionado.id })
        );
        return Promise.all(criar);
      })
      .then(() => {
        fecharModal();
        carregarDados();
      });
  }

  function handleApagarProjeto() {
    if (!confirm("Tem certeza que deseja apagar este projeto?")) return;
    axios.delete(`http://127.0.0.1:8000/api/projetos/${projetoSelecionado.id}/`)
      .then(() => {
        fecharModal();
        carregarDados();
      });
  }

  return {
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
  };
}