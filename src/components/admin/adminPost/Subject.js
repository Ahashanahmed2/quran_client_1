import Classess from "../../../css/index.module.css";
import { useState } from "react";
import axios from "axios";
import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default function Subject() {
    const [subject, setSubject] = useState({
      book: "",
      subject_name: "",
     
    });
   const sub = () => {
     axios
       .post(`${process.env.REACT_APP_URL}/subject`, subject)
       .then((data) => {
         console.log(data.data);
         alert(data.data);
       })
       .catch((err) => console.log({ message: err }));
   };

  return (
    <>
      <Container>
        <Row className="d-grid justify-content-center">
          <Col>
            <strong>Subject</strong>
          </Col>
        </Row>
        <Row className={Classess.center2}>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="বইয়ের নাম"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="বইয়ের নাম"
                value={subject.book}
                onChange={(e) => {
                  setSubject({ ...subject, book: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className={Classess.center2}>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="সাবজেক্ট নাম"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="সাবজেক্ট নাম"
                value={subject.subject_name}
                onChange={(e) => {
                  setSubject({ ...subject, subject_name: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <div className="d-grid gap-2">
          <Button
            type="submit"
            onClick={sub}
            className="mb-3"
            variant="secondary"
            size="sm"
          >
            BOOk Input Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
