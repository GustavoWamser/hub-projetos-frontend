import Card from "../components/Card";
import Modal from "../components/Modal";

function Projetos({ projetos, empresas, modalAberto, setModalAberto }) {
  return (
    <>
      <div id="input-search">
        <input type="text" placeholder="Buscar por nome, empresa ou descrição..." />
        <select>
          <option>Todos os Status</option>
          <option>Concluído</option>
          <option>Em Andamento</option>
          <option>Planejamento</option>
          <option>Atrasado</option>
        </select>
        <select>
          <option>Empresa Parceira</option>
        </select>
      </div>

      <div id="cards">
        {projetos.map(projeto => (
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
          <input type="text" placeholder="Digite o Nome" />

          <label>Empresa Parceira:</label>
          <select>
            <option>Escolha</option>
            {empresas.map(e => (
              <option key={e.id} value={e.id}>{e.nome}</option>
            ))}
          </select>

          <label>Descrição do Projeto:</label>
          <textarea placeholder="Digite a Descrição do Projeto..." />

          <label>Prazo do Projeto:</label>
          <input type="date" />

          <label>Membros do Projeto:</label>
          <select>
            <option>Escolha os Membros</option>
          </select>

          <div id="modal-footer">
            <button id="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
            <button id="btn-salvar">Criar Projeto</button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default Projetos;