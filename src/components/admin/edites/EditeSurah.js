import { useState, useEffect } from "react";

import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import {useParams } from "react-router-dom";
import axios from "axios";

export default function EditeSurah() {
  const { al } = useParams();

  const [quran, setQuran] = useState({
    id: "",
    book: "",
    name: "",
    number: "",
    versesNumber: "",
    verses: "",
    summary: "",
    ancillary_issues: "",
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/quran/surah/${al}`)
      .then((values) => {
        values.data.map((value) => {
          console.log(value._id);
          setQuran({
            book: value.book,
            name: value.name,
            number: value.number,
            versesNumber: value.versesNumber,
            verses: value.verses,
            summary: value.summary,
            ancillary_issues: value.ancillary_issues,
          });
        });
      })
      .catch((err) => console.log({ message: err }));
  }, []);

  let sub = () => {
    axios
      .put(`${process.env.REACT_APP_URL}/quran/${al}`, quran)
      .then((values) => {
        alert("your data is update");
      })
      .catch((err) => console.log({ message: err }));
  };

  return (
    <>
      
      <Container>
        <Row className="d-grid justify-content-center bg-dark text-warning">
          <Col>
            <h3>Quran Adite</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="বইয়ের নাম"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="বইয়ের নাম"
                value={quran.book}
                onChange={(e) => {
                  setQuran({ ...quran, book: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingPassword" label="সুরার নাম">
              <Form.Control
                type="text"
                placeholder="সুরার নাম"
                value={quran.name}
                onChange={(e) => {
                  setQuran({ ...quran, name: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingInput"
              label="সুরার নাম্বার"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="সুরার নাম্বার"
                value={quran.number}
                onChange={(e) => {
                  setQuran({ ...quran, number: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingPassword" label="আয়াত নাম্বার">
              <Form.Control
                type="text"
                placeholder="আয়াত নাম্বার"
                value={quran.versesNumber}
                onChange={(e) => {
                  setQuran({ ...quran, versesNumber: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="আয়াত বাংলা ,আরকি"
            >
              <Form.Control
                as="textarea"
                placeholder="আয়াত বাংলা ,আরকি"
                style={{ height: "200px" }}
                className="mb-3"
                value={quran.verses}
                onChange={(e) => {
                  setQuran({ ...quran, verses: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="সারসংক্ষেপ">
              <Form.Control
                as="textarea"
                placeholder="সারসংক্ষেপ"
                style={{ height: "300px" }}
                className="mb-3"
                value={quran.summary}
                onChange={(e) => {
                  setQuran({ ...quran, summary: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="আনুসঞ্জিক বিষয়">
              <Form.Control
                as="textarea"
                placeholder="আনুসঞ্জিক বিষয়"
                style={{ height: "400px" }}
                className="mb-3"
                value={quran.ancillary_issues}
                onChange={(e) => {
                  setQuran({ ...quran, ancillary_issues: e.target.value });
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
            Quran Input Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
