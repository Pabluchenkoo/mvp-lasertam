import React from "react";
import {Link} from "react-router-dom";

import "./acceso.css";
import {Button} from "react-bootstrap";


const Acceso = (props) => {

    if(props.type === "signup")
        return <>
            <h1>Sign Up</h1>
            
        </>
    else {
        return <>
            <h1>Log in</h1>
            <Button><Link className={"link"} to={"/app"}>Log In</Link></Button>
        </>
    }
};

export default Acceso;