import React from 'react';
import { useParams } from 'react-router-dom';
import { useEvents } from './context/eventsContext';
import moment from 'moment';
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn
} from 'mdb-react-ui-kit';
import ReviewTable from "./reviewTable";

export default function EventDetails() {

    const { eventId } = useParams();
    const { events } = useEvents();
    const event = events.find(e => e.id === parseInt(eventId, 10));

    if (!event) {
        return <div>Event not found</div>;
    }



    return (
        <>
            <br/>
        <section style={{ backgroundColor: '#eee' }}>
            <MDBContainer className="py-5">

                <MDBRow>
                    <MDBCol lg="4">
                        <MDBCard className="mb-4">
                            <MDBCardBody className="text-center">
                                <div className="d-flex justify-content-center">
                                    <MDBCardImage
                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                                        alt="avatar"
                                        className="rounded-circle"
                                        style={{ width: '150px' }}
                                        fluid />
                                </div>
                                <br/>
                                <br/>
                                {event?.client?.name && <p className="text-muted mb-1">{event.client.name}</p>}
                                {event?.client?.email && <p className="text-muted mb-4">{event.client.email}</p>}
                                {event?.client?.phone && <p className="text-muted mb-4">{event.client.phone}</p>}
                                <div className="d-flex justify-content-center mb-2">
                                    <MDBBtn outline className="ms-1">Message</MDBBtn>
                                </div>
                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                    <MDBCol lg="8">
                        <MDBCard className="mb-4">
                            <MDBCardBody>
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Servicio</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{event.title}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Profesional</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{event.professional}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Hora Inicio</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{moment(event.start).format('LLL')}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Hora Final</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted"> {moment(event.end).format('LLL')}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                                <hr />
                                <MDBRow>
                                    <MDBCol sm="3">
                                        <MDBCardText>Comentario</MDBCardText>
                                    </MDBCol>
                                    <MDBCol sm="9">
                                        <MDBCardText className="text-muted">{event.comments}</MDBCardText>
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>

                        <MDBRow>
                            <MDBCol md="12">
                                <MDBCard className="mb-4 mb-md-0">
                                    <MDBCardBody>
                                        <ReviewTable eventId={eventId} />
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBCol>

                        </MDBRow>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </section>
        </>
    );
}