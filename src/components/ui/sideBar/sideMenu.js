import {
    BarChartOutlined,
    BookOutlined,
    CalendarOutlined,
    MailOutlined,
    MessageOutlined,
    PieChartOutlined, QuestionOutlined, SettingOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const titulos = [
    getItem('Dashboard', 'dashboard', <PieChartOutlined />),
    getItem('Mi negocio', 'miNegocio', <BookOutlined />),
    getItem('Administración', 'administracion', <BarChartOutlined />),
    getItem('Calendario', 'calendario', <CalendarOutlined />),
    getItem('Mail', 'mail', <MailOutlined />),
    getItem('Conversaciones', 'conversaciones', <MessageOutlined />),
    getItem('configuración', 'configuracion', <SettingOutlined />),
    getItem('PQRs', 'pqrs', <QuestionOutlined />),
];

function SideMenu(){
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    return(<Sider style={{backgroundColor:'#DFDBD8'}} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{backgroundColor:'#DFDBD8', display:"flex"}} />
        <br/>
        {!collapsed && <h3>Sketch Your Business</h3>}
        <Menu onClick={({key}) =>{if(key !== "9") navigate(key)}}
              style={{backgroundColor:'#DFDBD8', color:'#282c34', fontWeight:'bold'}}
              defaultSelectedKeys={[window.location.pathname]}
              mode="inline"
              items={titulos}
              //hover a certain color
              onHover={({key}) => {
                    if(key !== "9") {
                        document.getElementById(key).style.backgroundColor = '#DFDBD8';
                        document.getElementById(key).style.color = '#DFDBD8';
                    }
              }}
              // onSelect={({key}) => {
              //       if(key !== "9") {
              //           document.getElementById(key).style.backgroundColor = '#DFDBD8';
              //           document.getElementById(key).style.color = '#DFDBD8';
              //       }}
              // }
                />

    </Sider>)
}

export default SideMenu;
