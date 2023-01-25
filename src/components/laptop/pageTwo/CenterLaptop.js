import { Container, Row, Col } from "react-bootstrap";
import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function CenterMain() {
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
    <Container className="text-center">
      <h3 className="mt-2 ">কোরআন শরিফের বঙ্গানুবাদ</h3>
      <Row sm={2} xs={1} md={5}>
        {surah.map((value, key) => (
          <Col key={key} className="p-2">
            <NavLink className="text-light" to={`/${books}/${value}`}>
              <p className=" bg-light bg-opacity-25">{value}</p>
            </NavLink>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
