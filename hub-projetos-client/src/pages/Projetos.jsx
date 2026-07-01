import Card from "../components/Card";

function Projetos({ projetos, empresas }) {
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
    </>
  );
}

export default Projetos;