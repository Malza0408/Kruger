import { Col, Offcanvas, Row } from 'react-bootstrap';

const MemberListCanvas = ({ showOffcanvas, handleClose, list }) => {
    return (
        <Offcanvas
            show={showOffcanvas}
            onHide={handleClose}
            className="offcanvas"
        >
            <Offcanvas.Header
                style={{ backgroundColor: '#fff5f5' }}
                closeButton
            >
                <Offcanvas.Title>멤버 목록</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {list?.map((applicant, index) => {
                    return (
                        <Row key={index} className="applicant-list">
                            <Col>
                                {index + 1}. {applicant.name}
                            </Col>
                        </Row>
                    );
                })}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default MemberListCanvas;
