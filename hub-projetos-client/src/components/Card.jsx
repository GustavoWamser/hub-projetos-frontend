import "./Card.css";

function Card({ tipo, dados, onClick }) {
  const textoLimpo = dados.situacao
    ? dados.situacao
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\s+/g, "-"): "";

  if (tipo === "projeto") {
    return (
      <div className="card" onClick={onClick}>
        <div className="card-content">
          <div className="card-header">
            <span className={`status ${textoLimpo}`}>
              {dados.situacao}
            </span>
          </div>

          <h3>{dados.nome}</h3>
          <span className="empresa-nome">{dados.empresaNome}</span>

          <p className="descricao-p">{dados.descricao}</p>
        </div>

        <div className="card-footer">
          <div className="info-item">
            <img src="/calendar.png" alt="calendar" />
            <span>{dados.prazo}</span>
          </div>

          <div className="info-item">
            <img src="/members.png" alt="members" />
            <span>{dados.num_membros} membros</span>
          </div>
        </div>
      </div>
    );
  }

  if (tipo === "membro") {
    return (
      <div className="card" onClick={onClick}>
        <div className="card-content">
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
              <img src="/universidade.png" alt="Universidade" />
              <span>{dados.curso}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

export default Card;