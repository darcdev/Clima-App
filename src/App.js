import React from "react";
import Formulario from "./components/Formulario";
import Header from "./components/Header";
function App() {
  return (
    <>
      <Header titulo="Clima App" />

      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario />
            </div>
            <div className="col m6 s12">2</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
