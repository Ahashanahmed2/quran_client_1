
import {

  Row,
  Col,
 
} from "react-bootstrap";

//Admin Body
import Book from "./Book";
import Quran from "./Quran.js";
import Subject from "./Subject.js";

export default function Views() {
  return (
    <>
      <Row>
        <Col>
          <Quran />
        </Col>
      </Row>
      <Row>
        <Col>
          <Subject />
        </Col>
      </Row>
      <Row>
        <Col>
          
          <Book />
        </Col>
      </Row>
    </>
  );
}
