import {
    BarChartOutlined,
    BookOutlined,
    CalendarOutlined,
    QuestionOutlined, SettingOutlined,
    HeatMapOutlined
} from "@ant-design/icons";
import React, {useState} from "react";
import {useNavigate, useLocation} from "react-router-dom";
import {Layout, Menu} from "antd";
import './sideMenu.css';
import { FormattedMessage } from "react-intl";

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

        getItem(<FormattedMessage id="side.minegocio" />, 'miNegocio', <BookOutlined />,[
            getItem(<FormattedMessage id="side.empleados" />, 'empleados')],),
        getItem(<FormattedMessage id="side.calendario" />, 'calendario', <CalendarOutlined />),
    ];

    if (path.startsWith('/cliente')) {
        // titulos.push(getItem(<FormattedMessage id="side.explorar" />, 'negocios', <HeatMapOutlined />))
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
        {!collapsed && <h3>LASERTAM RESERVAS</h3>}
        <Menu onClick={({key}) =>{if(key !== "9") navigate(key)}}
              style={{backgroundColor:'#DFDBD8', color:'#282c34', fontWeight:'bold'}}
              defaultSelectedKeys={[window.location.pathname]}
              mode="inline"
              items={getMenuItem(useLocation().pathname)}
        />

    </Sider>)
}

export default SideMenu;