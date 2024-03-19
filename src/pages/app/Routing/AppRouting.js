import React from 'react';
import {Route, Routes} from "react-router-dom";
import Calendario from "../Calendar/calendario";
import MiNegocioPage from '../miNegocio/MiNegocioPage';
import PQRsPage from '../PQRs/PQRsPage';
import ContainerExample from "../Facturacion/facturacion"
import AdminEmployees from '../Admin/adminEmployees'



function Contenido(){
    return(<div>
        <Routes>
            <Route path="dashboard" element={<div>Dashboard</div>} />
            <Route path="facturacion" element={<ContainerExample/>} />
            <Route path="minegocio" element={<div>Mi negocio</div>} />
            <Route path="empleados" element={<AdminEmployees/>} />
            <Route path="administracion" element={<div>Administración</div>} />
            <Route path="calendario" element={<Calendario/>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={<PQRsPage />} />
            <Route path="negocios" element={<div>Negocios</div>} />
            <Route path="comentarios" element={<MiNegocioPage />} />
        </Routes>
    </div>);
}

export default Contenido;