import React from 'react';
import { Route, Routes } from "react-router-dom";
import Administracion from '../administracion/administracion';


function Contenido(){
    return(<div>
        <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="minegocio" element={<div>Mi negocio</div>} />
            <Route path="administracion" element={<Administracion />} />
            <Route path="calendario" element={<div>Calendario</div>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={<div>PQRs</div>} />
        </Routes>
    </div>);
}

export default Contenido;