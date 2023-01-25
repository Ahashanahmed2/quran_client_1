import {
  ListGroup,
  Card,
  Tab,
  Row,
  Dropdown,
  Form,
  FormControl,
  Navbar,
  Col,
  Container,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import Classess from "../../../css/index.module.css";
import axios from "axios";
export default function Header() {
  const [book, setBook] = useState([]);
  let [change, setChange] = useState("");
  let [subject, setSubject] = useState([]);
  let [none, setNone] = useState("d-md-none");

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/book`)
      .then((value) => {
        setBook(value.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  }, []);
  console.log(change);

  let pageOneChange = (e) => {
    setChange(e);
    axios
      .get(`${process.env.REACT_APP_URL}/quran/subjectOne/${e}`)
      .then((value) => {
        setSubject(value.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  };
  let pageOneFocus = (e) => {
    if (change == "") {
      setSubject([]);
    }
    setNone("d-none");
  };
  let pageOneBlur = (e) => {
    setNone("d-block");
    if (change == "") {
      setSubject([]);
    }
  };
  return (
    <div>
      <Navbar sticky="top" expand={false} className="bg-warning">
        <Container fluid>
          <Col className={`${none}`}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                গ্রন্হ সমুসহ
              </Dropdown.Toggle>

              <Dropdown.Menu className="bg-dark">
                {book.map((value, key) => (
                  <Dropdown.Item key={key}>
                    <NavLink
                      name="ibn kasir"
                      className={({ isActive }) =>
                        isActive
                          ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1border border-warning`
                          : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                      }
                      to={`/${value.book}`}
                    >
                      {value.book}
                    </NavLink>
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <div className="py-1">
              <Form>
                <FormControl
                  type="search"
                  placeholder="সকল তাফসির বইয়ে কোন কিছু সার্চ করুন "
                  name="pageThree"
                  onFocus={() => pageOneFocus()}
                  onBlur={() => pageOneBlur()}
                  value={change}
                  onChange={(e) => pageOneChange(e.target.value)}
                  area-label="Search"
                />
              </Form>
            </div>
          </Col>
        </Container>
      </Navbar>

      {subject.map((value, key) => (
        <Row key={key}>
          <Col>
            <Card border="secondary" style={{ width: "100%" }}>
              <Card.Header className="d-flex bg-dark bg-opacity-10 text-dark">
                <Col> {value.book}</Col>
                <Col>
                  {value.number} - {value.name}
                </Col>
              </Card.Header>
              <Card.Body className="bg-info opacity-10">
                <Card.Text>
                  <div className="bg-secondary text-light p-1">
                    <div className="d-flex font-weight-bold">
                      <p>
                        ${value.verses}
                        <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                          [{value.name} - {value.number}:{value.versesNumber}]
                        </span>
                      </p>
                    </div>
                  </div>
                  <Tab.Container id="list-group-tabs-example">
                    <Row>
                      <Col>
                        <ListGroup>
                          <ListGroup.Item action href="#link1">
                            সারসংক্ষেপ"
                          </ListGroup.Item>
                          <ListGroup.Item action href="#link2">
                            আনুসঞ্জিক বিষয়
                          </ListGroup.Item>
                        </ListGroup>
                      </Col>
                    </Row>
                    <Row className="bg-light bg-opacity-10">
                      <Col>
                        <Tab.Content>
                          <Tab.Pane eventKey="#link1">{value.summary}</Tab.Pane>
                          <Tab.Pane eventKey="#link2">
                            {value.ancillary_issue}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ))}
    </div>
  );
}
