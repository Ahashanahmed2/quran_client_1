import { Card, Row, Col } from "react-bootstrap";
import Classess from "../../../css/index.module.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function FourSubject() {
  const { book } = useParams();
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/subject/${book}`)
      .then((values) => {
        setSubject(values.data);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  }, [book]);

  return (
    <Row xs={2}>
      {subject.map((value, key) => (
        <Col>
          <Card key={key} border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1  border border-warning`
                    : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                }
                to={`/subject/${book}/${value.subject_name}`}
              >
                {value.subject_name}
              </NavLink>
            </Card.Header>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
