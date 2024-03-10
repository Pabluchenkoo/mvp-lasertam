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
    return (
    
    <Container>
        <h1>Facturación</h1>
        <p>Facturación de tu negocio</p>
      <Row>
              <Col>
                  <div>
                        <Card style={{ width: 600 }}>
                            <p1>Nombre</p1>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Apellido</p1>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Correo</p1>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>
                            <p1>Telefono</p1>
                            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                <Form.Control type="email" placeholder="" />
                            </FloatingLabel>    
                        </Card>
                </div>
            </Col>
                <Col>
                    <div>
                        <Card style={{ width: 600 }}>  
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Enviar algo</Form.Label>
                            <Form.Control type="file" />
                            </Form.Group>
                        <p1>Departamento</p1>
                        <Form.Select aria-label="Departamentos de Colombia">
                            {getDepartmentosColombia().map((departamento) => (
                                <option key={departamento} value={departamento}>
                                {departamento}
                                </option>
                            ))}
                        </Form.Select>
                        </Card>
                    </div>
            </Col>
      </Row>
    </Container>
    
  );
}

export default ContainerExample;