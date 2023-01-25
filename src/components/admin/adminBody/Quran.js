import { Card, Tab, ListGroup, Row, Col } from "react-bootstrap";
import { NavLink,useParams  } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Classess from "../../../css/index.module.css";



export default function Quran() {
  const [quran, setQuran] = useState([]);
  const [surah, setSurah] = useState([]);
  let { al } = useParams();

  //header
  let name = "";
  let number = "";
  //modal
 
  useEffect(() => {
    let aa;
    axios
      .get(`${process.env.REACT_APP_URL}/quran/${al}`)
      .then((values) => {
        aa = new Set();
        values.data.map((value) => {
          aa.add(value.name);
        });

        let bb = Array.from(aa);
        setQuran(bb);
      })
      .catch((err) => console.log(err));
  }, [al]);

  //surah List
  const listSurah = (surah) => {
    axios
      .get(`${process.env.REACT_APP_URL}/quran/ayat/${al}/${surah}`)
      .then((value) => {
        setSurah(value.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  };

  //deleteItem
  const deleteItem = (deleteId) => {
    axios
      .delete(`${process.env.REACT_APP_URL}/quran/${deleteId}`)
      .then((value) => {
        alert("your data is delete");
      })
      .catch((err) => {
        console.log({ message: err });
      });
  };

  surah.forEach((value) => {
    name = value.name;
    number = value.number;
  });

  return (
    <>
      <Row>
        <Col sm={3}>
          <h3 className="text-center">সুরা</h3>

          <ListGroup>
            {quran.map((value, key) => (
              <ListGroup.Item
                key={key}
                className={`${Classess.unActive} text-center my-1 border border-warning`}
              >
                <p onClick={() => listSurah(value)}> {value}</p>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col sm={9}>
          <Card border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              {number} :- {name}
            </Card.Header>
            <Card.Body className="bg-info bg-opacity-50">
              {surah.map((value, key) => (
                <Card.Text key={key}>
                
                  <div className="bg-secondary text-light p-1">
                    <div className="d-flex justify-content-end ">
                      {/* delete and update */}
                      <div>
                        <NavLink
                          className={`${Classess.unActive} mx-1 px-1 py-1  border border-warning`}
                          to={`/edite/surah/${value._id}`}
                        >
                          update 
                        </NavLink>
                      </div>
                      <div
                        className={`${Classess.unActive} mx-1 px-1 border border-warning`}
                        onClick={() => {
                          if (
                            window.confirm("are you delete this data") === true
                          ) {
                            deleteItem(value._id);
                          } else {
                            alert("your data is not delete");
                          }
                        }}
                      >
                        delete
                      </div>
                    </div>

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

          {/* <Card border="secondary" style={{ width: "100%" }}>
            <Card.Header className=" d-flex justify-content-around text-dark">
              <h2>{surah.name}</h2>
              {quran.length > 0 ? (
                <div className="d-flex text font-weight-bold">
                  <div
                    className={`${Classess.unActive} mx-1 px-2 py-1 border border-warning`}
                  >
                    <NavLink
                      className={`${Classess.unActive} mx-1 px-2 py-1  border border-warning`}
                      to={`/edite/surah/${surah._id}`}
                    >
                      update
                    </NavLink>
                  </div>
                  <div
                    onClick={() => {
                      if (window.confirm("are you delete this data") === true) {
                        deleteItem(surah._id);
                      } else {
                        alert("your data is not delete");
                      }
                    }}
                    className={`${Classess.unActive} mx-1 px-2 py-1 border border-warning`}
                  >
                    delete
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </Card.Header>

            {quran.length > 0 ? (
              <Card.Body>
                <Card.Text>
                  {surah.verses}
                  <span className="bg-warning text-secondary mx-2 p-1 font-weight-bold">
                    [{surah.name} - {surah.number}:{surah.versesNumber}]
                  </span>

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
                          <Tab.Pane eventKey="#link1">{surah.summary}</Tab.Pane>
                          <Tab.Pane eventKey="#link2">
                            {surah.ancillary_issues}
                          </Tab.Pane>
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Card.Text>
              </Card.Body>
            ) : (
              <div className="bg-warning text-dark h3 text-center">
                আপনার বইটি এখনো সংযুক্ত করা হয় নি{" "}
              </div>
            )}
          </Card> */}
        </Col>
      </Row>
    </>
  );
}
