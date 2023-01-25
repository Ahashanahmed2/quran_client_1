import { Card,Row, Col, Button } from "react-bootstrap";
import { NavLink,useParams } from "react-router-dom";

import axios from "axios";
import { useEffect, useState } from "react";
export default function Book() {
  let { al } = useParams();
const[book,setBook]=useState([])

  useEffect(() => {
   
    axios
      .get(`${process.env.REACT_APP_URL}/book/${al}`)
      .then((value) => {
        setBook(value.data);
      })
      .catch((err) => {
        console.log(err);
      });
   
},[al])
 
  
  const deleteBook = (id) => {
    
    axios
      .delete(`${process.env.REACT_APP_URL}/book/${id}`)
      .then((value) => {
        alert("delete successfull");
      })
      .catch((err) => console.log({ message: err }));
  }


  return (
    <>
      <Row>
        <Col>
          <Card border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <h3 className="text-center">BOOK</h3>
            </Card.Header>
            <Card.Body>
              <Row className="d-flex flex-wrap font-weight-bold">
                {book.map((value, key) => (
                  <Col
                    key={key}
                    className="lead text-center text-light bg-secondary p-2 mx-1"
                  >
                    <p>{value.book}</p>

                    <NavLink
                      className="btn btn-info"
                      to={`/edite/book/${value._id}`}
                    >
                      update
                    </NavLink>
                    <div
                      onClick={() => {
                        if (window.confirm("are your data is delete") === true) {
                          deleteBook(value._id);
                        } else {
                          alert("data is not delete")
                        }
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
