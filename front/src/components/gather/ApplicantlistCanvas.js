import { Button, Col, Offcanvas, Row } from 'react-bootstrap';

const ApplicantlistCanvas = ({
    showOffcanvas,
    handleClose,
    list,
    handliClickAcknowledgment
}) => {
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
                <Offcanvas.Title>지원자 목록</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {list?.map((applicant, index) => {
                    return (
                        <Row key={index} className="applicant-list">
                            <Col>
                                {index + 1}. {applicant.name}
                            </Col>
                            <Col className="applicant-btn-container">
                                <Button
                                    className="applicant-list-btn"
                                    onClick={handliClickAcknowledgment(
                                        applicant.id
                                    )}
                                    // disabled={post?.member.find(m => m === )}
                                >
                                    승인
                                </Button>
                            </Col>
                        </Row>
                    );
                })}
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default ApplicantlistCanvas;
