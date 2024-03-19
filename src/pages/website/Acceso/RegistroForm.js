import React from "react";
import { useForm } from "react-hook-form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from "react-bootstrap";

const RegistroForm = ({ role, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control type="email" placeholder="Email" {...register('email', { required: true })} />
                {errors.email && <p>This field is required</p>}
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control type="password" placeholder="Password" {...register('password', { required: true })} />
                {errors.password && <p>This field is required</p>}
            </FloatingLabel>

            <FloatingLabel controlId="FirstName" label="First Name" className="mb-3">
                <Form.Control type="text" placeholder="First Name" {...register('first_name', { required: true })} />
                {errors.first_name && <p>This field is required</p>}
            </FloatingLabel>

            <FloatingLabel controlId="LastName" label="Last Name" className="mb-3">
                <Form.Control type="text" placeholder="Last Name" {...register('last_name', { required: true })} />
                {errors.last_name && <p>This field is required</p>}
            </FloatingLabel>

            {role === 'administrador' && (
                <>
                    <FloatingLabel controlId="CompanyName" label="Company Name" className="mb-3">
                        <Form.Control type="text" placeholder="Company Name" {...register('company_name', { required: true })} />
                        {errors.company_name && <p>This field is required</p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Cedula" label="Cedula" className="mb-3">
                        <Form.Control type="text" placeholder="Cedula" {...register('cedula', { required: true })} />
                        {errors.cedula && <p>This field is required</p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Description" label="Description" className="mb-3">
                        <Form.Control type="text" placeholder="Description" {...register('description', { required: true })} />
                        {errors.description && <p>This field is required</p>}
                    </FloatingLabel>

                    <FloatingLabel controlId="Location" label="Location" className="mb-3">
                        <Form.Control type="text" placeholder="Location" {...register('location', { required: true })} />
                        {errors.location && <p>This field is required</p>}
                    </FloatingLabel>
                </>
            )}

            <Button type="submit">Sign Up</Button>
        </form>
    );
};

export default RegistroForm;
