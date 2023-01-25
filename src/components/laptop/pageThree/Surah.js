import {Row, Col, ListGroup, Card, Tab } from "react-bootstrap";
import Topbar from "./Topbar";
import PageTwoSubject from "./PageTwoSubject";
import { useState, useEffect } from "react";
import {NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Classess from "../../../css/index.module.css";
export default function Surah() {
  const { books, surah } = useParams();
  const [surahs, setSurahs] = useState([]);

  //header
  let name = "";
  let number = '';

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/quran/ayat/${books}/${surah}`).then(value => {
        
      setSurahs(value.data)
           



    }).catch(err => { console.log({ message: err }) });

       
  
     
      
  }, [surah]);
  

 surahs.forEach((value) => {
   name = value.name;
   number = value.number;
 });
    
 

 
  return (
    <>
      <Topbar />
      <Row>
        <Col md={3}>
          <PageTwoSubject />
        </Col>
        <Col md={9} >
          <Card border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              {number} :- {name}
            </Card.Header>
            <Card.Body className="bg-info bg-opacity-50">
              {surahs.map((value, key) => (
                <Card.Text key={key}>
                  <div className="bg-secondary text-light p-1">
                    <div className="d-flex text font-weight-bold">
                      <p>
                        {value.verses}
                        <span className="bg-warning text-dark mx-2 p-1 font-weight-bold">
                          {`[${value.name} - ${number}:${value.versesNumber}] `}
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
                            {value.ancillary_issues}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card.Text>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
