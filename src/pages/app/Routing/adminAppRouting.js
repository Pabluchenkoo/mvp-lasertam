import React from 'react';
import {Route, Routes} from "react-router-dom";
import PQRsPage from "../PQRsPage";


function Contenido() {
    return (
      <div>
        <Routes>
          <Route path="dashboard" element={<div>Dashboard</div>} />
          <Route path="minegocio" element={<div>Mi negocio</div>} />
          <Route path="administracion" element={<div>Administración</div>} />
          <Route path="calendario" element={<div>Calendario</div>} />
          <Route path="mail" element={<div>Mail</div>} />
          <Route path="conversaciones" element={<div>Conversaciones</div>} />
          <Route path="configuracion" element={<div>Configuración</div>} />
          <Route path="pqrs" element={<PQRsPage />} />
        </Routes>
      </div>
    );
  }
  
  export default Contenido;