import Classess from "../../../css/index.module.css";
import { useState,useEffect } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

export default function EditeSubject() {

  const { s } = useParams();

  const [subject, setSubject] = useState({
    book: "",
    subject_name: "",
  });

  useEffect(() => {

  axios
    .get(`${process.env.REACT_APP_URL}/subject/list/${s}`)
    .then((value) => {
      value.data.map((values) => {
        setSubject({
          book: values.book,
          subject_name: values.subject_name,
        });
      });
    })
    .catch((err) => console.log({ message: err }));
},[])



  const sub = () => {
    axios
      .put(`http://localhost:5000/subject/${s}`, subject)
      .then((data) => {
       alert("your data is update")
        
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
          
            onClick={sub}
            className="mb-3"
            variant="secondary"
       
          >
            BOOk Input Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
