import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Classess from "../css/index.module.css";
export default function Footer() {
  const navigate = useNavigate();
  return (
    <Container fluid className="bg-dark py-2 ">
      <Row>
        <Col
          onClick={() => navigate(-1)}
          className={`${Classess.active} ${Classess.hover} border border-warning`}
        >
          GO BACK
        </Col>
        <Col>
          <div className="text-light">
            <h4 className="d-flex justify-content-center align-items-center">
              @2022 | ahashanahmed@yahoo.com
            </h4>
          </div>
        </Col>
        <Col
          onClick={() => navigate(1)}
          className={`${Classess.active}  ${Classess.hover} border border-warning`}
        >
          GO FORWARD
        </Col>
      </Row>
    </Container>
  );
}
