import { Card, Row, Col, Button } from "react-bootstrap";
import { NavLink,useParams} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Subject() {
const [subject, setSubject] = useState([]);
  const {al}=useParams()

  
useEffect(() => {
    axios
    .get(`${process.env.REACT_APP_URL}/subject/${al}`)
    .then((value) => {
      setSubject(value.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

  , [al]);
  const deleteSubject = (id) => {
    
    axios
      .delete(`${process.env.REACT_APP_URL}/subject/${id}`)
      .then((value) => {
        alert("delete successfull");
      })
      .catch((err) => console.log({ message: err }));
  };
  return (
    <>
      <Row>
        <Col>
          <Card border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <h3 className="text-center">Subject</h3>
            </Card.Header>
            <Card.Body>
              <Row className="d-flex flex-wrap font-weight-bold">
                {subject.map((value,key) => (
                  <Col key={key} className="lead text-center text-light bg-secondary p-2 mx-1">
                    
                      <p>{value.book}</p>
                      <p>{value.subject_name}</p>
                      <NavLink
                        className="btn btn-info"
                        to={`/edite/subject/${value._id}`}
                      >
                        update
                      </NavLink>
                      <div
                      onClick={() => {
                        if (window.confirm("your data is is delete") === true) {
                          deleteSubject(value._id);
                        }else{alert("data is not delete")}
                        } }
                        
                        className="btn btn-danger"
                      >
                        delete
                      </div>
                   
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
