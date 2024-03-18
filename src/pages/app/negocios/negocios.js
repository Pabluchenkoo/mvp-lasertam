import { useEffect, useState } from "react";

function Negocios() {
  const [negocios, setNegocios] = useState([]);
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/isis3710-uniandes/ISIS3710_202410_S2_E06_Front/j.montenegro/src/pages/data/negocios.json?token=GHSAT0AAAAAACOPJUOEHGXGURYFU5NOMAHCZPYXYQQ"
    )
      .then((response) => response.json())
      .then((data) => setNegocios(data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);
  return (
    <div>
      {negocios.map((negocio) => (
        <div key={negocio.id}>
          <h2>{negocio.name}</h2>
          <p>{negocio.description}</p>
          <img src={negocio.image} alt={negocio.name} />
        </div>
      ))}
    </div>
  );
}
export default Negocios;