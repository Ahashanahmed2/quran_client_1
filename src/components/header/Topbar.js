import { Row, Col,Container } from "react-bootstrap";
import TopInput from "./TopInput";
import TopSubject from "./TopSubject";
import Navlink from "./Navlink";
export default function Header() {
  return (
    <Container fluid>
      <Row className="bg-warning" sticky="top">
        <Col className="text-center d-md-block d-none bg-danger" md={3}>
          <TopSubject />
        </Col>
        <Col>
          <Navlink />
        </Col>
        <Col>
          <TopInput />
        </Col>
      </Row>
    </Container>
  );
}
