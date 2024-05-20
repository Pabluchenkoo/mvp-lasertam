import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Table, Modal } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';


const Facturacion = () => {
    const intl = useIntl();

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

    // useEffect(() => {
    //     fetch('https://raw.githubusercontent.com/JuanSe2003/facturas/main/facturas5.json')
    //         .then(response => response.json())
    //         .then(data => setApiData(data))
    //         .catch(error => console.error('Error fetching API:', error));
    // }, []);

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
            alert(intl.formatMessage({ id: "facturacion.error_nombre_apellido" }));
            return false;
        }
        if (!emailRegex.test(email)) {
            alert(intl.formatMessage({ id: "facturacion.error_correo" }));
            return false;
        }
        if (!(/^\d+$/.test(telefono)) || telefono.length < 7 || telefono.length > 10) {
            alert(intl.formatMessage({ id: "facturacion.error_telefono" }));
            return false;
        }
        if (!(/^\d+$/.test(cedula)) || cedula.length < 7 || cedula.length > 10) {
            alert(intl.formatMessage({ id: "facturacion.error_cedula" }));
            return false;
        }
        return true;
    };

    const handleInvoiceClick = (invoice) => {
        setSelectedInvoice(invoice);
        setShowModal(true);
    };

    const columns = [
        { title: intl.formatMessage({ id: "facturacion.nombre" }), dataIndex: 'nombres', key: 'nombres' },
        { title: intl.formatMessage({ id: "facturacion.apellido" }), dataIndex: 'apellidos', key: 'apellidos' },
        { title: intl.formatMessage({ id: "facturacion.correo" }), dataIndex: 'email', key: 'email' },
        { title: intl.formatMessage({ id: "facturacion.telefono" }), dataIndex: 'telefono', key: 'telefono' },
        { title: intl.formatMessage({ id: "facturacion.tipo_pago" }), dataIndex: 'tipoPago', key: 'tipoPago' },
        { title: intl.formatMessage({ id: "facturacion.departamento" }), dataIndex: 'departamento', key: 'departamento' },
        { title: intl.formatMessage({ id: "facturacion.comentarios" }), dataIndex: 'comentario', key: 'comentario' },
        { title: intl.formatMessage({ id: "facturacion.cedula" }), dataIndex: 'cedula', key: 'cedula' },
        { title: intl.formatMessage({ id: "facturacion.fecha" }), dataIndex: 'fecha', key: 'fecha' }
    ]

    return (
        <Container>
            <h1 className="mt-5 mb-4"><FormattedMessage id="facturacion.titulo" /></h1>
            <Row>
                <Col md={6}>
                    <Card className="p-4 h-100">
                        <Form>
                            <Form.Group className="mb-3" controlId="nombres">
                                <Form.Label><FormattedMessage id="facturacion.nombre" /></Form.Label>
                                <Form.Control type="text" name="nombres" value={formData.nombres} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="apellidos">
                                <Form.Label><FormattedMessage id="facturacion.apellido" /></Form.Label>
                                <Form.Control type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="email">
                                <Form.Label><FormattedMessage id="facturacion.correo" /></Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="telefono">
                                <Form.Label><FormattedMessage id="facturacion.telefono" /></Form.Label>
                                <Form.Control type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="cedula">
                                <Form.Label><FormattedMessage id="facturacion.cedula" /></Form.Label>
                                <Form.Control type="text" name="cedula" value={formData.cedula} onChange={handleChange} required />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
                <Col md={6}>
                    <Card className="p-4 h-100">
                        <Form>
                            <Form.Group className="mb-3" controlId="tipoPago">
                                <Form.Label><FormattedMessage id="facturacion.tipo_pago" /></Form.Label>
                                <Form.Select name="tipoPago" value={formData.tipoPago} onChange={handleChange} required>
                                    <option value="">{intl.formatMessage({ id: "facturacion.seleccionar" })}</option>
                                    {getTiposPago().map((tipoPago, index) => (
                                        <option key={index} value={tipoPago}>{tipoPago}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="departamento">
                                <Form.Label><FormattedMessage id="facturacion.departamento" /></Form.Label>
                                <Form.Select name="departamento" value={formData.departamento} onChange={handleChange} required>
                                    <option value="">{intl.formatMessage({ id: "facturacion.seleccionar" })}</option>
                                    {getDepartmentosColombia().map((departamento, index) => (
                                        <option key={index} value={departamento}>{departamento}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="comentario">
                                <Form.Label><FormattedMessage id="facturacion.comentarios" /></Form.Label>
                                <Form.Control as="textarea" rows={3} name="comentario" value={formData.comentario} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="fecha">
                                <Form.Label><FormattedMessage id="facturacion.fecha" /></Form.Label>
                                <Form.Control type="date" name="fecha" value={formData.fecha} onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Card>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={{ span: 6, offset: 3 }}>
                    <Button variant="primary" onClick={handleSubmit} block><FormattedMessage id="facturacion.enviar" /></Button>
                </Col>
            </Row>
            {(savedData.length > 0 || apiData.length > 0) && (
                <div className="mt-5">
                    <h2><FormattedMessage id="facturacion.datos_guardados" /></h2>
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
                    <Modal.Title><FormattedMessage id="facturacion.detalle_factura" /></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedInvoice && (
                        <div>
                            <p><strong><FormattedMessage id="facturacion.nombre" />:</strong> {selectedInvoice.nombres}</p>
                            <p><strong><FormattedMessage id="facturacion.apellido" />:</strong> {selectedInvoice.apellidos}</p>
                            <p><strong><FormattedMessage id="facturacion.correo" />:</strong> {selectedInvoice.email}</p>
                            <p><strong><FormattedMessage id="facturacion.telefono" />:</strong> {selectedInvoice.telefono}</p>
                            <p><strong><FormattedMessage id="facturacion.tipo_pago" />:</strong> {selectedInvoice.tipoPago}</p>
                            <p><strong><FormattedMessage id="facturacion.departamento" />:</strong> {selectedInvoice.departamento}</p>
                            <p><strong><FormattedMessage id="facturacion.comentarios" />:</strong> {selectedInvoice.comentario}</p>
                            <p><strong><FormattedMessage id="facturacion.cedula" />:</strong> {selectedInvoice.cedula}</p>
                            <p><strong><FormattedMessage id="facturacion.fecha" />:</strong> {selectedInvoice.fecha}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}><FormattedMessage id="facturacion.cerrar" /></Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
    };

export default Facturacion;
