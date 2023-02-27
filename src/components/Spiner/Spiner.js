import React from 'react'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';

const Spiner = () => {
    return (
        <Container>
            <Row>
                <Col className='d-flex justify-content-center align-item-center mt-5'>
                    <Spinner animation="border" variant="primary" />
                </Col>
            </Row>
        </Container>
    )
}

export default Spiner