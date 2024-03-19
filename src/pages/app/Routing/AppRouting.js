import React from 'react';
import { Route, Routes } from "react-router-dom";
import Calendario from "../Calendar/calendario";
import Administracion from '../administracion/administracion';
import Negocios from '../negocios/negocios';
import MiNegocioPage from '../miNegocio/MiNegocioPage';
import PQRsPage from '../PQRs/PQRsPage';
import Facturacion from '../Facturacion/facturacion';
import AdminEmployees from '../Admin/adminEmployees'



function Contenido(){
    return(<div>
        <Routes>
            <Route path="facturacion" element={<Facturacion/>} />
            <Route path="minegocio" element={<div>Mi negocio</div>} />
            <Route path="administracion" element={<Administracion />} />
            <Route path="empleados" element={<AdminEmployees/>} />
            <Route path="calendario" element={<Calendario/>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="negocios" element={<Negocios />} />
            <Route path="pqrs" element={<PQRsPage />} />
            <Route path="comentarios" element={<MiNegocioPage />} />

        </Routes>
    </div>);
}

export default Contenido;