import React from 'react';
import { Route, Routes } from "react-router-dom";
import Calendario from "../Calendar/calendario";
import Administracion from '../administracion/administracion';
import EventDetails from '../Calendar/eventDetails';
import AdminEmployees from '../Admin/adminEmployees';

import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import 'moment/locale/es';


function Contenido(){

    const localizer = momentLocalizer(moment)
    return(<div>
        <Routes>
            <Route path="minegocio" element={<div>Mi negocio</div>} />
            <Route path="administracion" element={<Administracion />} />
            <Route path="empleados" element={<AdminEmployees/>} />
            <Route path="calendario" element={<Calendario localizer={localizer}/>} />
            <Route path="calendario/cita/:eventId" element={<EventDetails />} />
        </Routes>
    </div>);
}

export default Contenido;