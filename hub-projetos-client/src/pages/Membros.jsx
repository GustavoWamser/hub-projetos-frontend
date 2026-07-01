import Card from "../components/Card";
import Modal from "../components/Modal";

function Membros({ membros, modalAberto, setModalAberto }) {
  return (
    <>
      <div id="input-search">
        <input type="text" placeholder="Buscar por nome, sigla ou cargo..." />
      </div>

      <div id="cards">
        {membros.map(membro => (
          <Card key={membro.id} tipo="membro" dados={membro} />
        ))}
      </div>

      {modalAberto && (
        <Modal titulo="Novo Membro" onClose={() => setModalAberto(false)}>
          <label>Nome do Membro:</label>
          <input type="text" placeholder="Digite o Nome" />

          <label>Cargo:</label>
          <input type="text" placeholder="Digite o Cargo" />

          <label>E-mail:</label>
          <input type="text" placeholder="Digite o E-mail" />

          <div id="modal-footer">
            <button id="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            <button id="btn-salvar">Adicionar Membro</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Membros;