import React, { useEffect, useState } from 'react';
import HomeCarousel from './HomeCarousel';
import { FormattedMessage, useIntl } from 'react-intl';
import { Row, Col, Button } from 'react-bootstrap';

const Home = () => {
    const [teamMembers, setTeamMembers] = useState([]);
    const [services, setServices] = useState([]);

    const intl = useIntl();

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
                        <h5><FormattedMessage id="home.update"/></h5>
                        <input type="email" placeholder={intl.formatMessage({ id: 'home.email' })} />
                        <Button style={{ backgroundColor: '#844685' }}><FormattedMessage id="home.suscribe"/></Button>
                        <p><FormattedMessage id="home.para"/></p>
                    </Col>
                    <Col>
                        <Row>
                            <Col>
                                <h5><FormattedMessage id="home.soporte"/></h5>
                                <ul>
                                    <li><FormattedMessage id="home.info"/></li>
                                    <li><FormattedMessage id="home.faq"/></li>
                                    <li><FormattedMessage id="home.contact"/></li>
                                    <li><FormattedMessage id="home.center"/></li>
                                </ul>
                            </Col>
                            <Col>
                                <h5><FormattedMessage id="home.producto"/></h5>
                                <ul>
                                    <li><FormattedMessage id="home.crm"/></li>
                                    <li><FormattedMessage id="home.precio"/></li>
                                    <li><FormattedMessage id="home.web"/></li>
                                </ul>
                            </Col>
                            <Col>
                                <h5><FormattedMessage id="home.org"/></h5>
                                <ul>
                                    <li><FormattedMessage id="home.us"/></li>
                                    <li><FormattedMessage id="home.news"/></li>
                                    <li><FormattedMessage id="home.poli"/></li>
                                    <li><FormattedMessage id="home.terms"/></li>
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
