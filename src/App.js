import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
import Clima from "./components/Clima";
function App() {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: "",
    pais: "",
  });

  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const { ciudad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if (consultar) {
        const appId = "53fcb144cc1c53ab21edaae7c6ec7fc4";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        const respuesta = await (await fetch(url)).json();
        guardarResultado(respuesta);
        guardarConsultar(false);
      }
    };

    consultarAPI();
  }, [consultar]);
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
            <div className="col m6 s12">
              <Clima resultado={resultado} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
