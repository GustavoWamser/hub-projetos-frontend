import Modal from "../../components/Modal";

export default function ModalMembro({ membroSelecionado, fecharModal, handleCriarMembro, handleEditarMembro, handleApagarMembro, nome, setNome, sigla, setSigla, email, setEmail, cargo, setCargo, curso, setCurso, setFoto }) {
  return (
    <Modal titulo={membroSelecionado ? "Editar Membro" : "Novo Membro"} onClose={fecharModal}>
      <label>Nome:</label>
      <input type="text" value={nome} placeholder="Digite o Nome" onChange={e => setNome(e.target.value)} />

      <label>Sigla:</label>
      <input type="text" value={sigla} placeholder="Ex: GWX" onChange={e => setSigla(e.target.value)} />

      <label>Email:</label>
      <input type="email" value={email} placeholder="Digite o Email" onChange={e => setEmail(e.target.value)} />

      <label>Cargo:</label>
      <select value={cargo} onChange={e => setCargo(e.target.value)}>
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
      <select value={curso} onChange={e => setCurso(e.target.value)}>
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
        {membroSelecionado && (
          <button id="btn-apagar" onClick={handleApagarMembro}>Apagar</button>
        )}
        <button id="btn-cancelar" onClick={fecharModal}>Cancelar</button>
        <button id="btn-salvar" onClick={membroSelecionado ? handleEditarMembro : handleCriarMembro}>
          {membroSelecionado ? "Salvar" : "Criar Membro"}
        </button>
      </div>
    </Modal>
  );
}