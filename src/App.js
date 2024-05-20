
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Barra from "./components/ui/navBarWebsite/barra";
import Rutas from "./pages/website/Routing/websiteRouting";
import { useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();

    const hideBarraAdmin = location.pathname.startsWith('/administrador');
    const hideBarraCliente = location.pathname.startsWith('/cliente');
    const hideBarraDetail = location.pathname.startsWith('/cita');
    return (
        <>
            <div className="App">
                {!hideBarraAdmin && !hideBarraCliente && !hideBarraDetail && (
                    <>
                        <br/>
                        {/*<Barra/>*/}LASERTAM MVP
                        <hr/>
                    </>
                )
                }
            </div>
            <div className="content">
                <Rutas/>
            </div>
        </>
    );
}

export default App;
