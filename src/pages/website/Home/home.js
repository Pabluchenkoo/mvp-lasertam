import React, { useEffect, useState } from 'react';
import HomeCarousel from './HomeCarousel';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';

const Home = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const loadJSON = (url, setter) => {
            fetch(url)
              .then(response => response.json())
              .then(data => {
                setter(data);
              })
              .catch(error => {
                console.error('Error fetching data:', error);
              });
        };

        loadJSON('https://raw.githubusercontent.com/Programacion-con-Tecnologias-Web/DatosLanding/main/team.json', setTeamMembers);
        

        loadJSON('https://raw.githubusercontent.com/Programacion-con-Tecnologias-Web/DatosLanding/main/servicios.json', setServices);
    }, []);

    return (
        <>
            <br/>
            <br/>
            <HomeCarousel/>
            <br/>
            <br/>
            <hr/>

            <h4><FormattedMessage id="home.gestiona"/></h4>
            <div style={{ overflowX: 'auto' }}>
                <Row className="card-row">
                    {teamMembers.map(member => (
                        <Col key={member.id} className="card-col">
                            <div className="card" style={{ backgroundColor: '#CCC1BE' }}>
                                <div className="card-body" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={member.image} alt={member.name} className="card-img-top" style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
                                    <div>
                                        <h5 className="card-title">{member.name}</h5>
                                        <p className="card-text">{member.role}</p>
                                        <p className="card-text">{member.comment}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <hr/>

            <h4><FormattedMessage id="home.servicios"/></h4>
            <div style={{ overflowX: 'auto' }}>
                <Row className="card-row">
                    {services.map(service => (
                        <Col key={service.id} className="card-col">
                            <div className="card" style={{ backgroundColor: '#F2F2F2' }}>
                                <div className="card-body" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src={service.image} alt={service.name} className="card-img-top" style={{ width: '100px', height: 'auto', marginRight: '10px' }} />
                                    <div>
                                        <h5 className="card-title">{service.name}</h5>
                                        <p className="card-text">{service.address}</p>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <hr/>

            <div className="footer">
                <Row>
                    <Col>
                        <h5>Mantente actualizado</h5>
                        <input type="email" placeholder="Correo electrónico" />
                        <Button style={{ backgroundColor: '#844685' }}>Suscribirse</Button>
                        <p>Mantente en contacto con nosotros para recibir novedades, descuentos y ofertas sobre nuestros servicios. ¡No pierdas ninguna oportunidad! ¡Es gratis!</p>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5>Soporte</h5>
                                <ul>
                                    <li>Información de la cuenta</li>
                                    <li>FAQ</li>
                                    <li>Contáctanos</li>
                                    <li>Centro de ayuda</li>
                                </ul>
                            </Col>
                            <Col>
                                <h5>Producto</h5>
                                <ul>
                                    <li>CRM</li>
                                    <li>Precio</li>
                                    <li>Creador de sitios web</li>
                                </ul>
                            </Col>
                            <Col>
                                <h5>Organización</h5>
                                <ul>
                                    <li>Sobre nosotros</li>
                                    <li>Periódico</li>
                                    <li>Política de privacidad</li>
                                    <li>Términos de servicio</li>
                                </ul>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default Home;
