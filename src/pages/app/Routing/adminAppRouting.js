import React from 'react';
<<<<<<< HEAD:src/pages/app/Routing/AppRouting.js
import { Route, Routes } from "react-router-dom";
import Calendario from "../Calendar/calendario";
import Administracion from '../administracion/administracion';
import Negocios from '../negocios/negocios';
import MiNegocioPage from '../miNegocio/MiNegocioPage';
import PQRsPage from '../PQRs/PQRsPage';
import Facturacion from '../Facturacion/facturacion';
import AdminEmployees from '../Admin/adminEmployees'

import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import 'moment/locale/es';
=======
import {Route, Routes} from "react-router-dom";
>>>>>>> 164ff60b6c72de607101578dab65d25ed2c10734:src/pages/app/Routing/adminAppRouting.js


function Contenido(){

    const localizer = momentLocalizer(moment)
    return(<div>
        <Routes>
            <Route path="facturacion" element={<Facturacion/>} />
            <Route path="minegocio" element={<div>Mi negocio</div>} />
<<<<<<< HEAD:src/pages/app/Routing/AppRouting.js
            <Route path="administracion" element={<Administracion />} />
            <Route path="empleados" element={<AdminEmployees/>} />
            <Route path="calendario" element={<Calendario localizer={localizer}/>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="negocios" element={<Negocios />} />
            <Route path="pqrs" element={<PQRsPage />} />
            <Route path="comentarios" element={<MiNegocioPage />} />

=======
            <Route path="administracion" element={<div>Administración</div>} />
            <Route path="calendario" element={<div>Calendario</div>} />
            <Route path="mail" element={<div>Mail</div>} />
            <Route path="conversaciones" element={<div>Conversaciones</div>} />
            <Route path="configuracion" element={<div>Configuración</div>} />
            <Route path="pqrs" element={<div>PQRs</div>} />
>>>>>>> 164ff60b6c72de607101578dab65d25ed2c10734:src/pages/app/Routing/adminAppRouting.js
        </Routes>
    </div>);
}

export default Contenido;