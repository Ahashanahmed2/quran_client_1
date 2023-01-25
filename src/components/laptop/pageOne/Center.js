
import { Container, Row, Col,ListGroup,Card,Tab } from "react-bootstrap";
import Classess from "../../../css/index.module.css";
import Header from "./Header";
import { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
export default function Center() {

  const [bookName, setBookName] = useState([]);
    useEffect(() => {
    
        axios.get(`${process.env.REACT_APP_URL}/book`).then(value => {
            
               
                setBookName(value.data)
            
        }).catch((err) => {
            console.log({message:err})
        })

 
},[])


   

 
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <Col md={2} className="bg-info d-md-block d-none">
            {bookName.map((value, key) => (
              <Card key={key} border="secondary" style={{ width: "100%" }}>
                <Card.Header className="text-center text-dark">
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1  border border-warning`
                        : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                    }
                    to={`/${value.book}`}
                  >
                    {value.book}
                  </NavLink>
                </Card.Header>
              </Card>
            ))}
          </Col>
          <Col md={10} className="bg-dark text-light ">
            <Row>
              <Col>
                {bookName.map((value, key) => (
                  <Card key={key} border="secondary" style={{ width: "100%" }}>
                    <Card.Header className="bg-dark bg-opacity-10 text-dark text-center">
                      {value.book}
                    </Card.Header>
                    <Card.Body className="bg-info opacity-10">
                      <Card.Text>
                        <Tab.Container id="list-group-tabs-example">
                          <Row>
                            <Col>
                              <ListGroup>
                                <ListGroup.Item action href="#link1">
                                  লেখক পরিচিতি
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link2">
                                  ওহির তাৎপর্য
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link3">
                                  কোরআন নাজিলের ইতিহাস
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link4">
                                  কোরআন সংরক্ষনের ইতিহাস
                                </ListGroup.Item>
                                <ListGroup.Item action href="#link5">
                                  তাফসির সম্পর্কে ভুল ধারণা
                                </ListGroup.Item>
                              </ListGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <Tab.Content className="text-dark">
                                <Tab.Pane eventKey="#link1">
                                  {value.Author_Introduction}
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link2">
                                  {value.Meaning_of_Revelation}
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link3">
                                  {value.History_of_Quran_Revelation}
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link4">
                                  {value.History_of_Preservation_of_Quran}
                                </Tab.Pane>
                                <Tab.Pane eventKey="#link5">
                                  {value.Misconceptions_about_Tafsir}
                                </Tab.Pane>
                              </Tab.Content>
                            </Col>
                          </Row>
                        </Tab.Container>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}
