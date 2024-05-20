import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Row, Col, Button } from 'react-bootstrap';

const Home = () => {


    const navigate = useNavigate();

    const handleAdminClick = () => {
        navigate('/administrador/calendario');
    };

    const handleClientClick = () => {
        navigate('/cliente/calendario');
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-row items-center justify-center space-x-4 w-1/2 h-1/2 px-10">
                <button
                    onClick={handleAdminClick}
                    className="bg-blue-500 text-white flex-1 h-1/2 p-8 rounded hover:bg-blue-700 text-2xl"
                >
                    Llevame a la consola de administrador
                </button>
                {/*<button*/}
                {/*    onClick={handleClientClick}*/}
                {/*    className="bg-green-500 text-white flex-1 h-1/2 p-8 rounded hover:bg-green-700 text-2xl"*/}
                {/*>*/}
                {/*    Client*/}
                {/*</button>*/}
            </div>
        </div>
    );
}

export default Home;
