import { Card, Row, Col } from "react-bootstrap";
import Classess from "../../../css/index.module.css";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
export default function PageTwoSubject() {
  const { books } = useParams();
  const [surah, setSurah] = useState([]);

  useEffect(() => {
    let aa;
    axios
      .get(`${process.env.REACT_APP_URL}/quran/${books}`)
      .then((values) => {
        aa = new Set();
        values.data.map((value) => {
          aa.add(value.name);
        });

        let bb = Array.from(aa);
        setSurah(bb);
      })
      .catch((err) => {
        console.log({ message: err });
      });
  }, [books]);

  return (
    <Row>
      <Col>
        {surah.map((value, key) => (
          <Card key={key} border="secondary" style={{ width: "100%" }}>
            <Card.Header className="text-center text-dark">
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? `${Classess.hover} ${Classess.active} mx-2 px-2 py-1  border border-warning`
                    : `${Classess.hover} ${Classess.unActive} mx-2 px-2 py-1 border border-warning`
                }
                to={`/${books}/${value}`}
              >
                {value}
              </NavLink>
            </Card.Header>
          </Card>
        ))}
      </Col>
    </Row>
  );
}
