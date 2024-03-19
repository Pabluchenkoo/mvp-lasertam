import {Route, Routes} from "react-router-dom";
import React from "react";
import Home from "../Home/home";
import Services from "../Services/services";
import Pricing from "../Pricing/pricing";
import WhyUs from "../WhyUs/whyUs";
import WorkWithUs from "../WorkWithUs/workWithUs";
import Acceso from "../Acceso/acceso";
import AdminApp from "../../app/adminApp";

function Rutas(){
    return(<div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path={"/services"} element={<Services/>}/>
            <Route path={"/pricing"} element={<Pricing/>}/>
            <Route path={"/whyUs"} element={<WhyUs/>}/>
            <Route path={"/workWithUs"} element={<WorkWithUs/>}/>
            <Route path={"/signUp"} element={<Acceso type={"signup"}/>}/>
            <Route path={"/logIn"} element={<Acceso type={"login"}/>}/>
            <Route path={"/administrador/*"} element={<AdminApp/>}/>
            <Route path={"/cliente/*"} element={<AdminApp/>}/>
        </Routes>
    </div>);
}

export default Rutas;