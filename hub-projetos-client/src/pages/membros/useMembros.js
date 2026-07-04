import { useState } from "react";
import axios from "axios";

export function useMembros(setModalAberto, carregarMembros) {
  const [nome, setNome] = useState("");
  const [cargo, setCargo] = useState("");
  const [sigla, setSigla] = useState("");
  const [email, setEmail] = useState("");
  const [curso, setCurso] = useState("");
  const [foto, setFoto] = useState(null);
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  function fecharModal() {
    setModalAberto(false);
    setMembroSelecionado(null);
    setNome("");
    setCargo("");
    setSigla("");
    setEmail("");
    setCurso("");
    setFoto(null);
  }

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
      fecharModal();
      carregarMembros();
    });
  }

  function handleEditarMembro() {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("cargo", cargo);
    formData.append("sigla", sigla);
    formData.append("email", email);
    formData.append("curso", curso);
    if (foto) formData.append("foto", foto);

    axios.patch(`http://127.0.0.1:8000/api/membros/${membroSelecionado.id}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    }).then(() => {
      fecharModal();
      carregarMembros();
    });
  }

  function handleApagarMembro() {
    if (!confirm("Tem certeza que deseja apagar este membro?")) return;
    axios.delete(`http://127.0.0.1:8000/api/membros/${membroSelecionado.id}/`)
      .then(() => {
        fecharModal();
        carregarMembros();
      });
  }

  return {
    nome, setNome,
    cargo, setCargo,
    sigla, setSigla,
    email, setEmail,
    curso, setCurso,
    foto, setFoto,
    membroSelecionado, setMembroSelecionado,
    fecharModal,
    handleCriarMembro,
    handleEditarMembro,
    handleApagarMembro,
  };
}