import {Row, Col, ListGroup, Card, Tab } from "react-bootstrap";
import Topbar from "./Topbar";
import PageFourSubject from "./FourSubject";
import { useState, useEffect } from "react";
import {NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Classess from "../../../css/index.module.css";
export default function Subject() {
  const { book, subject } = useParams();
  const [surahs, setSurahs] = useState([]);

  //header
  let name = "";
  let number = '';

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/quran/subject/${book}/${subject}`).then(value => {
        
      setSurahs(value.data)
           



    }).catch(err => { console.log({ message: err }) });

       
  
     
      
  }, [subject]);
 
 surahs.forEach((value) => {
   name = value.name;
   number = value.number;
 });
    
 

 
  return (
    <>
      <Topbar />
      <Row>
        <Col md={3} className="d-md-block d-none">
          <PageFourSubject />
        </Col>
        <Col md={9}>
          {surahs.map((value, key) => (
            <Row key={key}>
              <Col>
                <Card border="secondary" style={{ width: "100%" }}>
                  <Card.Header className="text-center text-dark">
                    ${value.number} :- ${value.name}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div className="bg-secondary text-light p-1">
                        <div className="d-flex text font-weight-bold">
                          <p>
                            ${value.verses}
                            <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                              [${value.name} - ${number}:${value.versesNumber}]
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
                          <Col sm={8}>
                            <Tab.Content>
                              <Tab.Pane eventKey="#link1">
                                {value.summary}
                              </Tab.Pane>
                              <Tab.Pane eventKey="#link2">
                                {value.ancillary_issues}
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
        </Col>
      </Row>
    </>
  );
}
