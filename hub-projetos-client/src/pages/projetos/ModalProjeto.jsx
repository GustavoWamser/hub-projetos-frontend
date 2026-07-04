import Select from "react-select";
import Modal from "../../components/Modal";
import "../projetos/Select.css";

export default function ModalProjeto({ projetoSelecionado, fecharModal, handleCriarProjeto, handleEditarProjeto, handleApagarProjeto, nome, setNome, descricao, setDescricao, empresa, setEmpresa, prazo, setPrazo, situacao, setSituacao, membrosSelecionados, setMembrosSelecionados, empresas, opcoesMembros }) {
  return (
    <Modal titulo={projetoSelecionado ? "Editar Projeto" : "Novo Projeto"} onClose={fecharModal}>
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
        onChange={(opcoes) => setMembrosSelecionados((opcoes || []).map(op => op.value))}
      />

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
  );
}