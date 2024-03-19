import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';

const ContainerExample = () => {
    const [formData, setFormData] = useState({
        nombres: '',
        apellidos: '',
        email: '',
        telefono: '',
        tipoPago: '',
        departamento: '',
        comentario: '',
        cedula: '',
        fecha: ''
    });
    const [savedData, setSavedData] = useState([]);
    const [apiData, setApiData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/JuanSe2003/facturas/main/facturas5.json')
            .then(response => response.json())
            .then(data => setApiData(data))
            .catch(error => console.error('Error fetching API:', error));
    }, []);

    const getDepartmentosColombia = () => {
        return [
            'Amazonas', 'Antioquia', 'Arauca', 'Atlántico', 'Bolívar', 'Boyacá', 'Caldas', 'Caquetá', 'Casanare',
            'Cauca', 'Cesar', 'Chocó', 'Córdoba', 'Cundinamarca', 'Bogota D.C.', 'Guainía', 'Guaviare', 'Huila',
            'La Guajira', 'Magdalena', 'Meta', 'Nariño', 'Norte de Santander', 'Putumayo', 'Quindío', 'Risaralda',
            'San Andrés y Providencia', 'Santander', 'Sucre', 'Tolima', 'Valle del Cauca', 'Vaupés', 'Vichada'
        ];
    };

    const getTiposPago = () => {
        return [
            'Efectivo', 'Tarjeta de Crédito', 'Tarjeta de Débito', 'Transferencia Bancaria', 'PayPal', 'Mercado Pago',
            'Nequi', 'Daviplata', 'Crypto Monedas', 'Cheque', 'Consignación Bancaria'
        ];
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateFormData()) {
            return;
        }
        setSavedData([...savedData, formData]);
        setFormData({
            nombres: '',
            apellidos: '',
            email: '',
            telefono: '',
            tipoPago: '',
            departamento: '',
            comentario: '',
            cedula: '',
            fecha: ''
        });
    };

    const validateFormData = () => {
        const { nombres, apellidos, email, telefono, cedula } = formData;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const nameRegex = /^[a-zA-Z\s]+$/;

        if (!nameRegex.test(nombres) || !nameRegex.test(apellidos)) {
            alert("El nombre y apellido solo pueden contener letras.");
            return false;
        }
        if (!emailRegex.test(email)) {
            alert("El correo electrónico no es válido.");
            return false;
        }
        if (!(/^\d+$/.test(telefono)) || telefono.length < 7 || telefono.length > 10) {
            alert("El teléfono solo puede contener números y debe tener entre 7 y 10 dígitos.");
            return false;
        }
        if (!(/^\d+$/.test(cedula)) || cedula.length < 7 || cedula.length > 10) {
            alert("La cédula solo puede contener números y debe tener entre 7 y 10 dígitos.");
            return false;
        }
        return true;
    };

    const handleInvoiceClick = (invoice) => {
        setSelectedInvoice(invoice);
        setShowModal(true);
    };

    const columns = [
        { title: 'Nombres', dataIndex: 'nombres', key: 'nombres' },
        { title: 'Apellidos', dataIndex: 'apellidos', key: 'apellidos' },
        { title: 'Correo', dataIndex: 'email', key: 'email' },
        { title: 'Telefono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Tipo de Pago', dataIndex: 'tipoPago', key: 'tipoPago' },
        { title: 'Departamento', dataIndex: 'departamento', key: 'departamento' },
        { title: 'Comentarios', dataIndex: 'comentario', key: 'comentario' },
        { title: 'Cédula', dataIndex: 'cedula', key: 'cedula' },
        { title: 'Fecha', dataIndex: 'fecha', key: 'fecha' }
    ];

    return (
        <Container>
            <h1 className="mt-5 mb-4">Facturación</h1>
            <Row>
                <Col md={6}>
                    <Card className="p-4 h-100">
                        <Form>
                            <Form.Group className="mb-3" controlId="nombres">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="apellidos">
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label>Correo</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefono">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cedula">
                                <Form.Label>Cédula</Form.Label>
                                <Form.Control type="text" name="cedula" value={formData.cedula} onChange={handleChange} required />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-4 h-100">
                        <Form>
                            <Form.Group className="mb-3" controlId="tipoPago">
                                <Form.Label>Tipo de pago</Form.Label>
                                <Form.Select name="tipoPago" value={formData.tipoPago} onChange={handleChange} required>
                                    <option value="">Seleccionar</option>
                                    {getTiposPago().map((tipoPago, index) => (
                                        <option key={index} value={tipoPago}>{tipoPago}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="departamento">
                                <Form.Label>Departamento</Form.Label>
                                <Form.Select name="departamento" value={formData.departamento} onChange={handleChange} required>
                                    <option value="">Seleccionar</option>
                                    {getDepartmentosColombia().map((departamento, index) => (
                                        <option key={index} value={departamento}>{departamento}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="comentario">
                                <Form.Label>Comentarios</Form.Label>
                                <Form.Control as="textarea" rows={3} name="comentario" value={formData.comentario} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="fecha">
                                <Form.Label>Fecha</Form.Label>
                                <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Button variant="primary" onClick={handleSubmit} block>Enviar</Button>
                </Col>
            </Row>
            {(savedData.length > 0 || apiData.length > 0) && (
                <div className="mt-5">
                    <h2>Datos Guardados</h2>
                    <Table bordered striped hover>
                        <thead>
                            <tr>
                                {columns.map(column => (
                                    <th key={column.key}>{column.title}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {savedData.map((data, index) => (
                                <tr key={index} onClick={() => handleInvoiceClick(data)} style={{ cursor: 'pointer' }}>
                                    {Object.values(data).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                            {apiData.map((data, index) => (
                                <tr key={index} onClick={() => handleInvoiceClick(data)} style={{ cursor: 'pointer' }}>
                                    {Object.values(data).map((value, idx) => (
                                        <td key={idx}>{value}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Detalle de Factura</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvoice && (
                        <div>
                            <p><strong>Nombres:</strong> {selectedInvoice.nombres}</p>
                            <p><strong>Apellidos:</strong> {selectedInvoice.apellidos}</p>
                            <p><strong>Correo:</strong> {selectedInvoice.email}</p>
                            <p><strong>Telefono:</strong> {selectedInvoice.telefono}</p>
                            <p><strong>Tipo de Pago:</strong> {selectedInvoice.tipoPago}</p>
                            <p><strong>Departamento:</strong> {selectedInvoice.departamento}</p>
                            <p><strong>Comentarios:</strong> {selectedInvoice.comentario}</p>
                            <p><strong>Cédula:</strong> {selectedInvoice.cedula}</p>
                            <p><strong>Fecha:</strong> {selectedInvoice.fecha}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cerrar</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ContainerExample;
