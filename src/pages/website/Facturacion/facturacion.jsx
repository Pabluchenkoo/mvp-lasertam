import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'antd';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ContainerExample() {
    const getDepartmentosColombia = () => {
        return [
            'Amazonas',
            'Antioquia',
            'Arauca',
            'Atlántico',
            'Bolívar',
            'Boyacá',
            'Caldas',
            'Caquetá',
            'Casanare',
            'Cauca',
            'Cesar',
            'Chocó',
            'Córdoba',
            'Cundinamarca',
            'Bogota D.C.',
            'Guainía',
            'Guaviare',
            'Huila',
            'La Guajira',
            'Magdalena',
            'Meta',
            'Nariño',
            'Norte de Santander',
            'Putumayo',
            'Quindío',
            'Risaralda',
            'San Andrés y Providencia',
            'Santander',
            'Sucre',
            'Tolima',
            'Valle del Cauca',
            'Vaupés',
            'Vichada'
        ];
    };
    const getTiposPago = () => {
        return [
            'Efectivo',
            'Tarjeta de Crédito',
            'Tarjeta de Débito',
            'Transferencia Bancaria',
            'PayPal',
            'Mercado Pago',
            'Nequi',
            'Daviplata',
            'Crypto Monedas',
            'Cheque',
            'Consignación Bancaria',
        ];
        };
    return (
    
        <Container>
        <br/>
        <h1>Facturación</h1>
        <p>Facturación de tu negocio</p>
      <Row>
              <Col>
                  <div>
                        <Card style={{ width: 600, height:450}}>
                            <p1>Nombre</p1>
                            <FloatingLabel controlId="floatingInput" label="Nombres" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Apellido</p1>
                            <FloatingLabel controlId="floatingInput" label="Apellidos" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Correo</p1>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Telefono</p1>
                            <FloatingLabel controlId="floatingInput" label="Telefono celular" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>    
                        </Card>
                </div>
            </Col>
                <Col>
                    <div>
                        
                        <Card style={{ width: 600, height:450 }}>
                            <Form.Label>Tipo de pago</Form.Label>
                            <Form.Select aria-label="Tipos de Pago">
                            {getTiposPago().map((tipoPago) => (
                                <option key={tipoPago} value={tipoPago}>
                                {tipoPago}
                                </option>
                            ))}
                            </Form.Select>
                        <br/>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Enviar algo</Form.Label>
                            <Form.Control type="file" />
                            </Form.Group>
                        <br/>
                        <p1>Departamento</p1>
                        <Form.Select aria-label="Departamentos de Colombia">
                            {getDepartmentosColombia().map((departamento) => (
                                <option key={departamento} value={departamento}>
                                {departamento}
                                </option>
                            ))}
                            </Form.Select>
                        <br/>    
                        <p1>Comentarios</p1>
                        <FloatingLabel controlId="floatingTextarea2" label="Comments">
                            <Form.Control
                            as="textarea"
                            placeholder="Leave a comment here"
                            style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        </Card>
                    </div>
            </Col>
            </Row>
            <br/>
    <button type="submit" class="btn btn-primary" style={{width:200,height:50}}>Enviar</button>
    </Container>
    
  );
}

export default ContainerExample;