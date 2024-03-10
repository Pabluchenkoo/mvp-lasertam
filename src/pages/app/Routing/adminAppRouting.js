import React from 'react';
import { Route, Routes } from "react-router-dom";
import Facturacion from "../../website/Facturacion/facturacion";



function Contenido(){
    return(<div>
        <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="minegocio" element={<Facturacion></Facturacion>} />
            <Route path="administracion" element={<div>Administración</div>} />
            <Route path="calendario" element={<div>Calendario</div>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={<div>PQRs</div>} />
        </Routes>
    </div>);
}

export default Contenido;