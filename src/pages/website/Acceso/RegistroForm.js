import React from "react";
import { useForm } from "react-hook-form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";
import { FormattedMessage} from 'react-intl';

const RegistroForm = ({ role, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel controlId="floatingInput" label={<FormattedMessage id="registro.label_correo" />} className="mb-3">
                <Form.Control type="email" placeholder={<FormattedMessage id="registro.label_correo" />} {...register('email', { required: true })} />
                {errors.email && <p><FormattedMessage id="registro.mensaje_error" /></p>}
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label={<FormattedMessage id="registro.label_contrasena" />} className="mb-3">
                <Form.Control type="password" placeholder={<FormattedMessage id="registro.label_contrasena" />} {...register('password', { required: true })} />
                {errors.password && <p><FormattedMessage id="registro.mensaje_error" /></p>}
            </FloatingLabel>

            <FloatingLabel controlId="FirstName" label={<FormattedMessage id="registro.label_nombre" />} className="mb-3">
                <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_nombre" />} {...register('first_name', { required: true })} />
                {errors.first_name && <p><FormattedMessage id="registro.mensaje_error" /></p>}
            </FloatingLabel>

            <FloatingLabel controlId="LastName" label={<FormattedMessage id="registro.label_apellido" />} className="mb-3">
                <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_apellido" />} {...register('last_name', { required: true })} />
                {errors.last_name && <p><FormattedMessage id="registro.mensaje_error" /></p>}
            </FloatingLabel>

            {role === 'administrador' && (
                <>
                    <FloatingLabel controlId="CompanyName" label={<FormattedMessage id="registro.label_empresa" />} className="mb-3">
                        <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_empresa" />} {...register('company_name', { required: true })} />
                        {errors.company_name && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Cedula" label={<FormattedMessage id="registro.label_cedula" />} className="mb-3">
                        <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_cedula" />} {...register('cedula', { required: true })} />
                        {errors.cedula && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Description" label={<FormattedMessage id="registro.label_descripcion" />} className="mb-3">
                        <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_descripcion" />} {...register('description', { required: true })} />
                        {errors.description && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Location" label={<FormattedMessage id="registro.label_ubicacion" />} className="mb-3">
                        <Form.Control type="text" placeholder={<FormattedMessage id="registro.label_ubicacion" />} {...register('location', { required: true })} />
                        {errors.location && <p><FormattedMessage id="registro.mensaje_error" /></p>}
                    </FloatingLabel>
                </>
            )}

            <Button type="submit"><FormattedMessage id="registro.boton_registrar" /></Button>
        </form>
    );
};

export default RegistroForm;
