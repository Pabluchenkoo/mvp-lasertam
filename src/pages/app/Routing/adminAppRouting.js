import React from 'react';
import {Route, Routes} from "react-router-dom";
import Calendario from "../Calendar/calendario";
import MiNegocioPage from '../miNegocio/MiNegocioPage';
import PQRsPage from '../PQRs/PQRsPage';


function Contenido() {
    return (
      <div>
        <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="minegocio" element={MiNegocioPage} />
            <Route path="administracion" element={<div>Administración</div>} />
            <Route path="calendario" element={<Calendario/>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={PQRsPage} />
        </Routes>
      </div>
    );
  }
  
  export default Contenido;