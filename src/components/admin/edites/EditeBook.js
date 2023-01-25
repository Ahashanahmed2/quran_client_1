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
export default function Book() {
  const { bo } = useParams();
  const [book, setBook] = useState({
    book: "",
    Author_Introduction: "",
    Meaning_of_Revelation: "",
    History_of_Quran_Revelation: "",
    History_of_Preservation_of_Quran: "",
    Misconceptions_about_Tafsir: "",
  });

  useEffect(() => {
   
    axios
      .get(`${process.env.REACT_APP_URL}/book/list/${bo}`)
      .then((value) => {
        value.data.map((values) => {
          setBook({
            book: values.book,
            Author_Introduction: values.Author_Introduction,
            Meaning_of_Revelation: values.Meaning_of_Revelation,
            History_of_Quran_Revelation: values.History_of_Quran_Revelation,
            History_of_Preservation_of_Quran:
              values.History_of_Preservation_of_Quran,
            Misconceptions_about_Tafsir: values.Misconceptions_about_Tafsir,
          });
        });
      })
      .catch((err) => console.log({ message: err }));

  
}, [])


  const sub = () => {
    axios
      .put(`http://localhost:5000/book/${bo}`, book)
      .then((data) => {
       
        alert("your data is update");
      })
      .catch((err) => console.log({ message: err }));
  };
  return (
    <>
      <Container>
        <Row className="d-grid justify-content-center ">
          <Col>
            <strong>Book</strong>
          </Col>
        </Row>
        <Row>
          <Col>
            <FloatingLabel controlId="floatingInput" label="বইয়ের নাম">
              <Form.Control
                type="text"
                className="mb-3"
                placeholder="বইয়ের নাম"
                value={book.book}
                onChange={(e) => {
                  setBook({ ...book, book: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="লেখকের পরিচিতি">
              <Form.Control
                as="textarea"
                placeholder="লেখকের পরিচিতি"
                style={{ height: "200px" }}
                className="mb-3"
                value={book.Author_Introduction}
                onChange={(e) => {
                  setBook({ ...book, Author_Introduction: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel controlId="floatingTextarea2" label="ওহির তাৎর্পয়">
              <Form.Control
                as="textarea"
                placeholder="ওহির তাৎর্পয়"
                style={{ height: "300px" }}
                className="mb-3"
                value={book.Meaning_of_Revelation}
                onChange={(e) => {
                  setBook({ ...book, Meaning_of_Revelation: e.target.value });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="কোরআন নাজিলের ইতিহাস"
            >
              <Form.Control
                as="textarea"
                placeholder="কোরআন নাজিলের ইতিহাস"
                style={{ height: "400px" }}
                className="mb-3"
                value={book.History_of_Quran_Revelation}
                onChange={(e) => {
                  setBook({
                    ...book,
                    History_of_Quran_Revelation: e.target.value,
                  });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="কোরআন সংরক্ষনের ইতিহাস"
            >
              <Form.Control
                as="textarea"
                placeholder="কোরআন সংরক্ষনের ইতিহাস"
                style={{ height: "400px" }}
                className="mb-3"
                value={book.History_of_Preservation_of_Quran}
                onChange={(e) => {
                  setBook({
                    ...book,
                    History_of_Preservation_of_Quran: e.target.value,
                  });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>

        <Row>
          <Col>
            <FloatingLabel
              controlId="floatingTextarea2"
              label="তাফসির সম্পর্কে ভুল ধারণা"
            >
              <Form.Control
                as="textarea"
                placeholder="তাফসির সম্পর্কে ভুল ধারণা"
                style={{ height: "400px" }}
                className="mb-3"
                value={book.Misconceptions_about_Tafsir}
                onChange={(e) => {
                  setBook({
                    ...book,
                    Misconceptions_about_Tafsir: e.target.value,
                  });
                }}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <div className="d-grid gap-2">
          <Button className="mb-3" variant="secondary" size="sm" onClick={sub}>
            BOOk Input Submit
          </Button>
        </div>
      </Container>
    </>
  );
}
