import React from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { validarCorreo } from "./validadorCorreo";
import { validarLogin } from "./validarLogin";
import "./acceso.css";
import {Button} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
var existe = false;
const Acceso = (props) => {
    const navigate = useNavigate();
    const { register, handleSubmit,formState:{errors}, setValue } = useForm({ defaultValues: { email: "pepito@gmail.com", password:"1234" , first_name:"Pepito", last_name:"Perez" } });
    const onSubmit = async (data) => {
        if (props.type === "signup") {
            console.log(data);
        } else {
            console.log(data);
            // Validar que el correo y el password sean correctos y que existan en la base de datos (MOCK_DATA.json)
            existe = await validarLogin(data.email, data.password);
            console.log(existe);
            if (existe) {
                navigate('/app'); // Redirigir a la ruta '/app' si existe es verdadero
            }
        }
    }

    const formStyle = {
        width: '300px', // Set the width of the form if needed
        margin: 'auto', // Center the form horizontally
        textAlign: 'center' // Center the form content
    };
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const [showPassword, setShowPassword] = React.useState(false);

    // Hacer que si la variable "existe" es true  entonces redirrecione al usuario a /app

    if (props.type === "signup") {
        return (
            <>
                <div style={formStyle}>
                    <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="email" {...register('email', { required: true, validate: validarCorreo })} />
                            {errors.email && errors.email.type === "required" && <p>Este campo es requerido</p>}
                            {errors.email && errors.email.type === "validate" && <p>Este correo ya existe</p>}
                        </FloatingLabel>
            

                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" {...register('password',{required:true})}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="FirstName" label="First Name" className="mb-3">
                            <Form.Control type="text" placeholder="First Name"  {...register('first_name')}/>
                        </FloatingLabel>
                        <FloatingLabel controlId="LastName" label="Last Name">
                            <Form.Control type="text" placeholder="Last Name"  {...register('last_name')}/>
                        </FloatingLabel>
                        <Button type="submit">Sign Up</Button>



                    </form>
                </div>
            </>
        );
    } else {
        // Hacer que si la variable "existe" es true  entonces redirrecione al usuario a /app
        return (
            <>
                <div style={formStyle}>
                    <h1>Login</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="email" {...register('email', { required: true })} />
                            {errors.email && errors.email.type === "required" && <p>Este campo es requerido</p>}
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type={showPassword ? "text" : "password"} placeholder="Password" {...register('password', { required: true })} />
                        </FloatingLabel>
                        <Button onClick={togglePasswordVisibility}>Show/Hide Password</Button>
                        <Button type="submit">Login</Button>
                    </form>
                </div>
            </>
        );
    }
};

export default Acceso;