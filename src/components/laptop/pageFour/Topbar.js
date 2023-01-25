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
import { NavLink, useParams } from "react-router-dom";
import Classess from "../../../css/index.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
export default function Header() {
  const { book } = useParams();

  let [change, setChange] = useState("");
  let [surah, setSurah] = useState([]);
  let [none, setNone] = useState("d-block");

  const [books, setBook] = useState([]);

  //header
  let name = "";
  let number = "";

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/book`)
      .then((value) => {
        setBook(value.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  }, [book]);

  let pageThreeChange = (e) => {
    axios
      .get(`${process.env.REACT_APP_URL}/quran/subject/${book}/${e}`)
      .then((value) => {
        setSurah(value.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
    setChange(e);
    console.log(e);
  };
  let pageThreeFocus = (e) => {
    console.log(change.length);
    if (change !== "") {
      setSurah([]);
    }
    setNone("d-none");
  };
  let pageThreeBlur = (e) => {
    setNone("d-block");
    if (change == "") {
      setSurah([]);
    }
  };

  surah.forEach((value) => {
    name = value.name;
    number = value.number;
  });

  return (
    <div>
      <Navbar sticky="top" expand={false} className="bg-warning">
        <Container fluid>
          <Col className={none}>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {book}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {books.map((value, key) => (
                  <Dropdown.Item key={key}>
                    <NavLink
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
                  placeholder="Search Any Word"
                  name="pageThree"
                  onFocus={(e) => pageThreeFocus(e.target.value)}
                  onBlur={(e) => pageThreeBlur(e.target.value)}
                  value={change}
                  onChange={(e) => pageThreeChange(e.target.value)}
                  area-label="Search"
                />
              </Form>
            </div>
          </Col>
        </Container>
      </Navbar>
      {surah.map((value, key) => (
        <Row key={key}>
          <Col>
            <Card border="secondary" style={{ width: "100%" }}>
              <Card.Header className="d-flex bg-dark bg-opacity-10 text-dark">
                <Col>{value.book}</Col>
                <Col>
                  {value.number} :- {value.name}
                </Col>
              </Card.Header>
              <Card.Body className="bg-info opacity-10">
                <Card.Text>
                  <div className="bg-secondary text-light p-1">
                    <div className="d-flex text font-weight-bold">
                      <p>
                        {value.verses}
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
                    <Row>
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
