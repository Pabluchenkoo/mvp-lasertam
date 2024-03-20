import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Barra from "./components/ui/navBarWebsite/barra";
import Rutas from "./pages/website/Routing/websiteRouting";
import { useLocation } from 'react-router-dom';

function App() {
    const location = useLocation();

    const hideBarra = location.pathname.startsWith('/app');

  return (
      <>
          <div className="App">
              {!hideBarra && (
                  <>
                      <br/>
                      <Barra/>
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
