import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Clima from "./components/Clima";
import Error from "./components/Error";

function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [error, guardarError] = useState(false);

  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "53fcb144cc1c53ab21edaae7c6ec7fc4";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await (await fetch(url)).json();
        guardarResultado(respuesta);
        guardarConsultar(false);

        //detectar resultados correctos

        if (respuesta.cod === "404") {
          guardarError(true);
        } else {
          guardarError(false);
        }
      }
    };
    consultarAPI();
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="no hay resultados" />;
  } else {
    componente = <Clima resultado={resultado} />;
  }
  return (
    <>
      <Header titulo="Clima App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">{componente}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
