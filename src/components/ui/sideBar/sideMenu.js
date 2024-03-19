import {
    BarChartOutlined,
    BookOutlined,
    CalendarOutlined,
    HeatMapOutlined,
    QuestionOutlined, SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './sideMenu.css';
const { Sider } = Layout;


function getItem(
    label,
    key,
    icon,
    children
) {
    return {
        label,
        key,
        icon,
        children
    }
}

function getMenuItem(path) {

    const titulos = [

        getItem('Mi negocio', 'miNegocio', <BookOutlined />,[
            getItem('Comentarios', 'comentarios'),
            getItem('Facturación', 'facturacion'),
            getItem('Empleados', 'empleados')],),
        getItem('Administración', 'administracion', <BarChartOutlined />),
        getItem('Calendario', 'calendario', <CalendarOutlined />),
        getItem('configuración', 'configuracion', <SettingOutlined />),
        getItem('PQRs', 'pqrs', <QuestionOutlined />),
    ];

    if (path.startsWith('/cliente')) {
        titulos.push(getItem('Explorar negocios ', 'negocios', <HeatMapOutlined />))
        return titulos.filter((item) => (item.key !== 'administracion') && (item.key !== 'configuracion') && (item.key !== 'miNegocio') )
    }

    return titulos
}


function SideMenu(){
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();


    return(<Sider style={{backgroundColor:'#DFDBD8'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{backgroundColor:'#DFDBD8', display:"flex"}} />
        <br/>
        {!collapsed && <h3>Book Your Business</h3>}
        <Menu onClick={({key}) =>{if(key !== "9") navigate(key)}}
              style={{backgroundColor:'#DFDBD8', color:'#282c34', fontWeight:'bold'}}
              defaultSelectedKeys={[window.location.pathname]}
              mode="inline"
              items={getMenuItem(useLocation().pathname)}
                />

    </Sider>)
}

export default SideMenu;
