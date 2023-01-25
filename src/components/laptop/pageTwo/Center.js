import CenterLaptop from "./CenterLaptop";
import CenterSubject from "./CenterSubject";
import { Container, Row, Col } from "react-bootstrap";

import Topbar from "./Topbar";

export default function Center() {
  return (
    <>
      <Topbar />
      <Container fluid>
        <Row>
          <Col md={3} className="bg-info d-md-block d-none">
            <CenterSubject />
          </Col>
          <Col md={9} className="bg-dark text-light ">
            <CenterLaptop />
          </Col>
        </Row>
      </Container>
    </>
  );
}
