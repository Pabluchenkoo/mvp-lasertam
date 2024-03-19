import React, { useEffect, useState } from "react";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import "./acceso.css";
import { Button, Card } from "react-bootstrap"; 
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import RegistroForm from "./RegistroForm";
import { saveAs } from 'file-saver';
import { FormattedMessage} from 'react-intl';

const Acceso = (props) => {
    const [selectedRole, setSelectedRole] = useState("");
    const [registroExitoso, setRegistroExitoso] = useState(false);
    const [existeUsuario, setExisteUsuario] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const guardarUsuario = async (data) => {
        try {
            let usuarios = JSON.parse(localStorage.getItem('Usuarios')) || [];
            
            const nuevoUsuario = { ...data };
            if (selectedRole === "usuario") {
                nuevoUsuario.company = null;
                nuevoUsuario.cedula = null;
            }

            usuarios.push(nuevoUsuario);

            localStorage.setItem('Usuarios', JSON.stringify(usuarios));

            setRegistroExitoso(true);
        } catch (error) {
            console.error('Error al guardar el usuario:', error);
        }
    };

    const validarLogin = async (correo, password) => {
        const url = 'https://raw.githubusercontent.com/JuanSe2003/facturas/main/usuarios.json';
        const response = await fetch(url);
        const data = await response.json();
        const usuario = data.find(user => user.email === correo && user.password === password);
        return usuario;
    };

    const handleRoleSelect = (role) => {
        setSelectedRole(role);
    };

    const handleFormSubmit = async (data) => {
        if (props.type === "signup") {
            setRegistroExitoso(true);
            await guardarUsuario(data);
            navigate(selectedRole === "administrador" ? '/administrador' : '/cliente');
        } else {
            const usuario = await validarLogin(data.email, data.password);
            if (usuario) {
                setExisteUsuario(true);
                navigate(usuario.role === "administrador" ? '/administrador' : '/cliente');
            } else {
                setExisteUsuario(false);
            }
        }
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ width: '300px', margin: 'auto', textAlign: 'center' }}>
            <h1>{props.type === "signup" ? <FormattedMessage id="registro.titulo_registro" /> : <FormattedMessage id="registro.titulo_ingreso" />}</h1>
            <br />
            {props.type === "signup" && (
                <>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                        <div style={{ width: '25rem', marginRight: '10px' }}>
                            <Card onClick={() => handleRoleSelect("administrador")}>
                                <Card.Img variant="top" src="https://fastly.picsum.photos/id/366/4000/3000.jpg?hmac=zphhHOH9ofToN2jNHd8z-nc98NrBd8y2okWXEXetLDg" style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title><FormattedMessage id="registro.rol_administrador" /></Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                        <div style={{ width: '25rem' }}>
                            <Card onClick={() => handleRoleSelect("usuario")}>
                                <Card.Img variant="top" src="https://fastly.picsum.photos/id/550/1536/2304.jpg?hmac=mnJfrEvgr9KN09x3DUaGFzLk6DiN1fmi4H5LjHgyIzk" style={{ height: '200px', objectFit: 'cover' }} />
                                <Card.Body>
                                    <Card.Title><FormattedMessage id="registro.rol_usuario" /></Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>

                    <RegistroForm role={selectedRole} onSubmit={handleFormSubmit} />
                </>
            )}
            {props.type !== "signup" && (
                <Form onSubmit={handleSubmit(handleFormSubmit)} className="mb-3"> 
                    <FloatingLabel controlId="floatingInput" label={<FormattedMessage id="registro.label_correo" />}>
                        <Form.Control type="email" placeholder={<FormattedMessage id="registro.label_correo" />} {...register('email', { required: true })} />
                        {errors.email && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label={<FormattedMessage id="registro.label_contrasena" />} className="mt-3">
                        <Form.Control 
                            type={showPassword ? "text" : "password"}
                            placeholder={<FormattedMessage id="registro.label_contrasena" />} 
                            {...register('password', { required: true })}
                        />
                        {errors.password && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>
                    <Button block={showPassword ? "true" : "false"} onClick={toggleShowPassword} variant="secondary" className="mt-3 me-2">
                        {showPassword ? <FormattedMessage id="registro.boton_ocultar" /> : <FormattedMessage id="registro.boton_mostrar" />}
                    </Button>
                    <Button type="submit" variant="primary" className="mt-3">{<FormattedMessage id="registro.boton_ingresar" />}</Button>
                    {existeUsuario === false && <p style={{ color: 'red' }}></p>}
                </Form>
            )}
        </div>
    );
};

export default Acceso;
