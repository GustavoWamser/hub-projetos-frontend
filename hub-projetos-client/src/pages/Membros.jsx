import Card from "../components/Card";

function Membros({ membros }) {
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
    </>
  );
}

export default Membros;