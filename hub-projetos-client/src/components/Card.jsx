import "./Card.css";

function Card({ tipo, dados, onEditar }) {
  if (tipo === "projeto") {
    return (
      <div className="card">
        <div className="card-header">
          <span className={`status ${dados.situacao.toLowerCase()}`}>{dados.situacao}</span>
          <div className="card-header-right">
            <span className="empresa-nome">{dados.empresaNome}</span>
          </div>
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
          <div className="card-header-left">
            <img src={dados.foto} alt={dados.nome} />
            <div>
              <h3>{dados.nome}</h3>
              <p>{dados.cargo}</p>
            </div>
          </div>
        </div>
        <span className="sigla">{dados.sigla}</span>
        <div className="member-informations">
          <div className="info-item">
            <img src="/e-mail.png" alt="E-mail" />
            <span>{dados.email}</span>
          </div>
          <div className="info-item">
            <img src="/universidade.png" alt="University" />
            <span>{dados.curso}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;