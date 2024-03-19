import React from 'react';
import {Route, Routes} from "react-router-dom";
import Calendario from "../Calendar/calendario";
import ContainerExample from "../Facturacion/facturacion"


function Contenido(){
    return(<div>
        <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="facturacion" element={<ContainerExample/>} />
            <Route path="administracion" element={<div>Administración</div>} />
            <Route path="calendario" element={<Calendario/>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={<div>PQRs</div>} />
        </Routes>
    </div>);
}

export default Contenido;