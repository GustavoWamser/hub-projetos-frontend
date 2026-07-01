import "./Card.css";

function Card({ tipo, dados }) {
  if (tipo === "projeto") {
    return (
      <div className="card">
        <div className="card-header">
          <span className={`status ${dados.situacao.toLowerCase()}`}>{dados.situacao}</span>
          <span className="empresa-nome">{dados.empresaNome}</span>
        </div>
        <h3>{dados.nome}</h3>
        <p>{dados.descricao}</p>
        <div className="card-footer">
          <span>📅 {dados.prazo}</span>
          <span>👥 {dados.alocacoes.length} membros</span>
        </div>
      </div>
    );
  }

  if (tipo === "membro") {
    return (
      <div className="card">
        <div className="card-header">
          <img src={dados.foto} alt={dados.nome} />
          <div>
            <h3>{dados.nome}</h3>
            <p>{dados.cargo}</p>
          </div>
        </div>
        <span className="sigla">{dados.sigla}</span>
      </div>
    );
  }
}

export default Card;