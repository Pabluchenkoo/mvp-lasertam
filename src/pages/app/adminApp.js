import React from 'react';

import {Layout} from 'antd';
import Contenido from "./Routing/AppRouting";
import SideMenu from "../../components/ui/sideBar/sideMenu";
import NavBarApp from "../../components/ui/navBarApp/navBarApp";
const { Content,Header } = Layout;



function AdminApp() {

    return (
        <>
            <div className={"App"}>
                <Layout style={{ minHeight: '100vh', backgroundColor:'#FFFFFF'}}>

                    <SideMenu />

                    <Layout style={{backgroundColor:'#FFFFFF'}}>
                        <Header style={{ background: '#fff', padding: 0 }} >

                            <NavBarApp/>
                            <hr/>
                        </Header>

                        <Content style={{ margin: '0 30px'}}>
                            <Contenido/>
                        </Content>
                    </Layout>
                </Layout>
            </div>

        </>
    );
}





export default AdminApp;